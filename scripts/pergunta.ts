Vue.component('pergunta', {
    props:['pergunta','key'],
    template: `
  <div class="container">
     <br/>
     <div class="border-2">
  	    <input type='text' v-model='pergunta_data.titulo' class="form-control" placeholder="Escreva uma pergunta"><br/>
            <button v-on:click='addAlternativa' class="btn btn-primary">Adicionar Alternativa</button>
        <div>
    	    <alternativa v-for='alternativa in pergunta_data.alternativas' :alternativa='alternativa' :indice="key"></alternativa>
        </div>
     </div>
  </div>
  `,
    data: function() {
        return {
            pergunta_data: this.pergunta,
        }
    },
    methods: {
        addAlternativa() {

            let formData = new FormData();

            formData.append('perguntas_id', this.pergunta_data.id);

            let url = '/alternativa/cadastro';

                fetch(url, {method: 'POST', body: formData})
                    .then(function (response) {
                        return response.json();
                    }).then((resposta) => {
                    this.pergunta_data.alternativas.push(resposta.data);
                });

        },
        alterarPergunta(){
            fetch('/alternativa/alterarPergunta', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.quiz)
            }).then(resposta => {
            });
        },
        selecionaAlternativa(id:number){
            for(let i = 0; i < this.pergunta_data.alternativas.length; i++){
                if(id == this.pergunta_data.alternativas[i].id){
                    this.pergunta_data.alternativas[i].correta = 1;
                }
                else{
                    this.pergunta_data.alternativas[i].correta = 0;
                }
            }
        }
    },
});