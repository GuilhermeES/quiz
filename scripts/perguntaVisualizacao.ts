Vue.component('pergunta-visualizacao', {
    props:['usuario','pergunta','key'],
    template: `
  <div class="container">
  <br>
     <div class="border-5">
  	    {{pergunta_data.titulo}}<br/>
  	 </div>
        <div>
    	    <alternativa-visualizacao v-for='alternativa in pergunta_data.alternativas' :alternativa='alternativa' :indice="key"></alternativa-visualizacao>
        </div>
  </div>
  `,
    data: function() {
        return {
            pergunta_data: this.pergunta,
        }
    },
});