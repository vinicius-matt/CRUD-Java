function limpaDados() {
    document.getElementById("formulario").reset();
}

function Campo(){
 validaEmail();
 SaveCliente();
 addList();
 limpaDados();
 location.reload();
}

