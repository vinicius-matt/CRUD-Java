function validarNome() {
    var nomeInput = document.getElementById("nome");
    var nome = nomeInput.value.trim(); // Remove espaços em branco do início e do fim

    // Verifica se o campo não está vazio
    if (nome.length === 0) {
    
        return;
    }

    // Expressão regular para verificar se o nome contém apenas letras
    var re = /^[a-zA-Z\s]+$/;

    if (re.test(nome)) {
    
    } else {
        alert("Digite apenas Letras");
        nomeInput.value = nome.replace(/[^a-zA-Z\s]/g, ''); // Remove caracteres não permitidos
    }
}

// expressão validar cpf
function validarCPF() {
    var form = document.getElementById("formulario");
    var CPF = form.cpf;

    // Remove caracteres não numéricos do CPF
    var cpfNumerico = CPF.value.replace(/[^\d]/g, '');

    var re_cpf = /^(\d{3}\.?\d{3}\.?\d{3}-?\d{2}|\d{11})$/;
}

function formatarCPF(campo) {
    // Remove caracteres não numéricos do valor atual do campo
   var cpfAtual = campo.value.replace(/[^\d]/g, '');

// Verifica se o CPF já está formatado
   if (cpfAtual.length <= 11) {
    campo.value = cpfAtual.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
}

//verifica formato do email
function validaEmail() {
    var form = document.getElementById("formulario");
    var email = form.email.value;

    var re_email = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

   if (!re_email.test(email)) {
         alert("Padrão de e-mail inválido");
   } else {
         
     }
}