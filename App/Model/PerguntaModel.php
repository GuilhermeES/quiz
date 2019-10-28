<?php


namespace App\Model;
use PDO;

class PerguntaModel
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

    public function cadastrar($titulo,$quiz_id){

        $sql = "INSERT INTO perguntas (titulo,quiz_id) values (:titulo,:quiz_id)";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":titulo", $titulo);
        $stmt->bindValue(":quiz_id", $quiz_id );
        $stmt->execute();
        return $this->bd->lastInsertId();
    }

    public function buscaPergunta($id){
        $sql = "SELECT id, quiz_id, titulo FROM perguntas WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        $pergunta = $stmt->fetch(PDO::FETCH_ASSOC);
        $pergunta['alternativas'] = $this->buscaAlternativas($pergunta['id']);
        return $pergunta;
    }

    private function buscaAlternativas($id){
        $sql = "SELECT id, perguntas_id, texto, correta FROM alternativas WHERE perguntas_id = :perguntas_id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":perguntas_id",$id );
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function removePerguntas($id){

        $sql = "DELETE FROM perguntas WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id );
        $stmt->execute();
        return $stmt->rowCount() > 0;

    }

    public function updatePergunta($titulo,$id){
        $sql = "UPDATE perguntas set titulo = :titulo WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":titulo", $titulo);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
}
