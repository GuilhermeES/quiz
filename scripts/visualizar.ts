Vue.component('visualizar', {
    props: ['id','usuario'],
    template: `
    <div class="container">
        <div class="addpergunta">
            <h1>{{quiz.nome}}</h1>
            <br>      
                <div>
    	            <pergunta-visualizacao v-for='(pergunta, key) in quiz.perguntas' :pergunta='pergunta' :indice="key"></pergunta-visualizacao>
                </div>
            <hr>          
        </div>
    </div>
    `,
    data: function() {
        let quiz = new Quiz();
        quiz.id = this.id;

        return {
            quiz: quiz
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
    }
});


