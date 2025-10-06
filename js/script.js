// INDEX (Sections)
const elements = document.querySelectorAll('.efecto, .efecto-json');

function mostrarElementos() {
    const altura = window.innerHeight * 0.8;

    elements.forEach(element =>{
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < altura) {
            element.classList.add('show');
        }else {
            element.classList.remove('show');
        }
    })
}

window.addEventListener('scroll', mostrarElementos)


//-------PRESUPUESTO---------

//---Validación de "Datos Personales"----
const nombreInput = document.getElementById("nombre");
const apellidosInput = document.getElementById("apellidos");
const telefonoInput = document.getElementById("telefono");
const correoInput = document.getElementById("correo");
const formulario = document.getElementById("formulario");

function validarNombre(){
    const nombre = nombreInput.value;
    const nombrePattern = /^[a-zA-Zñáéíóú]+\s*[a-zA-Zñáéíóú]*$/;
    if (nombre.length >= 3 && nombre.length <= 15 && nombrePattern.test(nombre)){
        nombreInput.classList.add('valido')
        nombreInput.classList.remove('invalido')
        document.getElementById('nombreError').textContent = ''
    }else {
        nombreInput.classList.add('invalido')
        nombreInput.classList.remove('valido')
        document.getElementById('nombreError').textContent = 'El nombre debe contener sólo letras, tener al menos 3 caracteres y 15 como máximo'
    }
}

function validarApellidos(){
    const apellidos = apellidosInput.value;
    const apellidosPattern = /^[a-zA-Zñáéíóú]+\s*[a-zA-Zñáéíóú]*$/;
    if (apellidos.length >= 3 && apellidos.length <= 40 && apellidosPattern.test(apellidos)){
        apellidosInput.classList.add('valido')
        apellidosInput.classList.remove('invalido')
        document.getElementById('apellidosError').textContent = ''
    }else {
        apellidosInput.classList.add('invalido')
        apellidosInput.classList.remove('valido')
        document.getElementById('apellidosError').textContent = 'Los apellidos deben contener sólo letras, tener al menos 3 caracteres y 40 como máximo'
    }
}

function validarTelefono(){
    const telefono = telefonoInput.value;
    const telefonoPattern = /^\d{1,9}$/;
    if (telefonoPattern.test(telefono) && telefono.length <= 9){
        telefonoInput.classList.add('valido')
        telefonoInput.classList.remove('invalido')
        document.getElementById('telefonoError').textContent = ''
    }else {
        telefonoInput.classList.add('invalido')
        telefonoInput.classList.remove('valido')
        document.getElementById('telefonoError').textContent = 'El número de telefono debe contener sólo números y tener como máximo 9 dígitos'
    }
}

function validarCorreo(){
    const correo = correoInput.value;
    const correoPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (correoPattern.test(correo)){
        correoInput.classList.add('valido')
        correoInput.classList.remove('invalido')
        document.getElementById('correoError').textContent = ''
    }else {
        correoInput.classList.add('invalido')
        correoInput.classList.remove('valido')
        document.getElementById('correoError').textContent = 'Ingrese un correo electrónico válido'
    }
}

nombreInput.addEventListener('input', validarNombre)
apellidosInput.addEventListener('input', validarApellidos)
telefonoInput.addEventListener('input', validarTelefono)
correoInput.addEventListener('input', validarCorreo)

//Validar Datos
function validarDatos() {
    validarNombre()
    validarApellidos()
    validarTelefono()
    validarCorreo()

    if (nombreInput.classList.contains('valido') && apellidosInput.classList.contains('valido') && telefonoInput.classList.contains('valido') && correoInput.classList.contains('valido')){
        return true;     
    }else {
        return false;
    }
}

//---Productos----
//Array para almacenar productos en el carrito
let carrito = [];

//Elementos del DOM
const selectorProducto = document.getElementById("seleccion-producto");
const botonAniadirCarrito = document.getElementById("añadir-al-carrito");
const contenedorArticulosCarrito = document.getElementById("articulos-carrito");
const elementoTotalFinal = document.getElementById("total-final");

//Evento agregar productos al carrito
botonAniadirCarrito.addEventListener('click', () => {
    const opcionSeleccionada = selectorProducto.options[selectorProducto.selectedIndex];
    const valorSeleccionado = opcionSeleccionada.value;

    if(!valorSeleccionado){
        alert('Selecciona un producto')
        return
    }

    const [nombreProducto, precioProducto] = valorSeleccionado.split(":");
    const precio = parseFloat(precioProducto);

    //Agregar el producto al carrito
    carrito.push({nombre: nombreProducto, precio});

    actualizarCarrito()
    //console.log(carrito)
})

//Actualizar el carrito
function actualizarCarrito(){
    //Limpiar contenido previo
    contenedorArticulosCarrito.innerHTML = ''
 
    let totalCarrito = 0 

    //Mostrar productos
    carrito.forEach((producto, index) => {
        totalCarrito += producto.precio
        
        const articuloCarrito = document.createElement('div')
        articuloCarrito.classList.add('articulo-carrito')
        articuloCarrito.innerHTML = `
            ${producto.nombre} - ${producto.precio.toFixed(2)}
            <button class='eliminar-articulo' data-index='${index}'>Eliminar</button>
        `
        contenedorArticulosCarrito.appendChild(articuloCarrito)
    })

    // Funcionalidad para eliminar productos
    document.querySelectorAll('.eliminar-articulo').forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const index = e.target.dataset.index
            eliminarArticulo(index)
        })
    })

    actualizarTotalFinal()
}

//Eliminar productos del carrito
function eliminarArticulo(index) {
    // Eliminar producto
    carrito.splice(index, 1)  //Desde el índice, elimine 1 elemento solo

    //Actualizar el carrito
    actualizarCarrito()
}

// Calcular y mostrar el precio final

function actualizarTotalFinal() {
    let total = carrito.reduce((suma, item) => suma + item.precio, 0)

    // Sumar el precio de los extras seleccionados
    const extrasSeleccionados = document.querySelectorAll(".checkbox-extra:checked")
    extrasSeleccionados.forEach((checkbox) => {
        const [, precioExtra] = checkbox.value.split(':')
        total += parseFloat(precioExtra)
    })

    // Aplicar descuentos si está seleccionado
    const radioDescuento = document.querySelector('input[name="descuento"]:checked')
    if(radioDescuento){
        const valorDescuento = parseFloat(radioDescuento.value)
        total = total - (total * valorDescuento)
    }

    elementoTotalFinal.textContent = `Total final: ${total.toFixed(2)}€`
}

// Evento para actualizar el total cuando se seleccione/deseleccione los extras
const checkboxesExtras = document.querySelectorAll(".checkbox-extra")  //Estamos recuperando TODOS los check sin estar seleccionados
checkboxesExtras.forEach((checkbox) => {
    checkbox.addEventListener('change', actualizarTotalFinal)
})


// Evento para actualizar el total cuando cambie el descuento
const radiosDescuento = document.querySelectorAll('input[name="descuento"]')
radiosDescuento.forEach((radio) => {
    radio.addEventListener('change', actualizarTotalFinal)
})



//Validar condiciones aceptadas
const condiciones = document.getElementById("condiciones")

function validarCondiciones() {
    if (condiciones.checked === true){
        document.getElementById('condicionesError').textContent = ''
        return true
    }else {
        document.getElementById('condicionesError').textContent = 'Debe aceptar las condiciones de privacidad y envío del presupuesto.'
        return false
    }
}

// Resetear formulario
function resetFormulario(){
    formulario.reset()
    nombreInput.classList.remove('valido', 'invalido')
    apellidosInput.classList.remove('valido', 'invalido')
    telefonoInput.classList.remove('valido', 'invalido')
    correoInput.classList.remove('valido', 'invalido')
    document.getElementById('nombreError').textContent = ''
    document.getElementById('apellidosError').textContent = ''
    document.getElementById('telefonoError').textContent = ''
    document.getElementById('correoError').textContent = ''
    contenedorArticulosCarrito.textContent = ''
    carrito = []
    elementoTotalFinal.textContent = "Total final: 0€"

}

formulario.addEventListener('reset', resetFormulario)

// Enviar formulario
formulario.addEventListener('submit', function(event){
    event.preventDefault()
    validarDatos()
    validarCondiciones()

    if (validarDatos() === true && validarCondiciones() === true){
        alert('Formulario enviado correctamente')
        //Código de a dónde quiero enviar el formulario
        resetFormulario()
    }else{
        alert('Por favor, corrija los errores en el formulario')
    }
    

})

