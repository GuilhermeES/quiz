Vue.component("alternativa-resposta",{props:["alternativa","key","respondido"],template:'\n  <div class="container">\n      <br>\n        <div class="border-4">\n            <input type=\'radio\' :name="alternativa_data.perguntas_id" :value="alternativa_data.id" v-model=\'respondido_data\'>\n            {{alternativa_data.texto}}<br/>\n        </div>\n  </div>\n  ',data:function(){return{alternativa_data:this.alternativa,respondido_data:this.respondido}},computed:{correta(){return this.alternativa_data.correta}},watch:{alternativa(t){this.alternativa_data=t},respondido(t){this.respondido_data=t},respondido_data(t){t==this.alternativa_data.id&&this.$emit("update:respondido",t)},correta(t){1==t&&this.$parent.selecionaAlternativa(this.alternativa_data.id)}}}),Vue.component("alternativa",{props:["alternativa","key"],template:'\n  <div class="container">\n    <br>\n     <p class="text-muted">\n       Selecione qual vai ser a resposta correta\n     </p>\n    <div class="border-3">\n        <br>\n         <input type=\'radio\' value="1" v-model=\'alternativa_data.correta\'>\n         <input type="text" placeholder="Escreva uma alternativa" v-model=\'alternativa_data.texto\'><br/>\n  \t</div>\n  </div>\n  ',data:function(){return{alternativa_data:this.alternativa}},computed:{correta(){return this.alternativa_data.correta}},watch:{alternativa(t){this.alternativa_data=t},correta(t){1==t&&this.$parent.selecionaAlternativa(this.alternativa_data.id)}}}),Vue.component("alternativa-visualizacao",{props:["alternativa","key"],template:'\n  <div class="container">\n      <br>\n        <div class="border-4">\n            {{alternativa_data.texto}}<br/>\n        </div>\n  </div>\n  ',data:function(){return{alternativa_data:this.alternativa}}}),Vue.component("cadastro",{template:'<form class="form-signin" v-on:submit="cadastro($event)">\n        \x3c!--titulo formulario--\x3e\n        <h1 class="h3 mb-3 font-weight-normal">Registrar</h1>\n        <hr>\n        \x3c!--Nome--\x3e\n        <input type="text" class="form-control" placeholder="Nome"  v-model="nome" required autofocus><br>\n        \x3c!--email--\x3e\n        <input type="email"  class="form-control" placeholder="Email" v-model="email" required=""><br>\n        \x3c!--senha--\x3e\n        <input type="password"  class="form-control" placeholder="Senha" v-model="senha" required="">\n        \x3c!--botao de logar--\x3e\n        <button class="btn btn-lg btn-success btn-block" type="submit" >Registrar</button>\n    </form>',data:function(){return{nome:"",email:"",senha:""}},methods:{cadastro(t){t.preventDefault();let a=new FormData;a.append("nome",this.nome),a.append("email",this.email),a.append("senha",this.senha);fetch("/cadastrar",{method:"POST",body:a}).then(function(t){return t.json()}).then(function(t){t.error?alert("Não foi possivel cadastrar"):alert("Cadastrado com sucesso")})}}}),Vue.component("inicio-quiz",{props:["usuario"],template:'\n        <div class="container">\n            <div class="imagem"></div>\n            <br>\n            <p class="font-weight-light">Lista de quizzes Início</p>\n                <hr>            \n                <div class="alert alert-success" role="alert" v-if="usuario != null">\n                    <h4 class="alert-heading">Muito bem!</h4>\n                    <p><div v-if="usuario.nivel == 1">Bem vindo, <b>{{usuario.nome}}</div></b> \n                    <div v-else="usuario.nivel == 0">Bem vindo, <b>{{usuario.nome}}</b> ,selecione o Quiz desejado para responder</div></p>\n                    <hr>\n                </div>                  \n              <div class="alert alert-warning" role="alert" v-if="usuario == null">\n                 Você deve estar logado para responder!\n              </div>         \n            <div class="lista-quiz"> \n                <ul class="list-group" v-for="quiz in quizzes">             \n                    <li class="list-group-item" >{{quiz.nome}}\n                        <a :href="\'/visualizar/\' + quiz.id" class="btn btn-outline-info btn-sm">Visualizar</a>                    \n                        <a :href="\'/resposta/\' + quiz.id" class="btn btn-outline-info btn-sm" v-if="usuario != null">Responder</a>                                    \n                    </li>                 \n                    <br>     \n                </ul>   \n                <br>\n            </div>\n        </div>',data:function(){return{quizzes:[]}},mounted(){this.busca()},methods:{busca(){fetch("/quiz/iniciobusca/",{method:"POST"}).then(function(t){return t.json()}).then(t=>{this.quizzes=t})}}}),Vue.component("listar-quiz",{template:'\n        <div class="container">\n            <br>\n            <p class="font-weight-light">Lista de quizzes</p>\n            <div class="lista-quiz"> \n                <ul class="list-group" v-for="quiz in quizzes">             \n                    <li class="list-group-item" >{{quiz.nome}}\n                       <button type="button" v-on:click="remover(quiz.id)" class="btn btn-outline-danger btn-sm">Deletar</button>\n                       <a :href="\'/quiz/\' + quiz.id" class="btn btn-outline-info btn-sm">Alterar</a>\n                    </li>                 \n                    <br>     \n                </ul>\n                <br>\n                <div class="listar">\n                    <button v-on:click=\'addQuiz\' class="btn btn-primary"> Adicionar novo Quiz</button> \n                </div>\n            </div>\n        </div>',data:function(){return{quizzes:[]}},mounted(){this.busca()},methods:{addQuiz(){fetch("/quiz/cadastro",{method:"POST"}).then(function(t){return t.json()}).then(function(t){t.error?alert("Não foi possivel cadastrar"):window.location.href="/quiz/"+t.id})},busca(){fetch("/quiz/busca",{method:"POST"}).then(function(t){return t.json()}).then(t=>{this.quizzes=t})},remover(t){let a=new FormData,n=this;if(a.append("id",t.toString()),confirm("Deseja remover?")){fetch("/quiz/delete",{method:"POST",body:a}).then(function(t){return t.json()}).then(function(a){0==a.error&&(n.quizzes=n.quizzes.filter(a=>a.id!==t))})}}}}),Vue.component("login",{props:["usuario"],template:'<form class="form-signin"  v-on:submit="login($event)">\n        \x3c!--titulo formulario--\x3e\n        <h1 class="h3 mb-3 font-weight-normal">Entrar</h1>\n        <hr>\n        \x3c!--email--\x3e\n        <input type="email" class="form-control" placeholder="Email"  v-model="email" required autofocus><br>\n        \x3c!--senha--\x3e\n        <input type="password" class="form-control" placeholder="Senha" v-model="senha" required="">\n        \x3c!--botao de logar--\x3e\n        <button class="btn btn-lg btn-primary btn-block" type="submit">Logar</button>\n    </form>',data:function(){return{email:"",senha:""}},methods:{login(t){t.preventDefault();let a=new FormData;a.append("email",this.email),a.append("senha",this.senha);fetch("/login",{method:"POST",body:a}).then(function(t){return t.json()}).then(function(t){t.error?alert("Dados incorretos"):window.location.href="/"})}}}),Vue.component("menu-quiz",{props:["usuario"],template:'\n        <nav class="navbar navbar-expand-lg navbar-light navbar-laravel">\n            <div class="container">\n                <a class="navbar-brand" href="/">QUIZ</a>\n                <i class="material-icons">\n                    list_alt\n                </i>\n                \n                <ul class="navbar-nav ml-auto">\n                    <li class="nav-item" v-if="usuario == null">\n                        <a class="nav-link" href="/login">Login</a>\n                    </li>\n                    <li class="nav-item" v-if="usuario == null">\n                         <a class="nav-link" href="/registro">Registrar</a>\n                    </li>\n                     <li class="nav-item" v-if="usuario != null">\n                         <a class="nav-link" v-if="usuario.nivel == 1" href="/quiz">Quizzess</a>\n                    </li> \n                     <li class="nav-item" v-if="usuario != null">\n                         <span class="font-weight-bold">{{usuario.nome}}</span>\n                    </li>                  \n                    <li class="nav-item" v-if="usuario != null">\n                         <button class="btn  btn-secondary btn-block" v-on:click="logout" >Sair</button>\n                    </li>                                                                \n                </ul> \n            </div>\n        </nav>',data:function(){return{sair:""}},methods:{logout(){fetch("/logout",{method:"GET"}).then(function(t){return t.json()}).then(function(){window.location.href="/login"})}}});class Quiz{constructor(){this.id=0,this.nome="",this.usuario_id=0,this.perguntas=[]}}class Perguntas{constructor(){this.id=0,this.titulo="",this.quiz_id=0,this.alternativas=[]}}class Alternativas{constructor(){this.id=0,this.correta=0,this.perguntas_id=0,this.texto=""}}Vue.component("pergunta",{props:["pergunta","key"],template:'\n  <div class="container">\n     <br/>\n     <div class="border-2">\n  \t    <input type=\'text\' v-model=\'pergunta_data.titulo\' class="form-control" placeholder="Escreva uma pergunta"><br/>\n            <button v-on:click=\'addAlternativa\' class="btn btn-primary">Adicionar Alternativa</button>\n        <div>\n    \t    <alternativa v-for=\'alternativa in pergunta_data.alternativas\' :alternativa=\'alternativa\' :indice="key"></alternativa>\n        </div>\n     </div>\n  </div>\n  ',data:function(){return{pergunta_data:this.pergunta}},methods:{addAlternativa(){let t=new FormData;t.append("perguntas_id",this.pergunta_data.id);fetch("/alternativa/cadastro",{method:"POST",body:t}).then(function(t){return t.json()}).then(t=>{this.pergunta_data.alternativas.push(t.data)})},alterarPergunta(){fetch("/alternativa/alterarPergunta",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(this.quiz)}).then(t=>{})},selecionaAlternativa(t){for(let a=0;a<this.pergunta_data.alternativas.length;a++)t==this.pergunta_data.alternativas[a].id?this.pergunta_data.alternativas[a].correta=1:this.pergunta_data.alternativas[a].correta=0}}}),Vue.component("pergunta-resposta",{props:["usuario","pergunta","key","respondido"],template:"\n  <div class=\"container\">\n  <br>\n     <div class=\"border-5\">\n  \t    {{pergunta_data.titulo}}<br/>\n  \t </div>\n        <div>\n    \t    <alternativa-resposta v-for='alternativa in pergunta_data.alternativas' :alternativa='alternativa' v-bind:respondido.sync='respondido_data'  :indice=\"key\"></alternativa-resposta>\n        </div>\n  </div>\n    ",data:function(){return{pergunta_data:this.pergunta,respondido_data:this.respondido}},watch:{respondido_data(t){this.$emit("update:respondido",t)},respondido(t){this.respondido_data=t}}}),Vue.component("pergunta-visualizacao",{props:["usuario","pergunta","key"],template:'\n  <div class="container">\n  <br>\n     <div class="border-5">\n  \t    {{pergunta_data.titulo}}<br/>\n  \t </div>\n        <div>\n    \t    <alternativa-visualizacao v-for=\'alternativa in pergunta_data.alternativas\' :alternativa=\'alternativa\' :indice="key"></alternativa-visualizacao>\n        </div>\n  </div>\n  ',data:function(){return{pergunta_data:this.pergunta}}}),Vue.component("quiz",{props:["usuario","id"],template:'\n    <div class="container">\n        <div class="addpergunta">\n            <h1>{{quiz.nome}}</h1>\n            <br>\n            <div class="border-1">\n  \t            <input type="text" class="form-control" v-model="quiz.nome" placeholder="Escreva título do Quiz"><br/>\n                <button v-on:click=\'addPergunta\'  class="btn btn-success">Adicionar pergunta</button>\n                <div>\n    \t            <pergunta v-for=\'(pergunta, key) in quiz.perguntas\' :pergunta=\'pergunta\' :indice="key"></pergunta>\n                </div>\n            </div>\n            <br>\n            <button :disabled="buttonDesabilitado()" v-on:click=\'alterar\' id="botao" class="btn btn-success">Salvar</button>\n        </div>\n    </div>\n  ',data:function(){let t=new Quiz;return t.id=this.id,{quiz:t}},mounted(){this.busca().then(t=>{this.quiz=t})},methods:{buttonDesabilitado(){return 0==this.quiz.perguntas.length},busca(){return fetch("/quiz/busca/"+this.id,{method:"GET"}).then(t=>t.json())},addPergunta(){let t=new FormData;t.append("id",this.id),fetch("/pergunta/cadastro",{method:"POST",body:t}).then(function(t){return t.json()}).then(t=>{this.quiz.perguntas.push(t.data)})},alterar(){if(""!=this.quiz.nome){for(let t=0;t<this.quiz.perguntas.length;t++){let a=!1;if(""==this.quiz.perguntas[t].titulo)return void Swal.fire("Escreva um titulo para a pergunta","","warning");for(let n=0;n<this.quiz.perguntas[t].alternativas.length;n++){if(""==this.quiz.perguntas[t].alternativas[n].texto)return void Swal.fire("Escreva um titulo para alternativa","","warning");this.quiz.perguntas[t].alternativas[n].correta&&(a=!0)}if(0==a)return void Swal.fire("Selecione uma alternativa","","warning")}fetch("/quiz/alterar",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(this.quiz)}).then(function(t){return t.json()}).then(function(t){0==t.error&&Swal.fire("Salvo!","","success").then(t=>{window.location.href="/quiz"})})}else Swal.fire("Escreva um titulo para o quiz","","warning")}}}),Vue.component("resposta",{props:["id","usuario","alternativa"],template:"\n    <div class=\"container\">\n        <div class=\"addpergunta\">\n            <h1>{{quiz.nome}}</h1>\n            <br>      \n                <div>\n    \t            <pergunta-resposta v-for='(pergunta, key) in quiz.perguntas' v-bind:respondido.sync='respostas[key]'  :pergunta='pergunta' :respondido='null' :indice=\"key\"></pergunta-resposta>\n                </div>\n            <hr>\n            <button v-on:click='cadastrarResposta'  class=\"btn btn-success\">conferir respostas</button>\n            <div v-if=\"resultado\">\n                <h3>Você acertou {{acertos}} de {{respostas.length}}</h3>\n            </div>  \n        </div>\n    </div>\n  ",data:function(){let t=new Quiz;t.id=this.id;return{acertos:0,quiz:t,resultado:!1,respostas:[]}},mounted(){this.busca().then(t=>{this.quiz=t;let a=[];for(let t=0;t<this.quiz.perguntas.length;t++)a.push(null);this.respostas=a})},methods:{busca(){return fetch("/visualizar/busca/"+this.id,{method:"GET"}).then(t=>t.json())},corretas(){let t=[],a=this.quiz.perguntas;for(let n=0;n<a.length;n++){let e=a[n];for(let a=0;a<e.alternativas.length;a++){let i=e.alternativas[a];1==i.correta&&this.respostas[n]==i.id&&t.push(i.id)}}this.resultado=!0,this.acertos=t.length},cadastrarResposta(){let t=new FormData,a=this;t.append("id",this.id),t.append("respostas",this.respostas),fetch("/cadastrarResposta",{method:"POST",body:t}).then(function(t){return t.json()}).then(t=>{t.error?alert("Não foi possivel cadastrar"):(console.log("teste"),a.corretas())})}}}),Vue.component("visualizar",{props:["id","usuario"],template:'\n    <div class="container">\n        <div class="addpergunta">\n            <h1>{{quiz.nome}}</h1>\n            <br>      \n                <div>\n    \t            <pergunta-visualizacao v-for=\'(pergunta, key) in quiz.perguntas\' :pergunta=\'pergunta\' :indice="key"></pergunta-visualizacao>\n                </div>\n            <hr>          \n        </div>\n    </div>\n    ',data:function(){let t=new Quiz;return t.id=this.id,{quiz:t}},mounted(){this.busca().then(t=>{this.quiz=t})},methods:{busca(){return fetch("/visualizar/busca/"+this.id,{method:"GET"}).then(t=>t.json())}}});