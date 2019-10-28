<?php


namespace App\Controller;

use App\Model\AlternativasModel;
use PDO;
use Psr\Container\ContainerInterface;
use Slim\Psr7\Request;
use Slim\Psr7\Response;

class AlternativasController
{
    private $model;

    public function __construct()
    {
        $this->model = new AlternativasModel();
    }
    public function cadastrar(Request $request, Response $response){
        try {
            $post = $request->getParsedBody();

            $texto = '';
            $perguntas_id = $post['perguntas_id'];
            $correta = 0;

            $id = $this->model->cadastrar($texto, $correta, $perguntas_id);
            if($id > 0){
                $payload = json_encode([
                    'error' => false,
                    'data' => $this->model->buscaAlternativas($id)
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
    public function updateAlternativas(Request $request, Response $response){

    }
}