<?php


namespace App\Model;
use PDO;

class UserModel
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

    //Função de login de usuario
    public function login($email, $senha){
        $sql = "SELECT * FROM usuario WHERE email = :email and senha = :senha";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":email", $email);
        $stmt->bindValue(":senha", sha1($senha));
        $stmt->execute();
        $validacao = $stmt->fetch(PDO::FETCH_ASSOC);

        if($validacao) {
            $_SESSION['id'] = $validacao['id'];
            $_SESSION['nivel'] = $validacao['nivel'];
            return true;
        }
        else{
            return false;
        }
    }

    //Função para buscar usuário
    public function buscaUsuario($id){
        $sql = "SELECT email, nome, nivel, id FROM usuario WHERE id = :id";
        $stmt = $this->bd->prepare($sql);
        $stmt->bindValue(":id", $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    //Função para destruir a sessão
    public function logout(){
        session_destroy();
    }
}
