<?php


namespace App\Model;
use PDO;

class QuizModel
{
    /**
     * @var PDO|null
     */

    //Conexão com banco
    private $bd = null;

    public function __construct()
    {
        $this->bd = \BD::conexao();
    }

    public function cadastrar($nome,$usuario_id){
        $sql = "INSERT INTO quiz (nome,usuario_id) values (:nome,:usuario_id)";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":nome", $nome);
        $stmt->bindValue(":usuario_id", $usuario_id);
        $stmt->execute();
        return $this->bd->lastInsertId();
    }

    public function busca($id){
        $sql = "SELECT id, usuario_id, nome FROM quiz WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        $quiz = $stmt->fetch(PDO::FETCH_ASSOC);
        $quiz['perguntas'] = $this->buscaPerguntas($id);
        return $quiz;
    }

    public function listagem(){
        $sql = "SELECT id, usuario_id, nome FROM quiz ";
        $stmt = $this->bd->prepare($sql);
        $stmt->execute();
        $quiz = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($quiz as &$item) {
            $item['perguntas'] = $this->buscaPerguntas($item['id']);
        }
        return $quiz;
    }

    public function buscaPerguntas($quiz){
        $sql = "SELECT id, quiz_id, titulo FROM perguntas WHERE quiz_id = :quiz_id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":quiz_id", $quiz);
        $stmt->execute();
        $perguntas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($perguntas as &$pergunta){
            $pergunta['alternativas'] = $this->buscaAlternativas($pergunta['id']);
        }
        return $perguntas;
    }
    public function buscaAlternativas($pergunta_id){
        $sql = "SELECT id, perguntas_id, texto, correta FROM alternativas WHERE perguntas_id = :perguntas_id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":perguntas_id",$pergunta_id );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function removeQuiz($id){
        $sql = "DELETE FROM quiz WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id );
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function update($nome,$id){
        $sql = "UPDATE quiz set nome = :nome WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":nome", $nome);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }

    public function inicioQuiz(){
        $sql = "SELECT * FROM quiz";
        $stmt = $this->bd->prepare($sql);
        $stmt->execute();
        $quiz = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $quiz;
    }

    public function cadastroRespostas($usuario_id, $alternativas_id, $data_cadastro){
        $sql = "INSERT INTO resposta ( usuario_id, alternativas_id, data_cadastro) 
                values ( :usuario_id, :alternativas_id, :data_cadastro)";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue('usuario_id',$usuario_id);
        $stmt->bindValue('alternativas_id',$alternativas_id);
        $stmt->bindValue('data_cadastro', $data_cadastro);
        $stmt->execute();
        return $this->bd->lastInsertId();
    }

}
