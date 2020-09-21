const ORDER_ASC_BY_NAME = "AZ";
var currentCommentsArray = [];
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
let SUCCESS_MSG = "¡Se ha realizado la publicación con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

function showCommentsProduct(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCommentsArray.length; i++){
        let product = currentCommentsArray[i];

            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <alt="` + product.score + `">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.user +`</h4>
                            <small class="text-muted">` + product.dateTime + ` </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </div>
            `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){
    let htmlContentToAppend = "";
    for(let i = 3; i < currentProductsArray.length; i++){
        let product = currentProductsArray[1];

        htmlContentToAppend += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row" id="` + product.name + `">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                    </div>
                    <div> Costo: $USD ` + product.cost +`</div>
                </div>
            </div>
        `
        }
        for(let i = 3; i < currentProductsArray.length; i++){
            let product = currentProductsArray[3];
    
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row" id="` + product.name + `">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name +`</h4>
                        </div>
                        <div> Costo: $USD ` + product.cost +`</div>
                    </div>
                </div>
            `
            }

        document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
}

function sortAndShowCommentsProduct(sortCriteria, commentsArray){
    currentSortCriteria = sortCriteria;

    if(commentsArray != undefined){
        currentCommentsArray = commentsArray;
    }

    //Muestro las categorías ordenadas
    showCommentsProduct();
}

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    //Muestro las categorías ordenadas
    showRelatedProducts();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCommentsProduct(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.currency + "" + product.cost;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
        }
    });
});