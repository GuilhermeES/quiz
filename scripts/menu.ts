Vue.component('menu-quiz', {
    props:['usuario'],
    template: `
        <nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="/">QUIZ</a>
                <i class="material-icons">
                    list_alt
                </i>
                
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="usuario == null">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item" v-if="usuario == null">
                         <a class="nav-link" href="/registro">Registrar</a>
                    </li>
                     <li class="nav-item" v-if="usuario != null">
                         <a class="nav-link" v-if="usuario.nivel == 1" href="/quiz">Quizzess</a>
                    </li> 
                     <li class="nav-item" v-if="usuario != null">
                         <span class="font-weight-bold">{{usuario.nome}}</span>
                    </li>                  
                    <li class="nav-item" v-if="usuario != null">
                         <button class="btn  btn-secondary btn-block" v-on:click="logout" >Sair</button>
                    </li>                                                                
                </ul> 
            </div>
        </nav>`,
    data: function () {
        return {
            sair: '',
        }
    },
    methods:{
        logout(){
            let url = '/logout';
            fetch(url, {method: 'GET'})
                .then(function (response) {
                    return response.json();
                })
                .then(function () {
                    window.location.href = "/login";
                });
        }
    }
});