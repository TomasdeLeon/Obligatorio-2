var currentSortCriteria = undefined;
let productCost = 0;
let productCount = 0;
let comissionPercentage = 0.13;

function showArticles(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < carrito.articles.length; i++){
        let articles = carrito.articles[i];

        htmlContentToAppend += `
            <div class="row">
                <div class="col-4">
                    <img src="` + articles.src + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">`+ articles.name +`</h6>
                        <strong>Cantidad: <input type="number" name="cant" min="1" max="10" onchange="calcularSubTotal(100, this.value, 0)" value=""></strong>
                    </div>
                    <small class="text-muted"> Total: ` + articles.currency +`  ` + articles.unitCost +`</small>
                </div>
            </div>
        `

        document.getElementById("articulo").innerHTML = htmlContentToAppend;
    }
}
/*
function sortAndShowArticles(sortCriteria, articlesArray){
    currentSortCriteria = sortCriteria;

    if(articlesArray != undefined){
        articles = articlesArray;
    }

    //Muestro los productos ordenados
    showArticles();
}
*/

var articles= [100];

// VARIABLE CON EL DIV QUE CONTIENE EL CONTENIDO COMPLETO. 
var divCont = document.getElementById("demo");

// ITERO LA LISTA
for (i = 0; i < articles.length; i++) {
	
// CREAR UN ELEMENTO HTML DEL TIPO P 
  var parrafo= document.createElement("P");
  // SETEO UN ID 
  parrafo.setAttribute("id", "parr"+i);
  
	//creo variable SUBTOTAL 
	var subTotal= document.createElement("span");
	subTotal.setAttribute("id", "span"+i);
	var textoSpan= document.createTextNode("-");
	
	//agrego la variable SUBTotal 
	subTotal.appendChild(textoSpan);
	parrafo.appendChild(subTotal);
    document.getElementById("demo").appendChild(parrafo);
  
}

function calcularSubTotal(costo, cantidad, idParrafo){
var texto= "UYU " + costo*cantidad ;
document.getElementById("span"+idParrafo).innerHTML = texto;
}

function validarPago() {
    var pago = document.form.tarjeta;
    var errorformadepago = document.getElementById("errorformadepago");
    for (i = 0; i < pago.length; i++) {
      if (pago[i].checked) {
      errorformadepago.innerHTML = " ";
    }
    else {
        errorformadepago.innerHTML = "Debe seleccionar forma de pago";
    }
  }
}

document.getElementById("premium").addEventListener("change", function(){
    comissionPercentage = 0.15;
    calcularTotal();
});

document.getElementById("express").addEventListener("change", function(){
    comissionPercentage = 0.07;
    calcularTotal();
});

document.getElementById("standard").addEventListener("change", function(){
    comissionPercentage = 0.05;
    calcularTotal();
});


//Función que se utiliza para actualizar los costos de publicación
function calcularTotal(costo){
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let comissionToShow = Math.round((comissionPercentage * 100)) + "%";
    let totalCostToShow = "UYU " + (Math.round(costo * comissionPercentage * 100) / 100);
    
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carrito = resultObj.data;
            showArticles(carrito);
        }
    });

    document.getElementById("premium").addEventListener("change", function(){
        comissionPercentage = 0.15;
        calcularTotal();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        comissionPercentage = 0.07;
        calcularTotal();
    });

    document.getElementById("standard").addEventListener("change", function(){
        comissionPercentage = 0.05;
        calcularTotal();
    });

    //Se obtiene el formulario de publicación de producto
    var sellForm = document.getElementById("sell-info");

    //Se agrega una escucha en el evento 'submit' que será
    //lanzado por el formulario cuando se seleccione 'Vender'.
    sellForm.addEventListener("submit", function(e){

        let productAddressInput = document.getElementById("address");
        let productAddress2Input = document.getElementById("address2");
        let productCountryInput = document.getElementById("country");
        let productLocateInput = document.getElementById("locate");
        let productArticleInput = document.getElementById("articulo");
        let infoMissing = false;

        //Quito las clases que marcan como inválidos
        productAddressInput.classList.remove('is-invalid');
        productAddress2Input.classList.remove('is-invalid');
        productCountryInput.classList.remove('is-invalid');
        productLocateInput.classList.remove('is-invalid');
        productArticleInput.classList.remove('is-invalid');

        //Se realizan los controles necesarios,
        //En este caso se controla que se haya ingresado el nombre y categoría.
        //Consulto por la dirección
        if (productAddressInput.value === "")
        {
            productAddressInput.classList.add('is-invalid');
            infoMissing = true;
        }
        
        //Consulto por la esquina
        if (productAddress2Input.value === "")
        {
            productAddress2Input.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por el país
        if (productCountryInput.value === "")
        {
            productCountryInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la localidad
        if (productLocateInput.value === "")
        {
            productLocateInput.classList.add('is-invalid');
            infoMissing = true;
        }

        //Consulto por la localidad
        if (productArticleInput.value === "")
        {
            productArticleInput.classList.add('is-invalid');
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