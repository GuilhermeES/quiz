class Quiz{
    public id:number = 0;
    public nome:string = '';
    public usuario_id:number = 0;

    public perguntas: Perguntas[] = [];
}
class Perguntas{
    public id:number = 0;
    public titulo:string = '';
    public quiz_id:number = 0;

    public alternativas: Alternativas[] = [];
}
class Alternativas{
    public id:number = 0;
    public correta:number = 0;
    public perguntas_id:number = 0;
    public texto:string = '';
}
