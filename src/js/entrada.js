const entradas = {
  fechaEntrada: '',
  fechaRecepcion: '',
  subtotal: '',
  folio: '',
  total: '',
  totaliva:'',
  totaldescuento:'',
  estatus: '',
  idUsuario: '',
  Proveedor: []
};

const entrada_producto = {
  cantidad: '',
  descripcion: '',
  costo: '',
  descuento: '',
  importeDDescuento: '',
  fechaCaducidad: '',
  IVA: '',
  importeADescuento:'',
  importeCiva: '',
  precio_sugerido: '',
  Producto:  []
};

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  consultarAPI(); //Consulta la API en el backend de PHP
  idUsuario(); //Añade el nombre del usuario al objeto entradas
  seleccionarFechacaducidad(); // Añade la fecha de caducidad del producto
  seleccionarFechaRecepcion();
}

async function consultarAPI() {
  try {
    
    const urlproveedor = `${location.origin}/api/proveedor`;
    const urlproducto =  `${location.origin}/api/productos`;    
    
    const resultprov = await fetch(urlproveedor);
    const resultprod = await fetch(urlproducto);
    
    const proveedor = await resultprov.json();
    const producto = await resultprod.json();
    
    mostrarProveedor(proveedor);
    mostrarProducto(producto);
  } catch (error) {
    console.log(error);
  }
}

function mostrarProveedor(proveedor) {
  proveedor.forEach(suplier => {
    const { id, nombre_comercial, nombre_fiscal, rfc, domicilio, telefono, correo } = suplier;

    const nombreProveedor = document.createElement("OPTION");
    nombreProveedor.textContent = rfc;
    nombreProveedor.value = id;
    document.querySelector("#proveedor").appendChild(nombreProveedor);
  });
  //Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
  document.querySelector("#proveedor").addEventListener("change", function () {
    const selectProveedorId = this.value;
    const proveedorSeleccionado = proveedor.find(suplier => suplier.id === selectProveedorId);
    // Llamar a la función para seleccionar la categoría
    seleccionarProveedor(proveedorSeleccionado);
  });
}

const proveedorSeleccionado = document.querySelector("#proveedor_seleccionado");
function seleccionarProveedor(resultado) {
  const { Proveedor } = entradas;
  
  entradas.Proveedor = { ...Proveedor, resultado };
  const nombre_comercial = resultado.nombre_comercial;
  proveedorSeleccionado.textContent = nombre_comercial;
  //console.log(entradas);
}

const inputFolio = document.querySelector("#folio");
const folioIngresado = document.querySelector("#folio_ingresado");
inputFolio.addEventListener("input", function(){
  entradas.folio = inputFolio.value;
  folioIngresado.textContent = entradas.folio;
  //console.log(entradas);
});

const inputFecha = document.querySelector("#fecha_recepcion");
function seleccionarFechaRecepcion() {
  inputFecha.addEventListener("input", function () {
    entradas.fechaRecepcion = inputFecha.value;
    //console.log(entradas);
  });
}

function obtenerFechaHoraActual() {
  const fechaHoraActual = new Date();

  const anio = fechaHoraActual.getFullYear();
  const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, "0");
  const dia = fechaHoraActual.getDate().toString().padStart(2, "0");

  const horas = fechaHoraActual.getHours().toString().padStart(2, "0");
  const minutos = fechaHoraActual.getMinutes().toString().padStart(2, "0");
  const segundos = fechaHoraActual.getSeconds().toString().padStart(2, "0");

  const fechaHoraFormateada = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  return fechaHoraFormateada;
}

function idUsuario() {
  entradas.idUsuario = document.querySelector('#id').value;
}

function mostrarProducto(producto) {
  producto.forEach(product => {
    const { id, nombre, id_marca, Marca, id_categoria, Categoria, id_producto_tipo, Tipo, codigo_barras, presentacion } = product;

    const opcion = document.createElement("OPTION");
    opcion.textContent = nombre;
    opcion.value = id;
    document.querySelector("#productos").appendChild(opcion);
  });
  //Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
  document.querySelector("#productos").addEventListener("change", function () {
    const selectProductId = this.value;
    const productoSeleccionado = producto.find(product => product.id === selectProductId);
    seleccionarProducto(productoSeleccionado);
  });
}

function seleccionarProducto(resultado) {
  const { Producto } = entrada_producto;

  entrada_producto.Producto = { ...Producto, resultado };
  //console.log(entrada_producto.Producto);
  $("#codigo_barras").val(resultado.codigo_barras);
  $("#presentacion").val(resultado.presentacion);
}

const inputCantidad = document.querySelector("#cantidad");
const inputDescripcion = document.querySelector("#descripcion");
const inputCosto = document.querySelector("#costo");
const inputDescuento = document.querySelector("#descuento");

const errorMensaje = document.querySelector(".error-message");
const errorMensaje2 = document.querySelector(".error-message2");
const errorMensaje3 = document.querySelector(".error-message3");

const actualizarImporte = () => {
  const cantidadIngresada = inputCantidad.value.trim();  
  const costoIngresado = inputCosto.value.trim();
  const descuentoIngresado = inputDescuento.value.trim();
  const esNumero = /^\d+(\.\d{0,4})?$/.test(descuentoIngresado);
  const esNumeroCosto = /^\d+(\.\d{0,4})?$/.test(costoIngresado);

  if (cantidadIngresada === "") {
    errorMensaje.textContent = "Campo obligatorio";
    return;
  }

  if (costoIngresado === "" || !esNumeroCosto) {
    errorMensaje2.textContent = "Campo obligatorio o formato de número incorrecto";
    return;
  }

  if (descuentoIngresado === "" || !esNumero) {
    errorMensaje3.textContent = "Campo obligatorio o formato de número incorrecto";
    return;
  }
  errorMensaje.textContent = "";
  errorMensaje2.textContent = "";
  errorMensaje3.textContent = "";

  const cantidad = parseFloat(cantidadIngresada);
  const costo = parseFloat(costoIngresado);
  const descuento = parseFloat(descuentoIngresado);
  if(cantidad <= 0){
    errorMensaje.textContent = "Ingrese una cantidad valida";
    return;
  }
  if(costo <= 0){
    errorMensaje2.textContent = "Ingrese una cantidad valida";
    return;
  }
  if(descuento < 0){
    errorMensaje3.textContent = "Ingrese un descuento valido";
    return
  }
  
  errorMensaje.textContent = "";
  errorMensaje2.textContent = "";
  errorMensaje3.textContent = "";
  
  let importe = (costo * cantidad).toFixed(3); 
  importe = Math.floor(parseFloat(importe) * 100) / 100;
  $("#importeADescuento").val(importe);
  entrada_producto.importeADescuento = parseFloat(importe);
  importe = (parseFloat((importe) - descuento).toFixed(3));
  $("#importeDDescuento").val(importe);
  entrada_producto.cantidad = cantidad;
  entrada_producto.costo = costo;
  entrada_producto.descuento = descuento;
  entrada_producto.importeDDescuento = parseFloat(importe);
};

// Escucha cambios en cualquiera de los tres inputs
inputCantidad.addEventListener("input", actualizarImporte);
inputCosto.addEventListener("input", actualizarImporte);
inputDescuento.addEventListener("input", actualizarImporte);

inputDescripcion.addEventListener("input", function(){
  entrada_producto.descripcion = inputDescripcion.value;
});

const checkbox = document.getElementById('Check');
checkbox.addEventListener('change', function() {
  if (this.checked) {
    $("#div_fecha_cad").show();
    $("#fecha_caducidad").prop("required", true);
  } else {
    $("#div_fecha_cad").hide();
    $("#fecha_caducidad").prop("required", false);
  }
});

/*checkboxIVA.addEventListener('change', function() {
  let IVA;
  let importe_mas_iva;
  let importe = $("#importeDDescuento").val();
  let cantidad = $("#cantidad").val();
  importe = parseFloat(importe);
  cantidad = parseFloat(cantidad);
  if (this.checked) {
    IVA = importe * 0.16;
    importe_mas_iva = IVA + importe;
    entrada_producto.IVA = IVA;
    entrada_producto.importeCiva = importe_mas_iva;
  } else {
    IVA = 0;
    entrada_producto.IVA = IVA;
    entrada_producto.importeCiva = importe;
    
  }
  let precioSugerido = importe_mas_iva / cantidad;
  entrada_producto.precio_sugerido = precioSugerido;
  
});*/

function seleccionarFechacaducidad() {
  const inputFechacaducidad = document.querySelector("#fecha_caducidad");
  inputFechacaducidad.addEventListener("input", function () {
    entrada_producto.fechaCaducidad = inputFechacaducidad.value;
  });
}

let entradas_productos = [];
$(document).on('click', '#btn_agregar_producto', function (event) {
  const form = document.querySelector('#form_producto');
  
  // Realizar validación
  if (!form.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    form.classList.add('was-validated');
    return; // Detener la ejecución si la validación falla
  }
  // Inicializar IVA en 0
  entrada_producto.IVA = 0;
  let IVA;
  let importe_mas_iva;
  let importe = $("#importeDDescuento").val();
  let cantidad = $("#cantidad").val();
  importe = parseFloat(importe);
  cantidad = parseFloat(cantidad);
  var checkboxIVA = document.getElementById('CheckIVA');

  if (checkboxIVA.checked) {
    IVA = importe * 0.16;
    importe_mas_iva = IVA + importe;
    entrada_producto.IVA = parseFloat(IVA.toFixed(2));
    entrada_producto.importeCiva = parseFloat(importe_mas_iva.toFixed(2));
  } else {
    IVA = 0;
    importe_mas_iva = IVA + importe;
    entrada_producto.IVA = parseFloat(IVA.toFixed(2));
    entrada_producto.importeCiva = parseFloat(importe_mas_iva.toFixed(2));
  }
  let precioSugerido = importe_mas_iva / cantidad;
  entrada_producto.precio_sugerido = parseFloat(precioSugerido.toFixed(2));

  
  // Crear un nuevo objeto para cada clic
  const nuevoProducto = {
    cantidad: entrada_producto.cantidad,
    descripcion: entrada_producto.descripcion,
    costo: entrada_producto.costo,
    descuento: entrada_producto.descuento,
    importeDDescuento: entrada_producto.importeDDescuento,
    fechaCaducidad: entrada_producto.fechaCaducidad,
    IVA: entrada_producto.IVA,
    importeADescuento: entrada_producto.importeADescuento,
    importeCiva: entrada_producto.importeCiva,
    precio_sugerido: entrada_producto.precio_sugerido,
    Producto: entrada_producto.Producto.resultado.id, // Para clonar el array Producto
  };

  // Agregar el nuevo objeto al arreglo
  entradas_productos.push(nuevoProducto);
  mostrarResumenProducto();
  actualizarSubtotal();
  console.log(entradas_productos);
  console.log(entradas);
  var cantidadElementos = entradas_productos.length;
  $(".badge").text(cantidadElementos);

  limpiarFormulario(form);
  
  //remover la validación del formulario
  form.classList.remove('was-validated');
});

// Obtén el elemento donde deseas mostrar el resumen
const resumen = document.querySelector('#producto');
function mostrarResumenProducto(){

  // Formatea los detalles del producto
  const { cantidad, importeADescuento, Producto } = entrada_producto;

  // Crea un elemento de lista para el producto
  const itemProducto = document.createElement('li');
  itemProducto.classList.add('list-group-item','d-flex', 'justify-content-between', 'lh-sm');

  // Agrega los detalles del producto al elemento de lista
  itemProducto.innerHTML = `
    <div>
      <h6 class="my-0">${Producto.resultado.nombre}</h6>
      <small class="text-muted">${Producto.resultado.Marca}</small>
    </div>
    <div>${cantidad}</div>
    <span class="text-muted">$${importeADescuento}</span>
    <button id="btn_eliminar_lista" type="button" class="btn btn-outline-danger"><svg class="bi"><use xlink:href="#trash"/></svg></button>
  `;

  // Agrega el elemento de la lista del producto al resumen
  resumen.appendChild(itemProducto);

}

$(document).on("click", "#btn_eliminar_lista", function (){  
    var li = $(this).closest("li");
    var index = Array.from(li.parent().children()).indexOf(li[0]);

      //Eliminar del arreglo
      if (index >= 0) {
        entradas_productos.splice(index, 1);
        actualizarSubtotal();
        //console.log(entradas_productos);
        //console.log(entradas);
        var cantidadElementos = entradas_productos.length;
        $(".badge").text(cantidadElementos);
      }
      li.remove();
    
});

var totalElement = $("#total");
var subtotalElement = $("#subtotal");
var ivaElement = $("#iva");
var descuentoElement = $("#total_descuento");
function actualizarSubtotal() {
  // Obtener el elemento strong donde mostrar el subtotal

  // Calcular la suma de los importes en el arreglo
  var sumaAImportes = 0;
  var sumaImportes = 0;
  var sumaIVAs = 0;
  var sumaDescuentos = 0;
  var sumaimportesCivas = 0;
  entradas_productos.forEach(function(entrada) {
    console.log(entrada.importeCiva);
    sumaAImportes += entrada.importeADescuento;
    sumaImportes += entrada.importeDDescuento;
    sumaIVAs += entrada.IVA;
    sumaDescuentos += entrada.descuento;
    sumaimportesCivas += entrada.importeCiva;
  });
  
  subtotalElement.text("$" + sumaAImportes.toFixed(2));
  descuentoElement.text("$" + sumaDescuentos.toFixed(2));
  ivaElement.text("$" + sumaIVAs);
  totalElement.text("$" + sumaimportesCivas);
  entradas.total = sumaimportesCivas;
  entradas.totaliva = sumaIVAs;
  entradas.subtotal = sumaAImportes.toFixed(2);
  entradas.totaldescuento = sumaDescuentos.toFixed(2);
}

const formEntrada = document.querySelector('#form_entrada');
$(document).on("click", "#btn_crear_entrada_producto", function (event) {
  
  if (!formEntrada.checkValidity()) {
    event.preventDefault();
    event.stopPropagation();
    formEntrada.classList.add('was-validated');
    return;
  }

  if (!entradas_productos || entradas_productos.length === 0) {
    $.confirm({
      theme: 'black',
      title: 'Error!',
      content: 'Aun no se encuentran productos agregados',
      type: 'red',
      typeAnimated: true,
      buttons: {
          tryAgain: {
              text: 'OK',
              btnClass: 'btn-red',
              close: function(){
              }
          },
      }
    });
    return;
  }

  crearEntrada();  
});

async function crearEntrada(){
    entradas.fechaEntrada = obtenerFechaHoraActual();
    entradas.estatus = "Pendiente de pago";
    const {fechaEntrada, fechaRecepcion, subtotal, folio, total, totaliva, totaldescuento, estatus,idUsuario, Proveedor} = entradas;
    
    const idProveedor = Proveedor.resultado.id;
    
    const datos = new FormData();
    datos.append("id_proveedor", idProveedor);
    datos.append("id_usuario", idUsuario);
    datos.append("fecha_entrada", fechaEntrada);
    datos.append("fecha_recepcion", fechaRecepcion);
    datos.append("subtotal", subtotal);
    datos.append("folio", folio);
    datos.append("total", total);
    datos.append("total_iva", totaliva);
    datos.append("total_descuento", totaldescuento)
    datos.append("estatus", estatus);

    const url = `${location.origin}/api/crear-entrada`;
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    })
    const resultado = await respuesta.json();
    if (resultado.resultado === true){
      const id_entrada = resultado.id;
      crear_entrada_producto(id_entrada);
      entradas_productos = [];
    } else {
      $.confirm({
        theme: 'black',
        title: 'Error!',
        content: 'Algo salió mal, intentalo mas tarde',
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'OK',
                btnClass: 'btn-red',
                close: function(){
                }
            },
        }
      });
    }
}

//funcion para crear un producto
async function crear_entrada_producto(id_entrada) {
  let exito = true

  for(const elemento of entradas_productos){
    const { cantidad, descripcion, costo, descuento, importeDDescuento, fechaCaducidad, IVA, importeADescuento, importeCiva, precio_sugerido, Producto} = elemento;
    const datos = new FormData();
    datos.append("id_entrada", id_entrada);
    datos.append("id_producto", Producto);
    datos.append("cantidad", cantidad);
    datos.append("descripcion", descripcion);
    datos.append("costo", costo);
    datos.append("descuento", descuento);
    datos.append("fecha_caducidad", fechaCaducidad);
    datos.append("iva", IVA);
    datos.append("importe_a_descuento", importeADescuento);
    datos.append("importe_d_descuanto", importeDDescuento);
    datos.append("importe_c_iva", importeCiva);
    datos.append("precio_sugerido", precio_sugerido);

    const url = `${location.origin}/api/crear-entrada_producto`;
    const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
    });

    const resultado = await respuesta.json();
    //console.log(resultado);

    // Verificar si la solicitud actual fue exitosa
    if (!resultado || !resultado.resultado) {
      exito = false; // Si hay un fallo, establecemos el estado en false
    }
  }   
    // Capturar el estado final después de salir del bucle
  if (exito) {
    $.confirm({
      theme: 'black',
      title: 'Exito!',
      content: 'Entrada agregada correctamente',
      type: 'blue',
      typeAnimated: true,
      buttons: {
          tryAgain: {
              text: 'OK',
              btnClass: 'btn-blue',
              close: function(){
              }
          },
      }
    });
  } else {
    $.confirm({
      theme: 'black',
      title: 'Error!',
      content: 'Algo salió mal, intentalo mas tarde.',
      type: 'red',
      typeAnimated: true,
      buttons: {
          tryAgain: {
              text: 'OK',
              btnClass: 'btn-red',
              close: function(){
              }
          },
      }
    });
  }
  entradas_productos = [];
  limpiarFormulario(formEntrada);
  folioIngresado.textContent="";
  proveedorSeleccionado.textContent="";
  subtotalElement.text("");
  descuentoElement.text("");
  ivaElement.text("");
  totalElement.text("");
  formEntrada.classList.remove('was-validated');    
}

function limpiarFormulario(form) {
  const inputs = form.querySelectorAll('input, select');
  inputs.forEach(input => {
    if (input.type === 'checkbox') {
      // Para checkboxes, establecer la propiedad checked en false
      input.checked = false;
      $("#div_fecha_cad").hide();
      $("#fecha_caducidad").prop("required", false);
      entrada_producto.IVA = 0;
    } else {
      // Para otros tipos de input y select, establecer el valor en ''
      input.value = '';
    }
  });
}