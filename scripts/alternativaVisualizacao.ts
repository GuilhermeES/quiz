Vue.component('alternativa-visualizacao', {
    props:['alternativa','key'],
    template: `
  <div class="container">
      <br>
        <div class="border-4">
            {{alternativa_data.texto}}<br/>
        </div>
  </div>
  `,
    data: function() {
        return {
            alternativa_data: this.alternativa,
        }
    }
});