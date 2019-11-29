Vue.component('pergunta-resposta', {
    props:['usuario','pergunta','key','respondido'],
    template: `
  <div class="container">
  <br>
     <div class="border-5">
  	    {{pergunta_data.titulo}}<br/>
  	 </div>
        <div>
    	    <alternativa-resposta v-for='alternativa in pergunta_data.alternativas' :alternativa='alternativa' v-bind:respondido.sync='respondido_data'  :indice="key"></alternativa-resposta>
        </div>
  </div>
    `,
    data: function() {
        return {
            pergunta_data: this.pergunta,
            respondido_data: this.respondido,
        }
    },
    watch: {
        respondido_data(valor: number){
            this.$emit('update:respondido', valor)
        },

        respondido(valor:any){
            this.respondido_data = valor;
        },
    }
});