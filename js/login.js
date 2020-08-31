//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

function validar_email(dato){
    if(dato == ""){
        document.getElementById("emailHelp").style.display = "block";
    }else {
        document.getElementById("emailHelp").style.display = "none";
    }
}

function validar_password(dato){
    if(dato == ""){
        document.getElementById("passHelp").style.display = "block";
    }else {
        document.getElementById("passHelp").style.display = "none";
    }
}

function navegar(){
    var email= document.getElementById("exampleInputEmail1").value;
    var password= document.getElementById("exampleInputPassword1").value;
    if((email != "")&&(password != "")){ 
        window.location.assign('index.html');
    } 
    var datos = sessionStorage.setItem("usuario", email);
}