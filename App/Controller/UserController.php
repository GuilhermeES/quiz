<?php


namespace App\Controller;

use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;
use App\Model\UserModel;

class UserController
{
    private $model;
    public function __construct(){
        $this->model = new UserModel();
    }
    //Página inicial
    public function loginForm(Request $request, Response $response)
    {
        $response->getBody()->write(file_get_contents('Templates/login.html'));
        return $response;
    }

    //Login usuario
    public function login(Request $request, Response $response)
    {
        $post = $request->getParsedBody();

        $email = $post['email'];
        $senha = $post['senha'];

        $data = ["error" => !$this->model->login($email, $senha)];
        $payload = json_encode($data);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    //Buscar usuário
    public function busca(Request $resquest, Response $response){
        $usuario = null;
        if(array_key_exists('id',$_SESSION)){
            $usuario = $this->model->buscaUsuario($_SESSION['id']);
        }
        $payload = json_encode($usuario);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }

    public function logout(Request $resquest, Response $response){
        $usuario = $this->model->logout();
        $payload = json_encode($usuario);
        $response->getBody()->write($payload);
        return $response->withHeader('Content-Type', 'application/json');
    }
}