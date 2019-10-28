<?php


namespace App\Controller;

use App\Model\AlternativasModel;
use App\Model\PerguntaModel;
use App\Model\QuizModel;
use mysql_xdevapi\Exception;
use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use Slim\Views\PhpRenderer;


class QuizController
{

    private $model;
    /**
     * @var AlternativasModel
     */
    private $modelAlternativas;
    /**
     * @var PerguntaModel
     */
    private $modelPergunta;

    public function __construct()
    {
        $this->model = new QuizModel();
        $this->modelAlternativas = new AlternativasModel();
        $this->modelPergunta = new PerguntaModel();
    }

    public function edicao(Request $request, Response $response, $args)
    {
        $renderer = new PhpRenderer('Templates');
        return $renderer->render($response, 'Quiz.html', $args);
    }

    public function listarQuiz(Request $request, Response $response)
    {
        if (array_key_exists('id', $_SESSION)) {
            $response->getBody()->write(file_get_contents('Templates/listarQuiz.html'));
            return $response;
        } else {
            return $response->withHeader('Location', '/login')->withStatus(302);
        }
    }

    public function cadastroQuiz(Request $request, Response $response)
    {
        try {
            if (array_key_exists('id', $_SESSION)) {
                $nome = '';
                $usuario_id = $_SESSION['id'];

                $id = $this->model->cadastrar($nome, $usuario_id);
                if ($id > 0) {
                    $payload = json_encode([
                        'error' => false,
                        'id' => $id
                    ]);
                } else {
                    //Usuario não foi cadastrado
                    throw new \Exception();
                }
            } else {
                //Usuário não logado
                throw new \Exception();
            }
        } catch (\Exception $exception) {
            $payload = json_encode(['error' => true]);
        }
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function busca(Request $request, Response $response, $args)
    {
        $quiz = null;
        if (array_key_exists('id', $_SESSION)) {
            $quiz = $this->model->busca($args['id']);
        }
        $payload = json_encode($quiz);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
    public function listagem (Request $request, Response $response){
        $quiz = null;
        if (array_key_exists('id', $_SESSION)) {
            $quiz = $this->model->listagem();
        }
        $payload = json_encode($quiz);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
    public function delete (Request $request, Response $response){

        try {
            $post = $request->getParsedBody();

            $id = $post['id'];

            if($this->model->removeQuiz($id)){
                $payload =  json_encode(['error' => false]);
            }
            else{
                throw new Exception();
            }
        }
        catch (\Exception $exception){
            $payload = json_encode(['error' => true]);
        }
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
    public function update(Request $request, Response $response)
    {
        $banco = \BD::conexao();
        $banco->beginTransaction();
        try {
            $quiz = json_decode($request->getBody());

            $nome = $quiz->nome;
            $id = $quiz->id;
            $this->model->update($nome,$id);
            foreach ($quiz->perguntas as $pergunta){
                $this->modelPergunta->updatePergunta($pergunta->titulo, $pergunta->id);
                foreach ($pergunta->alternativas as $alternativa){
                    $this->modelAlternativas->updateAlternativas($alternativa->texto, $alternativa->correta,
                        $alternativa->id);
                }
            }
            $banco->commit();
            $payload = json_encode([
                'error' => false,
            ]);
        }
        catch (\Exception $exception){
            $banco->rollBack();
            $payload = json_encode(['error' => true]);
        }
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}