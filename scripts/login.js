let form = document.querySelector('form');
let email = document.getElementById('inputEmail')
let labelSenha = document.getElementById('labelSenha')
let senha = document.getElementById('inputPassword')
let labelEmail = document.getElementById('labelEmail')
let msgError = document.getElementById('msgErr')
let button = document.getElementById('acessar')
let url = 'https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login';
let emailOk = false
let senhaOk = false
let verSenha = document.querySelector("#verSenha");
let esconderSenha = document.querySelector("#esconderSenha");

esconderSenha.addEventListener("click",()=> {
   
    if(senha.getAttribute("type") == "password" ){
        senha.setAttribute("type","text")
        esconderSenha.setAttribute("style","display: none")
        verSenha.setAttribute("style","display: block")  
    }else{
        senha.setAttribute("type","password")
    }
})

// evento de mostrar senha
verSenha.addEventListener("click",()=> {
    
    if(senha.getAttribute("type") == "text" ){
        senha.setAttribute("type","password")
        verSenha.setAttribute("style","display: none")
        esconderSenha.setAttribute("style","display:block")
         
    }else{
        senha.setAttribute("type","text")
    }
})

function buttOn() {
    button.disabled = false
    button.innerText = 'Acessar'
    button.style.background = '#7898FF'
}

function buttOff() {
    button.disabled = true
    button.innerText = 'Bloqueado'
    button.style.background = 'grey'
}

buttOff()

email.onkeyup = () => {
    email.value = email.value.trim()

    if (email.value === "") {
        emailOk = false
        labelEmail.setAttribute("style", "color:  red")
        labelEmail.innerHTML = "Email: Insira email"
        email.setAttribute('style', 'border-color: red')
        attButton()
    } else {
        emailOk = true
        labelEmail.setAttribute("style", "color:  green")
        labelEmail.innerHTML = "Email:"
        email.setAttribute('style', 'border-color: green')
        attButton()
    }
}

senha.onkeyup = () => {
    senha.value = senha.value.trim()

    if (senha.value === "") {
        senhaOk = false
        labelSenha.setAttribute("style", "color:  red")
        labelSenha.innerHTML = "Senha: Insira senha"
        senha.setAttribute('style', 'border-color: red')
        attButton()
    } else {
        senhaOk = true
        labelSenha.setAttribute("style", "color:  green")
        labelSenha.innerHTML = "Senha:"
        senha.setAttribute('style', 'border-color: green')
       attButton()
    }
}
    function formPronto() {
         if (emailOk && senhaOk) {
            return true
        } else {
            return false
        }
    }
    function attButton() {
        if (formPronto()) {
            buttOn()
        } else {
            buttOff()
        }
    }
    

form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    if (formPronto()) {
        realizarLogin()
    }
function realizarLogin(){

    const lValor = {
    email: email.value,
    password: senha.value
    };
    const loginApi = {
        method: 'POST',
        body: JSON.stringify(lValor),
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, loginApi)
    .then(async resposta => {
        if(resposta.status === 404){
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Usuario não existe</strong>'
            email.focus()
        } 
        else if (resposta.status === 400){
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Senha Incorreta </strong>'
            senha.focus();
        }
        else if (resposta.status === 201){ 
            
            let body = await resposta.json()
            const usuarioToken = body.jwt
            localStorage.setItem('user', usuarioToken);
            location.assign("./tarefas.html")
           
        }else{
            msgError.setAttribute('style', 'display: block')
            msgError.innerHTML = '<strong>Erro desconhecido </strong>'
        }
    
            //console.log(resposta.json());
        })
}
    });
    
