// Os componentes não podem ter o nome de tags HTML, como <div>, <title> e <menu>
Vue.component('menu-quiz', {
    template: `<nav class="navbar navbar-expand-lg navbar-light navbar-laravel">
            <div class="container">
                <a class="navbar-brand" href="/">QUIZ</a>
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                    <li class="nav-item">
                         <a class="nav-link" href="#">Registrar</a>
                    </li>
                </ul>
            </div>
        </nav>`
});