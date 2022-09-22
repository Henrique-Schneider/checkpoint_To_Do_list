window.addEventListener("load", function () {
  //obtemos variáveis ​​globais 
  const form = document.forms[0];
  const email = document.querySelector("#inputEmail");
  const password = document.querySelector("#inputPassword");
  const botaoAcessarLogin = document.querySelector("#botaoAcessarLogin");


/* Altera as caracteristicas do botão acessar */
  botaoAcessarLogin.style.backgroundColor = "#979292A1"
  botaoAcessarLogin.innerText = "Bloqueado";





   const url = "https://ctd-todo-api.herokuapp.com/v1/users/login";
  
  
  //ouvimos o envio do formulário
  form.addEventListener("submit", function (e) {
    e.preventDefault();
   //cria o corpo da requisição

   
    const enviarSolicitacao = {
      email: email.value,
      password: password.value,
    };
    //configura a solicitação de busca
    const configuracoes = {
      method: "POST",
      body: JSON.stringify(enviarSolicitacao),
      headers: {
        "Content-Type": "application/json",
      },
    };

    //Lançamos a solicitação para a API 
    console.log("Iniciando a consulta da API");
    fetch(url, configuracoes)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          //cria um objeto literal com algumas informações que eu quero armazenar em LocalStorage
          const usuario = {
            jwt: data.jwt,
            
          };
          //Salvo no LocalStorage o objeto com o token e o nome do usuário
          localStorage.setItem("token", JSON.stringify(usuario));

          //redireciona para a página
          location.replace("/");
        }
        //limpa os campos do formulário
        form.reset();
   
    });
    
  });

  
  
  
}); 
