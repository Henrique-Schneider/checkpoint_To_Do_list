const url = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/"
let form = document.getElementById('form-cadastro')
let msgSuccess = document.getElementById('msgSucesso')
let msgError = document.getElementById('msgErr')


let iNome = document.getElementById('nome')
let labelNome = document.getElementById('labelNome')
let validNome = false

let iSobrenome = document.getElementById('sobrenome')
let labelSobrenome = document.getElementById('labelSobrenome')
let validSobrenome = false

let iEmail = document.getElementById('email')
let labelEmail = document.getElementById('labelEmail')
let validEmail = false



let iSenha = document.getElementById('senha')
let labelSenha = document.getElementById('labelSenha')
let validSenha = false

let rSenha = document.getElementById('rSenha')
let labelRsenha = document.getElementById('labelRsenha')
let validRsenha = false

// variaveis Globais ver e esconder
let verSenha = document.querySelector("#verSenha")
let esconderSenha = document.querySelector("#esconderSenha")
let esconderConfirSenha = document.querySelector("#esconderConfirSenha")
let verSenhaConfirmarSenha = document.querySelector("#verSenhaConfirmarSenha")
// evento de monstrar senha

esconderSenha.addEventListener("click",()=> {
   
    if(iSenha.getAttribute("type") == "password" ){
        iSenha.setAttribute("type","text")
        esconderSenha.setAttribute("style","display: none")
        verSenha.setAttribute("style","display: block")  
    }else{
        iSenha.setAttribute("type","password")
    }
})

// evento de mostrar senha
verSenha.addEventListener("click",()=> {
    
    if(iSenha.getAttribute("type") == "text" ){
        iSenha.setAttribute("type","password")
        verSenha.setAttribute("style","display: none")
        esconderSenha.setAttribute("style","display:block")
         
    }else{
        iSenha.setAttribute("type","text")
    }
})

esconderConfirSenha.addEventListener("click",()=> {
  if(rSenha.getAttribute("type") == "password" ){
      rSenha.setAttribute("type","text")
      esconderConfirSenha.setAttribute("style","display: none")
      verSenhaConfirmarSenha.setAttribute("style","display: block")  
      
     }else{
       rSenha.setAttribute("type","password")
     }
})

verSenhaConfirmarSenha.addEventListener("click",()=> {

if(rSenha.getAttribute("type") == "text" ){
   rSenha.setAttribute("type","password")
   verSenhaConfirmarSenha.setAttribute("style","display: none")
   esconderConfirSenha.setAttribute("style","display:block")
    
}else{
   rSenha.setAttribute("type","text")
}
})

function validaEmail(email) {
  let emailPattern =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return emailPattern.test(email);
}

iNome.addEventListener('keyup' , ()=>{
  if (iNome.value.length <= 5) {
   labelNome.setAttribute("style", "color:  red")
   labelNome.innerHTML = "Nome Insira no minino 5 caracteres"
   iNome.setAttribute('style', 'border-color: red')
   validNome = false
    
  }else{
    labelNome.setAttribute("style", "color:  green")
    labelNome.innerHTML = "Nome:"
    iNome.setAttribute('style', 'border-color: green')
    validNome = true
  }
})

iSobrenome.addEventListener('keyup' , ()=>{
  if (iSobrenome.value.length <= 6) {
   labelSobrenome.setAttribute("style", "color:  red")
   labelSobrenome.innerHTML = "Sobrenome Insira no minino 6 caracteres"
   iSobrenome.setAttribute('style', 'border-color: red')
   validSobrenome = false
    
  }else{
    labelSobrenome.setAttribute("style", "color:  green")
    labelSobrenome.innerHTML = "Sobrenome:"
    iSobrenome.setAttribute('style', 'border-color: green')
    validSobrenome = true
  }
})


iSenha.addEventListener('keyup' , ()=>{
  if (iSenha.value.length <= 5) {
    labelSenha.setAttribute("style", "color:  red")
    labelSenha.innerHTML = "Senha Insira no minino 5 caracteres"
    iSenha.setAttribute('style', 'border-color: red')
    validSenha = false
    
  }else{
    labelSenha.setAttribute("style", "color:  green")
    labelSenha.innerHTML = "Senha:"
    iSenha.setAttribute('style', 'border-color: green')
    validSenha = true
  }
})

rSenha.addEventListener('keyup' , ()=>{
  if (iSenha.value != rSenha.value) {
   labelRsenha.setAttribute("style", "color:  red")
   labelRsenha.innerHTML = "Repetir senha *Senha não é igual"
   rSenha.setAttribute('style', 'border-color: red')
   validRsenha = false
    
  }else{
    labelRsenha.setAttribute("style", "color:  green")
    labelRsenha.innerHTML = "Repetir senha:"
    rSenha.setAttribute('style', 'border-color: green')
    validRsenha = true
  }
})

iEmail.addEventListener('keyup' , ()=>{
  if (validaEmail(iEmail.value) !== true ) {
   labelEmail.setAttribute("style", "color:  red")
   labelEmail.innerHTML = "Email: Invalido"
   iEmail.setAttribute('style', 'border-color: red')
   validEmail = false
    
  }else{
    labelEmail.setAttribute("style", "color:  green")
    labelEmail.innerHTML = "Email:"
    iEmail.setAttribute('style', 'border-color: green')
    validEmail = true
  }
})




form.addEventListener("submit" , function (evento){
  evento.preventDefault()
  if(validNome && validSobrenome && validSenha && validRsenha && validEmail){
      msgSuccess.setAttribute('style', 'display: block')
      msgSuccess.innerHTML = '<strong>Cadastrando usuário...</strong>'
      msgError.setAttribute('style', 'display: none')
      msgError.innerHTML = ''
      animarBarra()
  } 
  else {
    msgError.setAttribute('style', 'display: block')
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>'
    msgSuccess.innerHTML = ''
    msgSuccess.setAttribute('style', 'display: none')
  }
  
  let criarCadastro = {
      "firstName": iNome.value,
      "lastName": iSobrenome.value,
      "email": iEmail.value,
      "password": iSenha.value
    }
    
    let cadastroApi = {
      method: 'POST',
      body: JSON.stringify(criarCadastro),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    
    fetch(url,cadastroApi)
    .then(resposta => {
      if(resposta.status === 400){
        setTimeout(() => {
          msgError.setAttribute('style', 'display: block')
          msgError.innerHTML = '<strong>email já cadastrado</strong>'
          msgSuccess.innerHTML = ''
          msgSuccess.setAttribute('style', 'display: none')
        }, 3000);
      }else if(resposta.status === 201){
        setTimeout(() => {
          window.location.href = "index.html"
        }, 5000);
        setTimeout(() => {
          msgSuccess.setAttribute('style', 'display: block')
          msgSuccess.innerHTML = '<strong>Sucesso.</strong>'
          msgError.setAttribute('style', 'display: none')
          msgError.innerHTML = ''
        }, 3000);
      } 
      else{
        msgError.setAttribute('style', 'display: block')
        msgError.innerHTML = '<strong>Erro API</strong>'
        msgSuccess.innerHTML = ''
        msgSuccess.setAttribute('style', 'display: none')
            
        }
      
      
    })

})

