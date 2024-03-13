//Cookies para manter os valores ja preenchidos

//limite max =  20p/dominio
//acessar cookie
//document.cookie ="nome=valor; expires=data; path=";
function writeCookie(name, value , days){
    var expires = "";


if(days){
    var date = new Date();
    date.setTime(date.getTime() + (days * 24*60*60*1000));
    expires = "; expires=" + date.toGMTString();
}

if(value != "" && value != null && value != "null"){
    //Definindo cookie com valor,nome e data de expiração

    document.cookie = name + "=" + value + expires + "; path/"; 
  }
}

function readCookie(name){
    var searchName = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0 ; i < cookies.length; i++){
        var c = cookies[i];
        while(c.charAt(0) == '')
        c = c.substring(1, c.length);
    if(c.indexOf(searchName) == 0)
     return c.substring(searchName.length, c.length);
    }
    return null;
}

function eraseCookies(name){
    //Apagar cookie
    writeCookie(name, "", -1);
}