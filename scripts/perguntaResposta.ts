Vue.component('pergunta-resposta', {
    props:['usuario','pergunta','key','respondido'],
    template: `
  <div class="container">
  <br>
     <div class="border-5">
  	    {{pergunta_data.titulo}}<br/>
  	 </div>
        <div>
    	    <alternativa-resposta v-for='alternativa in pergunta_data.alternativas' :alternativa='alternativa' :respodido='respondido'  :indice="key"></alternativa-resposta>
        </div>
  </div>
    `,
    data: function() {
        return {
            pergunta_data: this.pergunta,
        }
    },
});