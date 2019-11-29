Vue.component('inicio-quiz', {
    props: ['usuario'],
    template: `
        <div class="container">
            <div class="imagem"></div>
            <br>
            <p class="font-weight-light">Lista de quizzes Início</p>
                <hr>            
                <div class="alert alert-success" role="alert" v-if="usuario != null">
                    <h4 class="alert-heading">Muito bem!</h4>
                    <p><div v-if="usuario.nivel == 1">Bem vindo, <b>{{usuario.nome}}</div></b> 
                    <div v-else="usuario.nivel == 0">Bem vindo, <b>{{usuario.nome}}</b> ,selecione o Quiz desejado para responder</div></p>
                    <hr>
                </div>                  
              <div class="alert alert-warning" role="alert" v-if="usuario == null">
                 Você deve estar logado para responder!
              </div>         
            <div class="lista-quiz"> 
                <ul class="list-group" v-for="quiz in quizzes">             
                    <li class="list-group-item" >{{quiz.nome}}
                        <a :href="'/visualizar/' + quiz.id" class="btn btn-outline-info btn-sm">Visualizar</a>                    
                        <a :href="'/resposta/' + quiz.id" class="btn btn-outline-info btn-sm" v-if="usuario != null">Responder</a>                                    
                    </li>                 
                    <br>     
                </ul>   
                <br>
            </div>
        </div>`,

    data: function () {
        return {
            quizzes: [] as Quiz[],
        }
    },
    mounted() {
        this.busca();
    },

    methods: {
        busca() {

            let url = '/quiz/iniciobusca/';

            fetch(url, {method: 'POST'})
                .then(function (response) {
                    return response.json();
                })
                .then((resposta) => {
                    this.quizzes = resposta;
                });
        },
    }
});

