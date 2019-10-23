Vue.component('cadastro', {
    template: `<form class="form-signin" v-on:submit="cadastro($event)">
        <!--titulo formulario-->
        <h1 class="h3 mb-3 font-weight-normal">Registrar</h1>
        <hr>
        <!--Nome-->
        <input type="text" class="form-control" placeholder="Nome"  v-model="nome" required autofocus><br>
        <!--email-->
        <input type="email"  class="form-control" placeholder="Email" v-model="email" required=""><br>
        <!--senha-->
        <input type="password"  class="form-control" placeholder="Senha" v-model="senha" required="">
        <!--botao de logar-->
        <button class="btn btn-lg btn-success btn-block" type="submit" >Registrar</button>
    </form>`,
    data: function () {
        return {
            nome: '',
            email: '',
            senha: '',
        }
    },
    methods:{
        cadastro($ev:any){
            $ev.preventDefault();
            let formData = new FormData();

            formData.append('nome', this.nome);
            formData.append('email', this.email);
            formData.append('senha', this.senha);

            let url = '/cadastrar';

            fetch(url, {method: 'POST', body: formData})
                .then(function (response) {
                    return response.json();
                })

                .then(function (resposta) {
                    if(resposta.error){
                        alert("Não foi possivel cadastrar");
                    }
                    else {
                        alert("Cadastrado com sucesso");
                    }
                });
        }
    }
});