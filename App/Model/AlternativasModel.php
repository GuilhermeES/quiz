<?php


namespace App\Model;
use PDO;

class AlternativasModel
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

    public function cadastrar($texto, $correta, $perguntas_id){

        $sql = "INSERT INTO alternativas (texto,correta,perguntas_id) values (:texto,:correta,:perguntas_id)";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":texto", $texto);
        $stmt->bindValue(":correta", $correta);
        $stmt->bindValue(":perguntas_id", $perguntas_id);
        $stmt->execute();
        return $this->bd->lastInsertId();
    }

    public function buscaAlternativas($id){

        $sql = "SELECT id, perguntas_id, texto, correta FROM alternativas WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id );
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    public function removeAlternatriva($id){

        $sql = "DELETE FROM alternativas WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id );
        $stmt->execute();
        return $stmt->rowCount() > 0;

    }
    public function Alternativas($texto, $correta, $id){

        $sql = "UPDATE alternativas set texto = :texto, correta = :correta WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->bindValue(":texto", $texto);
        $stmt->bindValue(":correta", $correta);
        $stmt->execute();
        return $stmt->rowCount() > 0;
    }
}
