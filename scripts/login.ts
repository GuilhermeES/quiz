Vue.component('login',{
    template: `<form class="form-signin"  v-on:submit="login($event)">
        <!--titulo formulario-->
        <h1 class="h3 mb-3 font-weight-normal">Entrar</h1>
        <hr>
        <!--email-->
        <input type="email" class="form-control" placeholder="Email"  v-model="email" required autofocus><br>
        <!--senha-->
        <input type="password" class="form-control" placeholder="Senha" v-model="senha" required="">
        <!--botao de logar-->
        <button class="btn btn-lg btn-primary btn-block" type="submit">Logar</button>
    </form>`,
    data: function () {
        return {
            email: '',
            senha: '',
        }
    },
    methods:{
        login($ev:any){
            $ev.preventDefault();
            let formData = new FormData();

            formData.append('email', this.email);
            formData.append('senha', this.senha);

            let url = '/login';

            fetch(url, {method: 'POST', body: formData})
                .then(function (response) {
                    return response.json();
                })
                .then(function (resposta) {
                    if(resposta.error){
                        alert("Dados incorretos");
                    }
                    else{
                        window.location.href = "/";
                    }
                });
        }
    }
});