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
                        <strong>Cantidad: <input type="number" name="cant" min="1" max="10" onchange="calcularSubTotal(100, this.value, 0)"></strong>
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

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(costo){
    let comissionCostHTML = document.getElementById("comissionText");

    let comissionToShow = Math.round((comissionPercentage * 100)) + "%";
    
    comissionCostHTML.innerHTML = comissionToShow;
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
        updateTotalCosts();
    });
    
    document.getElementById("express").addEventListener("change", function(){
        comissionPercentage = 0.07;
        updateTotalCosts();
    });

    document.getElementById("standard").addEventListener("change", function(){
        comissionPercentage = 0.05;
        updateTotalCosts();
    });

});