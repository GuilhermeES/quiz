Vue.component('resposta', {
    props: ['id','usuario','alternativa'],
    template: `
    <div class="container">
        <div class="addpergunta">
            <h1>{{quiz.nome}}</h1>
            <br>      
                <div>
    	            <pergunta-resposta v-for='(pergunta, key) in quiz.perguntas' v-bind:respondido.sync='respostas[key]'  :pergunta='pergunta' :respondido='null' :indice="key"></pergunta-resposta>
                </div>
            <hr>
            <button v-on:click='cadastrarResposta'  class="btn btn-success">conferir respostas</button>
            <div v-if="resultado">
                <h3>Você acertou {{acertos}} de {{respostas.length}}</h3>
            </div>  
        </div>
    </div>
  `,
    data: function() {
        let quiz = new Quiz();
        quiz.id = this.id;
        let respostas = [] as number[];

        return {
            acertos: 0,
            quiz: quiz,
            resultado: false,
            respostas: respostas,
        }
    },
    mounted(){
        this.busca().then((quiz:Quiz)=>{
            this.quiz = quiz;
            let respostas = [] as number[];
            for(let i=0; i< this.quiz.perguntas.length; i++){
                respostas.push(null);
            }
            this.respostas = respostas;
        });
    },

    methods: {
        busca(){
            return fetch('/visualizar/busca/' + this.id,{method: 'GET'}).then((response)=>{
                return response.json();
            });
        },
        corretas(){
            let corretas = [];
            let perguntas = this.quiz.perguntas;

            for(let i=0; i < perguntas.length; i++){
                let pergunta = perguntas[i];

                for(let j=0; j< pergunta.alternativas.length; j++){
                    let alternativa = pergunta.alternativas[j];

                    if(alternativa.correta == 1 && this.respostas[i] == alternativa.id) {
                        corretas.push(alternativa.id);
                    }
                }
            }
            this.resultado = true;
            this.acertos = corretas.length;
        },

        cadastrarResposta(){
            let url = '/cadastrarResposta';

            let formData = new FormData();
            let that = this;
            formData.append('id', this.id);
            formData.append('respostas', this.respostas);

            fetch(url, {method: 'POST',body:formData})
                .then(function (response) {
                    return response.json();
                })
                .then( (resposta) => {
                    if(resposta.error){
                        alert("Não foi possivel cadastrar");
                    }
                    else {
                        console.log('teste');
                        that.corretas();
                    }
                })
        }
    }
});


