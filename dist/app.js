Vue.config.devtools=true;
Vue.config.productionTip=false;
// O vue deve ser iniciado após os componentes serem adicionados
let app = new Vue({
    el: '#app',
    data: function () {
        return {
            usuario: null
        }
    },
    mounted(){
        this.buscaUsuario();
    },
    methods: {
        buscaUsuario() {
            let that = this;

            fetch('/usuario', {})
                .then(function (response) {
                    return response.json();
                })
                .then(function (resposta) {
                    that.usuario = resposta;
                })
        }
    }
});
