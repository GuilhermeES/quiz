Vue.component('alternativa-resposta', {
    props:['alternativa','key','respondido'],
    template: `
  <div class="container">
      <br>
        <div class="border-4">
            <input type='radio' :name="alternativa_data.perguntas_id" :value="alternativa_data.id" v-model='respondido_data'>
            {{alternativa_data.texto}}<br/>
        </div>
  </div>
  `,
    data: function() {
        return {
            alternativa_data: this.alternativa,
            respondido_data: this.respondido,
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
        respondido(valor:any){
            this.respondido_data = valor;
        },

        respondido_data(valor: number){
            if (valor == this.alternativa_data.id){
                this.$emit('update:respondido', valor)
            }
        },

        correta(valor: number) {
            if (valor == 1) {
                this.$parent.selecionaAlternativa(this.alternativa_data.id);
            }
        }
    },
});