<?php
use Slim\Factory\AppFactory;


require __DIR__ . '/vendor/autoload.php';

session_start();

$app = AppFactory::create();

//Registrar a coneção do banco, para que ela fique disponivel dentro das controllers
class BD{
    public static function conexao(){
        return new PDO("mysql:host=localhost;dbname=quiz","root","");
    }
}
//Páginas
$app->get('/',App\Controller\HomeController::class . ':inicio' );
$app->get('/login',App\Controller\UserController::class . ':loginForm' );
$app->get('/registro',App\Controller\RegistroController::class . ':registroForm' );

$app->post('/cadastrar',App\Controller\RegistroController::class . ':cadastrar' );
$app->post('/login',App\Controller\UserController::class . ':login' );
$app->get('/usuario',App\Controller\UserController::class . ':busca' );
$app->get('/logout',App\Controller\UserController::class . ':logout' );


$app->run();