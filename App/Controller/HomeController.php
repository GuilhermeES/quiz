<?php

namespace App\Controller;

use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class HomeController
{

    //Página inicial
    public function inicio(Request $request, Response $response)
    {
        $response->getBody()->write(file_get_contents('Templates/index.html'));
        return $response;
    }
}