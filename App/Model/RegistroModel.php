<?php


namespace App\Model;
use PDO;

class RegistroModel
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

    //Função para cadastrar
    public function cadastrar($nome,$email,$senha,$nivel){

        $sql = "INSERT INTO usuario (nome,email,senha,nivel) values (:nome,:email,:senha,:nivel)";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":nome", $nome);
        $stmt->bindValue(":email", $email);
        $stmt->bindValue(":senha", sha1($senha));
        $stmt->bindValue(":nivel", $nivel);
        $stmt->execute();
        return $this->bd->lastInsertId();
    }

}
