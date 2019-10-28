Vue.component('listar-quiz', {
    template: `
        <div class="container">
            <br>
            <p class="font-weight-light">Lista de quizzes</p>
            <div class="lista-quiz"> 
                <ul class="list-group" v-for="quiz in quizzes">             
                    <li class="list-group-item" >{{quiz.nome}}
                       <button type="button" v-on:click="remover(quiz.id)" class="btn btn-outline-danger btn-sm">Deletar</button>
                       <a :href="'/quiz/' + quiz.id" class="btn btn-outline-info btn-sm">Alterar</a>
                    </li>                 
                    <br>     
                </ul>
                <br>
                <div class="listar">
                    <button v-on:click='addQuiz' class="btn btn-primary"> Adicionar novo Quiz</button> 
                </div>
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
        addQuiz() {

            let url = '/quiz/cadastro';

            fetch(url, {method: 'POST'})
                .then(function (response) {
                    return response.json();
                })
                .then(function (resposta) {
                    if (resposta.error) {
                        alert("Não foi possivel cadastrar");
                    } else {
                        window.location.href = '/quiz/' + resposta.id
                    }
                });
        },
        busca() {

            let url = '/quiz/busca';

            fetch(url, {method: 'POST'})
                .then(function (response) {
                    return response.json();
                })
                .then((resposta) => {
                    this.quizzes = resposta;
                });
        },

        remover(id:number) {

            let formData = new FormData();
            let that = this;
            formData.append('id', id.toString());

            if (confirm("Deseja remover?")) {
                let url = '/quiz/delete';
                fetch(url, {method: 'POST', body: formData})
                    .then(function (response) {
                        return response.json();
                    }).then (function (resposta) {
                    if(resposta.error == false){
                        that.quizzes = that.quizzes.filter((quiz:Quiz) => quiz.id !== id);
                    }
                });
            }
        }
    }
});

