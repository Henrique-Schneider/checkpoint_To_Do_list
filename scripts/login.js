let form = document.querySelector("form");
let email = document.getElementById("inputEmail");
let labelSenha = document.getElementById("labelSenha");
let senha = document.getElementById("inputPassword");
let labelEmail = document.getElementById("labelEmail");
let msgError = document.getElementById("msgErr");
let button = document.getElementById("acessar");
let campoObrigatorio = document.querySelector("#campoObrigatorio");
let url = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/login";
let emailOk = false;
let senhaOk = false;

let verSenha = document.querySelector("#verSenha");
let esconderSenha = document.querySelector("#esconderSenha");

// evento de monstrar senha

esconderSenha.addEventListener("click", () => {
  let inputSenha = document.querySelector("#inputPassword");
  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
    esconderSenha.setAttribute("style", "display: none");
    verSenha.setAttribute("style", "display: block");
  } else {
    inputSenha.setAttribute("type", "password");
  }
});

// evento de mostrar senha
verSenha.addEventListener("click", () => {
  let inputSenha = document.querySelector("#inputPassword");
  if (inputSenha.getAttribute("type") == "text") {
    inputSenha.setAttribute("type", "password");
    verSenha.setAttribute("style", "display: none");
    esconderSenha.setAttribute("style", "display:block");
  } else {
    inputSenha.setAttribute("type", "text");
  }
});

function habilitarButtonSubmit() {
  button.disabled = false;
  button.innerText = "Acessar";
  button.style.background = "#7898FF";
}

function desabilitarButtonSubmit() {
  button.disabled = true;
  button.innerText = "Bloqueado";
  button.style.background = "grey";
}

desabilitarButtonSubmit();

email.onkeyup = () => {
  email.value = email.value.trim();

  if (email.value === "") {
    emailOk = false;
  } else {
    emailOk = true;
    atualizarStatusButtonSubmit();
  }
};

senha.onkeyup = () => {
  senha.value = senha.value.trim();

  if (senha.value === "" || senha.value === null) {
    desabilitarButtonSubmit();
    campoObrigatorio.setAttribute("style", "display: block");
    senhaOk = false;
  } else {
    senhaOk = true;
    campoObrigatorio.setAttribute("style", "display: none");
    atualizarStatusButtonSubmit();
  }
};
function oFormEstaOk() {
  if (emailOk && senhaOk) {
    return true;
  } else {
    return false;
  }
}
function atualizarStatusButtonSubmit() {
  if (oFormEstaOk()) {
    habilitarButtonSubmit();
  } else {
    desabilitarButtonSubmit();
  }
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault();

  if (oFormEstaOk()) {
    realizarLogin();
  }
  function realizarLogin() {
    const lValor = {
      email: email.value,
      password: senha.value,
    };
    const loginApi = {
      method: "POST",
      body: JSON.stringify(lValor),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, loginApi)
    .then(async (resposta) => {
      if (resposta.status === 404) {
        msgError.setAttribute("style", "display: block");
        msgError.innerHTML = "<strong>Usuario não existe</strong>";
        email.focus();
      } else if (resposta.status === 400) {
        msgError.setAttribute("style", "display: block");
        msgError.innerHTML = "<strong>Senha Incorreta </strong>";
        senha.focus();
      } else if (resposta.status === 201) {
        let body = await resposta.json();
        const usuarioToken = body.jwt;
        localStorage.setItem("user", usuarioToken);

        location.assign("./tarefas.html");
      } else {
        msgError.setAttribute("style", "display: block");
        msgError.innerHTML = "<strong>Erro desconhecido </strong>";
      }
      
      //console.log(resposta.json());
    })
    .then
    
  }
});
