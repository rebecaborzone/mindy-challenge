// Evento para limpiar el carrito
document.getElementById("limpiar-carrito").addEventListener("click", function () {
    document.getElementById('carrito').innerHTML = '<p class="fs-2 text-center"> <img src="./archivos/empy-cart-negro.png" alt=""></p>';
    document.getElementById('total').innerHTML = '$0';

    localStorage.setItem("carrito", ""); // Vaciar local storage
});

// Evento para finalizar compra
document.getElementById("finalizar").addEventListener("click", function () {
    document.getElementById('carrito').innerHTML = '   <p class="d-flex flex-column  fs-1 text-danger text-center">Gracias por su compra</p> <img>   <img src="./archivos/perrofachero.png" alt="">                ';
    document.getElementById('total').innerHTML = '$0';

    localStorage.setItem("carrito", ""); // Vaciar carrito
});


getData()

async function getData() {
    await fetch("https://apipetshop.herokuapp.com/api/articulos")
        .then(response => response.json())
        .then(data => {
            productos = data.response
        })

    var html = "";

    if (localStorage.getItem("carrito") != ""){ 
         productosCarrito = JSON.parse(localStorage.getItem("carrito")); // Obtener datos de productos agregados al carrito
        html = getCarritoHtml(productosCarrito, productos); // Función para obtener el html de los productos del carrito
        document.getElementById('carrito').innerHTML = html;
    }
  

if(html == ""){ // Si el html está vacío es que no tiene productos agregados al carrito
    document.getElementById('carrito').innerHTML = '<p class="fs-2 text-center"> <img src="./archivos/empy-cart-negro.png" alt=""></p>';
    document.getElementById('total').innerHTML = '$0';
}

// Agregar evento a botones para eliminar producto individualmente
document.querySelectorAll(".eliminar-producto").forEach(element => {
    element.addEventListener("click", function () {
        document.getElementById('carrito').innerHTML = "";
        productosCarrito = JSON.parse(localStorage.getItem("carrito"));
        
        for(var i=0; productosCarrito.length > i; i++){
            if(this.getAttribute('data-th') == productosCarrito[i].id){ 
                productosCarrito[i] = {id: 0, cantidad: 0}; // Si coincide con el producto eliminado, agregarlo en el carrito como vacío
            }
        }
        var carrito = JSON.stringify(productosCarrito);
        localStorage.setItem("carrito", carrito); // Setear carrito en local storage sin el producto borrado

        location.reload();  // Recargar página para que se actualice el html sin el producto borrado
    })


});


    function getCarritoHtml(productosCarrito, productos) {
        var totalPrice = 0;
        
        
        productosCarrito.forEach(element => {
            for (var i = 0; productos.length > i; i++) {
                if (element.id == productos[i]._id) {
                    var cantidad = element.cantidad;
                    if(cantidad > productos[i].stock){
                        cantidad = productos[i].stock;  // Si supera el stock, que le ponga como cantidad el límite de stock
                    }
                    html += `
                            <div class="product card mb-3 mx-2 d-flex flex-column justify-content-between  py-3" style="width: 18rem; height: 32rem;">
                                <img class="card-img-top ms-5" style = "width: 75%;" src="${productos[i].imagen}" alt="imgproducto">
                                <div class="d-flex flex-column justify-content-between ">
                                    <h4 class="card-title text-center"> ${productos[i].nombre}</h4>
                                </div>
                                <div class="d-flex flex-column justify-content-end ">
                                    <div class="d-flex flex-row justify-content-center my-3">
                                        <label class="me-3" for="cantidad">Cantidad</label>
                                        <p>${cantidad}</p>
                                    </div>
                                    <p class="mt-2">Precio: $ ${productos[i].precio}</p>
                     
                                    <button data-th="${element.id}" class="eliminar-producto btn btn-danger mt-2">Eliminar</button>
                                </div>
                            </div>`;

                            totalPrice = totalPrice + cantidad * productos[i].precio;   // Sumar precio total acumulado
                }
            }
        });

        document.getElementById('total').innerHTML = '$'+totalPrice;
        return html;
    }
}