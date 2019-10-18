<?php


namespace App\Controller;

use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class UserController
{
    //Página inicial
    public function login(Request $request, Response $response)
    {
        $response->getBody()->write(file_get_contents('Templates/login.html'));
        return $response;
    }
}