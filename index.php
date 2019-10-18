<?php
use Slim\Factory\AppFactory;

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

//Registrar a coneção do banco, para que ela fique disponivel dentro das controllers
class BD{
    public static function conexao(){
        return new PDO("mysql:host=localhost;dbname=quiz","root","");
    }
}

$app->get('/',App\Controller\HomeController::class . ':inicio' );
$app->get('/login',App\Controller\UserController::class . ':login' );

$app->run();