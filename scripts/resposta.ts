Vue.component('resposta', {
    props: ['id','usuario','alternativa'],
    template: `
    <div class="container">
        <div class="addpergunta">
            <h1>{{quiz.nome}}</h1>
            <br>      
                <div>
    	            <pergunta-resposta v-for='(pergunta, key) in quiz.perguntas' :pergunta='pergunta' :respondido='null' :indice="key"></pergunta-resposta>
                </div>
            <hr>
            <button v-on:click='cadastrarResposta'  class="btn btn-success">conferir respostas</button>
            <div v-if="resultado">              
            </div>
        </div>
    </div>
  `,
    data: function() {
        let quiz = new Quiz();
        quiz.id = this.id;

        return {
            quiz: quiz,
            resultado: false,
        }
    },
    mounted(){
        this.busca().then((quiz:Quiz)=>{
            this.quiz = quiz;
        })
    },

    methods: {
        busca(){
            return fetch('/visualizar/busca/' + this.id,{method: 'GET'}).then((response)=>{
                return response.json();
            });
        },
        cadastrarResposta(){
            let url = '/cadastrarResposta';

            let formData = new FormData();

            formData.append('id', this.id);
            formData.append('id', this.alternativa_data);

            fetch(url, {method: 'POST',body:formData})
                .then(function (response) {
                    return response.json();
                })
                .then(function (resposta) {
                    if(resposta.error){
                        alert("Não foi possivel cadastrar");
                    }
                    else {
                       alert("cadastrado");
                    }
                })
        }
    }
});


