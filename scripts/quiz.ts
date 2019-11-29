Vue.component('quiz', {
    props: ['usuario','id'],
    template: `
    <div class="container">
        <div class="addpergunta">
            <h1>{{quiz.nome}}</h1>
            <br>
            <div class="border-1">
  	            <input type="text" class="form-control" v-model="quiz.nome" placeholder="Escreva título do Quiz"><br/>
                <button v-on:click='addPergunta'  class="btn btn-success">Adicionar pergunta</button>
                <div>
    	            <pergunta v-for='(pergunta, key) in quiz.perguntas' :pergunta='pergunta' :indice="key"></pergunta>
                </div>
            </div>
            <br>
            <button :disabled="buttonDesabilitado()" v-on:click='alterar' id="botao" class="btn btn-success">Salvar</button>
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
        buttonDesabilitado(){
            return this.quiz.perguntas.length == 0;
        },
        busca(){
            return fetch('/quiz/busca/' + this.id,{method: 'GET'}).then((response)=>{
                return response.json();
            });
        },
        addPergunta() {
            let url = '/pergunta/cadastro';

            let formData = new FormData();

            formData.append('id', this.id);

            fetch(url, {method: 'POST', body:formData})
                .then(function (response) {
                    return response.json();
                }).then( (resposta) => {
                this.quiz.perguntas.push(resposta.data);
            });
        },
        alterar(){
            if(this.quiz.nome == ''){
                //@ts-ignore
                Swal.fire('Escreva um titulo para o quiz', '', 'warning');
                return;
            }
            for(let i =0; i < this.quiz.perguntas.length; i++){
                let selecionado = false;

                if(this.quiz.perguntas[i].titulo == ''){
                    //@ts-ignore
                    Swal.fire('Escreva um titulo para a pergunta', '', 'warning');
                    return;
                }
                for(let j =0; j < this.quiz.perguntas[i].alternativas.length; j++) {
                    if(this.quiz.perguntas[i].alternativas[j].texto == ''){
                        //@ts-ignore
                        Swal.fire('Escreva um titulo para alternativa', '', 'warning');
                        return;
                    }
                    if(this.quiz.perguntas[i].alternativas[j].correta){
                        selecionado = true;
                    }
                }
                if(selecionado == false){
                    //@ts-ignore
                    Swal.fire('Selecione uma alternativa', '', 'warning');
                    return;
                }
            }
            fetch('/quiz/alterar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.quiz)
            }).then(function (response) {
                return response.json();
            }).then (function (resposta) {
                if(resposta.error == false){
                    //@ts-ignore
                    Swal.fire(
                        'Salvo!',
                         '',
                        'success',
                    ).then((r:any) =>{
                        window.location.href = '/quiz';
                    });
                }
            });
        }
    }

});
