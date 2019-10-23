<?php


namespace App\Controller;

use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Model\RegistroModel;

class RegistroController
{
    private $model;
    public function __construct(){
        $this->model = new RegistroModel();
    }

    //Página inicial
    public function registroForm(Request $request, Response $response){
        $response->getBody()->write(file_get_contents('Templates/registro.html'));
        return $response;
    }

    //Cadastrar no banco
    public function cadastrar(Request $request, Response $response){
        try {
            $post = $request->getParsedBody();

            $nome = $post['nome'];
            $email = $post['email'];
            $senha = $post['senha'];
            $nivel = 0;

            $id = $this->model->cadastrar($nome,$email,$senha,$nivel);
            if($id > 0){
                $payload = json_encode([
                    'error' => false
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