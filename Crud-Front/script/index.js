window.onload = function(){
    setInterval(exibeHoras, 1000);
    BASE_URL = "http://localhost:8080";
    Listacliente(JSON.stringify(DadosTela));
}

function exibeHoras() {
    var agora = new Date();
    var horas = agora.getHours().toString().padStart(2,0);
    var minutos = agora.getMinutes().toString().padStart(2, '0');
    var segundos = agora.getSeconds().toString().padStart(2, '0');

    var horarioFormatado = horas + ":" + minutos + ":" + segundos;

    document.getElementById("horas").innerHTML = horarioFormatado;

}

var estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MS", "MT", "MG", "PA", "PB", "PR", "PE", "PI", "RJ","RN", "RS", "RO", "RR", "SC", "TO"];

var menuStatus = document.getElementById("estado");
function exibeEstados() {
    for (var i = 0; i < estados.length; i++) {
        var sigla = estados[i];
        
        // Verifica se a opção já existe
        if (!menuStatus.querySelector("option[value='" + sigla + "']")) {
            var option = document.createElement("option");
            option.text = sigla;
            option.value = sigla;
            estado.add(option);
        }
    }
}

function SaveCliente() {
    var dadosCliente = DadosTela();
    var xhr = new XMLHttpRequest();
    var endpoint = this.BASE_URL + "/clientes/cadastrar";
    xhr.open("POST", endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
 
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || 201) {
                console.log("Requisição bem-sucedida. Status:", xhr.status);
                console.log("Resposta:", xhr.responseText);
            } else if(xhr.status != 200 || 201) {
                console.error("Erro na requisição. Status:", xhr.status);
                console.log("Resposta:", xhr.responseText);
            }
        }
    };
 
    xhr.send(JSON.stringify(dadosCliente));
}

function DadosTela() {
    const dadosCliente = {
        'nome' : document.getElementById('nome').value,
        'email' : document.getElementById('email').value,
        'cpf' : document.getElementById('cpf').value,
        'dataDeNascimento' : document.getElementById('dataDeNascimento').value,
        'estado' : document.getElementById('estado').value
    }
    return dadosCliente;
};

function Listacliente() {
    var dadosCliente = DadosTela();
    var xhr = new XMLHttpRequest();
    var endpoint = this.BASE_URL + "/clientes/list";
    xhr.open("GET", endpoint);
    xhr.setRequestHeader("Content-Type", "application/json");
 
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || 201) {
                console.log("Requisição bem-sucedida. Status:", xhr.status);
                console.log("Resposta:", xhr.responseText);

                
            var test = JSON.parse(xhr.responseText);
            
            mostrarclientes(test);
            } else if(xhr.status != 200 ||xhr.status != 201) {
                console.error("Erro na requisição. Status:", xhr.status);
                console.log("Resposta:", xhr.responseText);
            }

        }
    };
    xhr.send(JSON.stringify(dadosCliente));
}

function mostrarclientes(test) {
    var tabela = document.getElementById("table-Client").getElementsByTagName('tbody')[0];
 
    test.forEach(function (cliente) {
        var novaLinha = tabela.insertRow(tabela.rows.length);
 
        // Colocando dados
        var celulaNome = novaLinha.insertCell(0);
        var celulaEmail = novaLinha.insertCell(1);
        var celulaCPF = novaLinha.insertCell(2);
        var celulaDataNascimento = novaLinha.insertCell(3);
        var celulaEstado = novaLinha.insertCell(4);
 
        celulaNome.innerHTML = cliente.nome;
        celulaEmail.innerHTML = cliente.email;
        celulaCPF.innerHTML = cliente.cpf;
        celulaDataNascimento.innerHTML = cliente.dataDeNascimento;
        celulaEstado.innerHTML = cliente.estado;
 
        // Adicionando botão de editar
        var celulaEditar = novaLinha.insertCell(5);
        var btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.id = 'btnEditar'

        btnEditar.addEventListener('click', function () {
           //Função de editar aqui
            alert('Editar clicado para o cliente: ' + cliente.nome);
        });
        celulaEditar.appendChild(btnEditar);
 
        // Adicionando botão de excluir
        var celulaExcluir = novaLinha.insertCell(6);
        var btnExcluir = document.createElement('button');
        btnExcluir.id = 'btnExcluir'
        btnExcluir.textContent = 'Excluir';

        btnExcluir.addEventListener('click', function () {
            ExcluirCliente(DadosTela);
            reload();
        });
        celulaExcluir.appendChild(btnExcluir);
    });
}

function DadosTela() {
    const dadosCliente = {
        'nome' : document.getElementById('nome').value,
        'email' : document.getElementById('email').value,
        'cpf' : document.getElementById('cpf').value,
        'dataDeNascimento' : document.getElementById('dataDeNascimento').value,
        'estado' : document.getElementById('estado').value
    }
    return dadosCliente;
};

//adiciona os dados preenchidos a tabela
function addList() {
    var dados = [
        document.querySelector("#nome"),
        document.querySelector("#email"),
        document.querySelector("#cpf"),
        document.querySelector("#dataDeNascimento"),
        document.querySelector("#estado"),
    ];
 
    var tr = document.createElement('tr');

    dados.forEach(function (posicao) {
        var td = document.createElement('td');
        td.textContent = posicao.value;
        tr.appendChild(td);
    });
 
    var tabela = document.querySelector("#table-Client tbody");
    tabela.appendChild(tr);
}

function ExcluirCliente() {
    // Fazer a requisição para obter os dados
    var xhrGet = new XMLHttpRequest();
    var endpointGet = BASE_URL + "/clientes/list";
   
    xhrGet.open("GET", endpointGet);
    xhrGet.setRequestHeader("Content-Type", "application/json");
   
    xhrGet.onreadystatechange = function () {
      if (xhrGet.readyState == 4) {
        if (xhrGet.status == 200) {
          // Extrair o primeiro cliente dos dados do JSON retornado(talvez exista forma mais simples)
          var dadosClientes = JSON.parse(xhrGet.responseText);
   
          if (dadosClientes.length > 0) {
            var idsObtidos = dadosClientes[0];
   
            // Fazer a requisição DELETE para o cliente escolhido
            var xhrDelete = new XMLHttpRequest();
             var endpointDelete = BASE_URL + "/clientes/" + idsObtidos.id;
   
            xhrDelete.open("DELETE", endpointDelete);
            xhrDelete.setRequestHeader("Content-Type", "application/json");
   
            //apenas para verificar no console
            xhrDelete.onreadystatechange = function () {
              if (xhrDelete.readyState == 4) {
                if (xhrDelete.status == 204) {
                console.log("ID " + clienteParaExcluir.id + " excluído com sucesso. Status:", xhrDelete.status);
                } else if (xhrDelete.status == 404) {
                console.error("Cliente com ID " + clienteParaExcluir.id + " não encontrado. Status:", xhrDelete.status);
                } else {
                console.error("Erro ao excluir ID " + clienteParaExcluir.id + ". Status:", xhrDelete.status);
                  console.log("Resposta:", xhrDelete.responseText);
                }
              }
            };
   
            xhrDelete.send();
          } else {
            console.error("Nenhum cliente encontrado para exclusão.");
          }
        } else {
          console.error("Erro na requisição GET. Status:", xhrGet.status);
          console.log("Resposta:", xhrGet.responseText);
        }
      }
    };
   
    xhrGet.send();
  }