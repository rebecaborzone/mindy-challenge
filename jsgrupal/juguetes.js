let data = []
let elementos = []
let impresion = []

async function getDatafromAPI() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(json=> data = json)
        elementos = data.response

        console.log("todo el array " , data)
        console.log("elementos dentro de response ", elementos)

// TRAYENDO JUGUETES
let juguetes = elementos.filter (item => item.tipo === "Juguete")
// console.log(juguetes)

// funcion k imprime las cards
function logJuguetes(array){
    let carrito = {}
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
    }
    var comprar;
    var templateHTML = ""
    if (array.length > 0){
        // para cada item del array juguetes, si tiene mas menos de 5 en stock, va quedan X unidades
        array.forEach(item => {
            if (item.stock < 5){
                    templateHTML +=
                    `<div class="card" style="width: 18rem;  height: 51rem">
                        <img src="${item.imagen}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${item.nombre} </h5>
                            <p class="card-text">${item.descripcion}</p>
                            <div class="d-flex flex-column justify-content-end align-items-center">
                            <p class="my-1" style="color: red;">Stock: ${item.stock}  ULTIMAS UNIDADES!!!!</p>
                            <p class="fw-bold my-1">Precio: $ ${item.precio}</p>
                            <div class="d-flex flex-row justify-content-center my-1">
                                <label class="me-3">Cantidad:</label>
                                <input type="number" class="cantidad" min="1" max="${item.stock}" name="cantidad" value="1">
                            </div>
                            <button id="boton-agregar1" class="boton-agregar btn btn-danger mt-2 border-dark" type="button" data-th="${item._id}">COMPRAR</button>
                        </div>
                    </div>
            </div>
            `
        } else {
            templateHTML+=`
            <div class="card" style="width: 18rem; height: 51rem">
                <img src="${item.imagen}" class="card-img-top" alt="imagen-farmacia">
                    <div class="card-body d-flex flex-column justify-content-between align-items-center h-50">
                        <div class="d-flex flex-column justify-content-between align-items-center">
                            <h5 class="card-title">${item.nombre}</h5>
                            <p class="card-text">${item.descripcion}</p>
                        </div>
                        <div class="d-flex flex-column justify-content-end align-items-center">
                            
                            <p class="my-1 fw-bold">Precio: $ ${item.precio}</p>   
                            <div class="d-flex flex-row justify-content-around my-1"> 
                                <label class="me-3">Cantidad:</label>
                                <input type="number" class="cantidad" min="1" max="${item.stock}"  name="cantidad" value="1">
                            </div>
                            <button class="boton-agregar btn btn-danger mt-2 border-dark" type="button" data-th="${item._id}">COMPRAR</button>
                        </div>
                    </div>
            </div>
            `
                    document.querySelector('#cards_juguetes').innerHTML = templateHTML
                }
            }
        )
    } else {
        templateHTML += 
          `<div class="card m-2 coincidencias">
             <h5 class="card-title">Guau! No hay coincidencias</h5>
             <img src="./archivos/perro_coincidencia.png" alt="perrito cavando">
         </div>`

         document.querySelector('#cards_juguetes').innerHTML = templateHTML
    }
}
logJuguetes(juguetes)

// BUSCADOR
var textSearch = ""
var search = document.querySelector("#searchInput")
search.addEventListener("keyup", filterAndRender)

function filterAndRender () {
    let palabrasDelBuscador = search.value.toLowerCase();
    let arregloFiltrado = filterName(palabrasDelBuscador)
    logJuguetes(arregloFiltrado)
    }

function filterName(parametro) {
    let arregloFiltrado = juguetes.filter((item) => {
    return item.nombre.toLowerCase().includes(parametro)})
    return arregloFiltrado 
    } 
    function filterName(parametro) {
        let arregloFiltrado = juguetes.filter((producto) => {
                return producto.nombre.toLowerCase().includes(parametro)})
        return arregloFiltrado 
    }  
    document.querySelectorAll('.boton-agregar').forEach(element => {
        element.addEventListener('click', function() {
            this.classList.remove("btn-white");
            this.classList.add("btn-success")
            this.innerHTML = "Mindy Feliz"
            var carrito = [];
            console.log(carrito);
            if (localStorage.getItem("carrito")) {  
                carrito = JSON.parse(localStorage.getItem("carrito"));
            }
            var cantidad = this.parentElement.querySelector('.cantidad').value;
            var id = this.getAttribute('data-th');
            var agregoCantidad = false;
            var producto = {
                id: id,
                cantidad: cantidad
            }
            if (localStorage.getItem("carrito")) {  
                for(var i=0; carrito.length > i; i++){
                    if(carrito[i].id == id){
                        carrito[i].cantidad = Number(carrito[i].cantidad) + Number(cantidad); 
                        agregoCantidad = true;
                    }
                }
            }

            if(agregoCantidad === false){
                carrito.push(producto);
            }


            localStorage.setItem("carrito", JSON.stringify(carrito));
            
        })
    });
}
    
    
getDatafromAPI()
// let data = []
// let elementos = []
// let impresion = []

// async function getDatafromAPI() {
//     await fetch("https://apipetshop.herokuapp.com/api/articulos")
//         .then(response => response.json())
//         .then(json=> data = json)
//         elementos = data.response

//         console.log("todo el array " , data)
//         console.log("elementos dentro de response ", elementos)

// // SEPARANDO JUGUETES
// let juguetes = elementos.filter (item => item.tipo === "Juguete")
// // console.log(juguetes)

// // IMPRIMIENDO CARD PARA C/JUGUETE
// function logJuguetes(array){
//     var templateHTML = ""
//     if (array.length > 0){
//         // PARA C/ITEM DE JUGUETES, SI TIENE MENOS DE 5 EN STOCK, QUEDAN x UNIDADES.
//         array.forEach(item => {
//             if (item.stock < 5){
//                     templateHTML +=
//                     `<div class="card" style="width: 18rem;">
//                         <img src="${item.imagen}" class="card-img-top" alt="...">
//                         <div class="card-body">
//                             <h5 class="card-title">${item.nombre} </h5>
//                             <p class="card-text">$${item.precio} </p>
//                             <p class="card-text">${item.descripcion}</p>
//                             <div class="stock">
//                                 <p class="card-text">ULTIMAS ${item.stock} UNIDADES</p>
//                             </div>
//                             <a href="#" class="btn btn-primary">COMPRAR</a>
//                         </div>
                        
//                     </div>`
//                     document.querySelector('#cards_juguetes').innerHTML = templateHTML
//             }else {
//                 templateHTML +=
//                     `<div class="card" style="width: 18rem;">
//                         <img src="${item.imagen}" class="card-img-top" alt="...">
//                         <div class="card-body">
//                             <h5 class="card-title">${item.nombre} </h5>
//                             <p class="card-text">$${item.precio} </p>
//                             <p class="card-text">${item.descripcion}</p>
//                             <a href="#" class="btn btn-primary">COMPRAR</a>
//                         </div>
//                     </div>`
//                     document.querySelector('#cards_juguetes').innerHTML = templateHTML
//                 }
//             }
//         )
//         // SI EL FILTRO NO ARROJA RESULTADOS, NO HAY RESULTADOS
//     } else {
//         templateHTML += 
//         `<div class="card m-2 coincidencias">
//             <h5 class="card-title">Guau! No hay coincidencias</h5>
//             <img src="./archivos/perro_coincidencia.png" alt="perrito cavando">
//         </div>`

//         document.querySelector('#cards_juguetes').innerHTML = templateHTML

//     }
// }
// logJuguetes(juguetes)

// // BUSCADOR
// var textSearch = ""
// var search = document.querySelector("#searchInput")
// search.addEventListener("keyup", filterAndRender)

// function filterAndRender () {
//     let palabrasDelBuscador = search.value.toLowerCase();
//     let arregloFiltrado = filterName(palabrasDelBuscador)
//     logJuguetes(arregloFiltrado)
//     }

// function filterName(parametro) {
//     let arregloFiltrado = juguetes.filter((item) => {
//     return item.nombre.toLowerCase().includes(parametro)})
//     return arregloFiltrado 
//     } 

// }
// getDatafromAPI()