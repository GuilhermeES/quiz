<?php


namespace App\Controller;

use App\Model\PerguntaModel;
use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class PerguntaController
{
    private $model;
    public function __construct()
    {
        $this->model = new PerguntaModel();
    }

    public function cadastrar(Request $request, Response $response){
        try {
            $post = $request->getParsedBody();

            $titulo = '';
            $quiz_id = $post['id'];

            $id = $this->model->cadastrar($titulo,$quiz_id);
            if($id > 0){
                $payload = json_encode([
                    'error' => false,
                    'data' => $this->model->buscaPergunta($id)
                ]);
            }
            else{
                throw new \Exception();
            }
        }
        catch (\Exception $exception){
            $payload = json_encode(['error' => true]);
        }
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
    public function updatePerguntas(Request $request, Response $response){
        try {
            $post = $request->getParsedBody();

            $titulo = $post['titulo'];
            $id = $post['id'];

            if($this->model->updatePergunta($titulo,$id)){
                $payload = json_encode([
                    'error' => false,
                ]);
            }
            else{
                throw new \Exception();
            }
        }
        catch (\Exception $exception){
            $payload = json_encode(['error' => true]);
        }
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}
