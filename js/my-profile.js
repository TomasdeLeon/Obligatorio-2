let miStorage= window.localStorage;

function guardarDatos(){

    //array de los datos
    var Datos = {
    "name": document.getElementById("nombres").value,
    "surname": document.getElementById("apellidos").value,
    "age": document.getElementById("edad").value,
    "email": document.getElementById("e-mail").value,
    "telephone": document.getElementById("telefono").value

    }
    //almaceno el array dentro del console
    console.log(Datos);
    
    //lo convertimos a un JSON
    allDatos = JSON.stringify(Datos);

    //almacenamos los datos en la base de dato local
    miStorage.setItem("frm", allDatos);

};

function eliminarDatos(){
    localStorage.removeItem("frm");
    window.location= "my-profile.html";
};


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //Se obtiene el formulario de publicación de producto
    var sellForm = document.getElementById("sell-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Vender'.
    sellForm.addEventListener("submit", function(e){

        let firstName = document.getElementById("nombres");
        let lastName = document.getElementById("apellidos");
        let age = document.getElementById("edad");
        let email = document.getElementById("e-mail");
        let telephone = document.getElementById("telefono");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        firstName.classList.remove("is-invalid");
        lastName.classList.remove("is-invalid");
        age.classList.remove("is-invalid");
        email.classList.remove("is-invalid");
        telephone.classList.remove("is-invalid");

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado el nombre
        //Consulto por el nombre
        if (firstName.value === "")
        {
            firstName.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por apellido
        if (lastName.value === "")
        {
            lastName.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la edad
        if (age.value <=0)
        {
            age.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el email
        if (email.value === "")
        {
            email.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el teléfono
        if (telephone.value === "")
        {
            telephone.classList.add('is-invalid');
            infoMissing = true;
        }

        if(!infoMissing)
        {
            //Aquí ingresa si pasó los controles, irá a enviar
            //la solicitud para crear la publicación.

            getJSONData(PUBLISH_PRODUCT_URL).then(function(resultObj){
                let msgToShowHTML = document.getElementById("mensaje");
                let msgToShow = "";
    
                //Si la publicación fue exitosa, devolverá mensaje de éxito,
                //de lo contrario, devolverá mensaje de error.
                if (resultObj.status === 'ok')
                {
                    msgToShow = resultObj.data.msg;
                    document.getElementById("alertResult").classList.add('alert-success');
                }
                else if (resultObj.status === 'error')
                {
                    msgToShow = ERROR_MSG;
                    document.getElementById("alert").classList.add('alert-danger');
                }
    
                msgToShowHTML.innerHTML = msgToShow;
                document.getElementById("alertResult").classList.add("show");
            });
        }

        //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
        if (e.preventDefault) e.preventDefault();
            return false;
    });
});