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

$app->get('/',App\Controller\HomeController::class . ':inicio' );

$app->get('/quiz/{id}',App\Controller\QuizController::class . ':edicao' );
$app->post('/quiz/cadastro',App\Controller\QuizController::class . ':cadastroQuiz' );
$app->get('/quiz',App\Controller\QuizController::class . ':listarQuiz' );
$app->get('/quiz/busca/{id}',App\Controller\QuizController::class . ':busca' );
$app->post('/quiz/busca',App\Controller\QuizController::class . ':listagem' );
$app->post('/quiz/delete',App\Controller\QuizController::class . ':delete' );
$app->post('/quiz/alterar',App\Controller\QuizController::class . ':update' );
$app->post('/quiz/iniciobusca/',App\Controller\QuizController::class . ':buscaInicioQuiz' );
$app->get('/visualizar/{id}',App\Controller\QuizController::class . ':edicaoTudo' );
$app->get('/visualizar/busca/{id}',App\Controller\QuizController::class . ':buscaTudo' );
$app->post('/visualizar/busca',App\Controller\QuizController::class . ':listagemTudo' );
$app->get('/resposta/{id}',App\Controller\QuizController::class . ':resposta' );
$app->post('/cadastrarResposta',App\Controller\QuizController::class . ':cadastrarResposta' );

$app->post('/pergunta/cadastro',App\Controller\PerguntaController::class . ':cadastrar' );

$app->post('/alternativa/cadastro',App\Controller\AlternativasController::class . ':cadastrar' );

$app->get('/registro',App\Controller\RegistroController::class . ':registroForm' );
$app->post('/cadastrar',App\Controller\RegistroController::class . ':cadastrar' );

$app->post('/login',App\Controller\UserController::class . ':login' );
$app->get('/usuario',App\Controller\UserController::class . ':busca' );
$app->get('/logout',App\Controller\UserController::class . ':logout' );
$app->get('/login',App\Controller\UserController::class . ':loginForm' );

$app->run();