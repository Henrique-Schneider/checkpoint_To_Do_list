//Verificando se existe um usuario no localStorage

if (!localStorage.user) {
  location.replace("index.html");
}

//criando a logica para carregar a pagina
window.addEventListener("load", function () {
//mostrar o nome do usuario no nav
  const userName = document.querySelector(".user-info p");
  
  

  //criando a funcao de sair 
  const btnFecharSessão = document.querySelector("#closeApp");
  btnFecharSessão.addEventListener("click", function () {
    let confirmacao = confirm("Deseja enserrar a sessão?");
    if (confirmacao) {
      //Linpando o local storage e redirecionando para a pagina login
      localStorage.clear();
      location.replace("/index.html");
    }
  });

  const urlTarefas = "https://ctd-fe2-todo-v2.herokuapp.com/v1/tasks";
  const usuario = JSON.parse(localStorage.user);
  const token = usuario.jwt;

  const criarTarefa = document.querySelector(".nova-tarefa");
  const novaTarefa = document.querySelector("#novaTarefa");

  consultarTarefas();

  //Criando nova tarefa POST

  criarTarefa.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Criar Tarefa");
    console.log(novaTarefa.value);

    const carregarTarefa = {
      description: novaTarefa.value.trim(),
    };
    const tarefaConfig = {
      method: "POST",
      body: JSON.stringify(carregarTarefa),
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    };
    console.log("Criando uma tarefa no banco de dados");
    fetch(urlTarefas, tarefaConfig)
      .then((response) => response.json())
      .then((tarea) => {
        console.log(tarea);
        consultarTarefas();
      })
      .catch((error) => console.log(error));

    //limpa o formulário
    criarTarefa.reset();
  });

  //obter lista de tarefas GET

  function consultarTarefas() {
    const settings = {
      method: "GET",
      headers: {
        authorization: token,
      },
    };
    console.log("verificando minhas tarefas");
    fetch(urlTarefas, settings)
      .then((response) => response.json())
      .then((tarefas) => {
        console.log(tarefas);
        //esqueleto que simula o que o conteúdo irá ocupar
        const skeleton = document.querySelector("#skeleton");
        // ele é excluido antes de carregar o conteudo
        if (skeleton) {
          skeleton.remove();
        }

        mostrarTarefas(tarefas);
        botaoAlterarStatus();
        botaoDeletarTarefa();
      })
      .catch((error) => console.log(error));
  }

  //renderiza tarefas no HTML

  function mostrarTarefas(listado) {
    const tarefasPendentes = document.querySelector(".tarefas-pendentes");
    tarefasPendentes.innerHTML = "";
    const tarefasTerminadas = document.querySelector(".tarefas-terminadas");
    tarefasTerminadas.innerHTML = "";

    listado.forEach((tarefa) => {
      //variável para manipular a data
      let encontrarData = new Date(tarefa.createdAt);

      if (tarefa.completed) {
        //lo mandamos al listado de tareas incompletas
        tarefasTerminadas.innerHTML += `
                        <li class="tarefa">
                            <div class="done"></div>
                            <div class="descricao">
                            <div>
                                <button><i id="${
                                  tarefa.id
                                }" class="fas fa-undo-alt change"></i></button>
                                <button><i id="${
                                  tarefa.id
                                }" class="far fa-trash-alt"></i></button>
                            </div>
                                <p class="nome">${tarefa.description}</p>
                                <p class="timestamp"><i class="far fa-calendar-alt"></i>${encontrarData.toLocaleDateString()} <i class="far fa-clock"></i>${encontrarData.getHours()}:${encontrarData.getMinutes()}</p>
                            </div>
                        </li>
                        `;
      } else {
        //enviamos para a lista de tarefas finalizadas
        tarefasPendentes.innerHTML += `
                        <li class="tarefa">
                            <div class="not-done change" id="${
                              tarefa.id
                            }"></div>
                            <div class="descricao">
                                <p class="nome">${tarefa.description}</p>
                                <p class="timestamp"><i class="far fa-calendar-alt"></i>${encontrarData.toLocaleDateString()} <i class="far fa-clock"></i>${encontrarData.getHours()}:${encontrarData.getMinutes()}</p>
                            </div>
                        </li>
                        `;
      }
    });
  }

  //alterar o status das tarefas PUT
  function botaoAlterarStatus() {
    const btnChangeStatus = document.querySelectorAll(".change");

    btnChangeStatus.forEach((botao) => {
      // atribuímos uma funcionalidade a cada botão
      botao.addEventListener("click", function (event) {
        const id = event.target.id;
        const url = `${urlTarefas}/${id}`;
        const carregarTarefa = {};

        if (event.target.classList.contains("fa-undo-alt")) {
          carregarTarefa.completed = false;
        } else {
          carregarTarefa.completed = true;
        }

        const alterarConfiguracoes = {
          method: "PUT",
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
          body: JSON.stringify(carregarTarefa),
        };
        fetch(url, alterarConfiguracoes).then((response) => {
          console.log(response.status);
          //renderiza as tarefas novamente
          consultarTarefas();
        });
      });
    });
  }

  //excluir tarefa DELETE

  function botaoDeletarTarefa() {
    const btnDeleteTarefa = document.querySelectorAll(".fa-trash-alt");

    btnDeleteTarefa.forEach((botao) => {
      // atribuímos uma funcionalidade a cada botão
      botao.addEventListener("click", function (event) {
        const id = event.target.id;
        const url = `${urlTarefas}/${id}`;

        const alterarConfiguracoes = {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        };
        fetch(url, alterarConfiguracoes).then((response) => {
          console.log(response.status);
          //renderiza as tarefas novamente

          consultarTarefas();
        });
      });
    });
  }
  const urlLogado = "https://ctd-fe2-todo-v2.herokuapp.com/v1/users/getMe";
  //obter lista de usuarios GET
  
  const configuracao = {
    method: "GET",
    headers: {
      authorization: token,
    },
  };
  console.log("verificando meus usuarios");
  fetch(urlLogado, configuracao)
  
    .then((response) => response.json())
    .then((usuario) => {
      let usuarioLogado = {
        id: usuario.id,
        firstName: usuario.firstName,
        lastName: usuario.lastName,
        email: usuario.email
      }
      localStorage.setItem("userLogado", JSON.stringify(usuarioLogado));
      
      userName.innerText = usuarioLogado.firstName + " " + usuarioLogado.lastName;
          
      console.log(usuarioLogado);
    })
    .catch((error) => console.log(error));
});
