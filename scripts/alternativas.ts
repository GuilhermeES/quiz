Vue.component('alternativa', {
    props:['alternativa','key'],
    template: `
  <div class="container">
    <br>
     <p class="text-muted">
       Selecione qual vai ser a resposta correta
     </p>
    <div class="border-3">
        <br>
         <input type='radio' value="1" v-model='alternativa_data.correta'>
         <input type="text" placeholder="Escreva uma alternativa" v-model='alternativa_data.texto'><br/>
  	</div>
  </div>
  `,
    data: function() {
        return {
            alternativa_data: this.alternativa,
        }
    },
    computed:{
        correta(){
            return this.alternativa_data.correta;
        }
    },
    watch: {
        alternativa(valor:any){
            this.alternativa_data = valor;
        },

        correta(valor: number) {
            if (valor == 1) {
                this.$parent.selecionaAlternativa(this.alternativa_data.id);
            }
        }
    },
});