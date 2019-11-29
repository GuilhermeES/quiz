Vue.component('alternativa-resposta', {
    props:['alternativa','key','respondido'],
    template: `
  <div class="container">
      <br>
        <div class="border-4">
            <input type='radio' :name="alternativa_data.perguntas_id" :value="alternativa_data.id" v-model='respondido'>
            {{alternativa_data.texto}}<br/>
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