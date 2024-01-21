const productos = {
    nombre: "",
    codigo: "",
    presentacion: "",
    Marca: [],
    Categoria: [],
    Tipo: []
  };

document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});

function iniciarApp(){
    consultarAPI();
}

async function consultarAPI(){
    try{
        const urlcategoria = "/api/categoria";
        const urlmarca = "/api/marca";   
        const urlp_tipo = "/api/producto_tipo"; 
        const url_p_join = "/api/productos";    

        const resulcat = await fetch(urlcategoria);
        const resulmarc = await fetch(urlmarca);
        const resultp_tipo = await fetch(urlp_tipo);
        const result_p_join= await fetch(url_p_join);

        const categoria = await resulcat.json();
        const marca = await resulmarc.json();
        const producto_tipo = await resultp_tipo.json();
        const p_join = await result_p_join.json();

        mostrarMarca(marca);
        mostrarCategoria(categoria);
        mostrarTipo(producto_tipo);
        mostrarTabla(p_join);
    } catch (error){
        console.log(error);
    }
}

function mostrarTabla(p_join){
  var tabla = $("#myTable").DataTable();
  tabla.clear().destroy();

  let body = "";

  p_join.forEach((value) => {
    
    value.id = value.id == null ? "" : value.id;
    value.nombre = value.nombre == null ? "" : value.nombre;
    value.id_marca = value.id_marca == null ? "" : value.id_marca;
    value.Marca = value.Marca == null ? "" : value.Marca;
    value.id_categoria = value.id_categoria == null ? "" : value.id_categoria;
    value.Categoria = value.Categoria == null ? "" : value.Categoria;
    value.id_producto_tipo = value.id_producto_tipo == null ? "" : value.id_producto_tipo;
    value.Tipo = value.Tipo == null ? "" : value.Tipo;
    value.codigo_barras = value.codigo_barras == null ? "" : value.codigo_barras;
    value.presentacion = value.presentacion == null ? "" : value.presentacion;
    
    var data_campos = `             data-id="${value.id}"   
                                    data-nombre="${value.nombre}"
                                    data-id_marca="${value.id_marca}"
                                    data-Marca="${value.Marca}"
                                    data-id_categoria="${value.id_categoria}"
                                    data-Categoria="${value.Categoria}"
                                    data-id_producto_tipo="${value.id_producto_tipo}"
                                    data-Tipo="${value.Tipo}"
                                    data-codigo_barras="${value.codigo_barras}"
                                    data-presentacion="${value.presentacion}"`;
    
      body += "  <tr>";
      body += "      <td>";
      body += '          <div class="dropdown">';
      body +=	'             <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
			body += '              	Acciones <span class="caret"></span>';
			body += "             </button>";
			body += '             <ul class="dropdown-menu">';
			body += `               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="ver" ${data_campos}>Ver</a></li>`;
			body += `				        <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="editar" ${data_campos}>Editar</a></li>`;
			body += '               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="eliminar" data-id="' + value.id + '">Eliminar</a></li>';
			body += "             </ul>";
			body += "           </div>";
      body += "      </td>";
      body += `      <td>${value.nombre}</td>`;
      body += `      <td>${value.Marca}</td>`;
      body += `      <td>${value.Categoria}</td>`;
      body += `      <td>${value.Tipo}</td>`;
      body += `      <td>${value.presentacion}</td>`;
      body += "  </tr>";
  });
  $("#myTable tbody").html(body);
  $("#myTable").DataTable();
}

function get_tag(t) {
  return {
    id: $(t).data("id"),
    nombre: $(t).data("nombre"),
    id_marca: $(t).data("id_marca"),
    Marca: $(t).data("Marca"),
    id_categoria: $(t).data("id_categoria"),
    Categoria: $(t).data("Categoria"),
    id_producto_tipo: $(t).data("id_producto_tipo"),
    Tipo: $(t).data("Tipo"),
    codigo_barras: $(t).data("codigo_barras"),
    presentacion: $(t).data("presentacion")
  };
}

function mostrarCategoria(categoria) {
    categoria.forEach(cate => {
      const { id, descripcion } = cate;
      const descripcionCategoria = $("<option>").text(descripcion).data("id", id).val(id);
    
      $("#categoria").append(descripcionCategoria);
    });
    // Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
    $("#categoria").on("change", function () {
      const seleccionadoId = this.value;
      const categoriaSeleccionada = categoria.find(cate => cate.id === seleccionadoId);
      // Llamar a la función para seleccionar la categoría
      seleccionarCategoria(categoriaSeleccionada);
    });
}

function seleccionarCategoria(resultado) {
    const { Categoria } = productos;
  
    productos.Categoria = { ...Categoria, resultado};
    console.log(productos.Categoria);
  
}

function mostrarMarca(marca) {
    marca.forEach(mark => {
      const { id, descripcion } = mark;
      
      const descripcionMarca = $("<option>").text(descripcion).data("id", id).val(id);
    
      $("#marca").append(descripcionMarca);
    });
    //Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
    $("#marca").on("change", function () {
      const selectMarcaId = this.value;
      const marcaSeleccionada = marca.find(mark => mark.id === selectMarcaId);
      // Llamar a la función para seleccionar la categoría
      seleccionarMarca(marcaSeleccionada);
    });
}

function seleccionarMarca(resultado) {
    const { Marca } = productos;
  
    productos.Marca = { ...Marca,resultado};
    console.log(productos.Marca);
}

function mostrarTipo(producto_tipo) {
    producto_tipo.forEach(tipo => {
      const { id, descripcion } = tipo;
  
      const descripcionTipo = $("<option>").text(descripcion).data("id", id).val(id);
    
      $("#tipo_medida").append(descripcionTipo);
    });
    //Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
    $("#tipo_medida").on("change", function () {
        const selectTipoId = this.value;
        const tipoSeleccionado = producto_tipo.find(tipo => tipo.id === selectTipoId);
        
        // Llamar a la función para seleccionar la categoría
        seleccionarTipo(tipoSeleccionado);
      });
}

function seleccionarTipo(resultado) {
    const { Tipo } = productos;
  
    productos.Tipo = { ...Tipo, resultado };
    console.log(productos.Tipo);
}

// Agrega un evento de escucha al input para capturar lo que el usuario escribe
$(document).on("blur", "#nombre", function () {
    const nombreIngresado = $("#nombre").val();
    
    // Expresión regular para validar solo letras alfabéticas
    //const letrasAlfabeticas = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
    
    //if (letrasAlfabeticas.test(nombreIngresado)) {
      // Si el valor es válido, asigna el valor al objeto entradas
      productos.nombre = nombreIngresado;
      // Borra cualquier mensaje de error anterior
      //errorMensaje.textContent = "";
    //} else {
      //errorMensaje.textContent = "Ingrese solo caracteres alfabéticos";
      //console.log("Ingrese solo caracteres alfabéticos");
    //}
});

// Agrega un evento de escucha al input para capturar lo que el usuario escribe
$(document).on("blur", "#codigo", function () {
    const codigoIngresado = $("#codigo").val();
    // Asigna el valor al objeto entradas
    productos.codigo = codigoIngresado;
});

$(document).on("blur", "#presentacion", function () {
    const presentacion = $("#presentacion").val();
    // Asigna el valor al objeto entradas
    productos.presentacion = presentacion;
});

const form = document.querySelector('#form_producto');

function limpiarFormulario(form) {
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(input => {
      input.value = '';
    });
}

$(document).on('click', '#button_accion', function () {
  var opcion = $(this).data("opcion");
  var data = get_tag(this);
  var id = data.id;
  var nombre = data.nombre;
  var id_categoria = data.id_categoria;
  var id_marca = data.id_marca;
  var id_producto_tipo = data.id_producto_tipo;
  var codigo = data.codigo_barras;
  var presentacion = data.presentacion;

  switch (opcion) {
    case 'crear':
      $("#modal-title").text("Crear producto");
      $("#modal_action_button").text("Crear");
      $("#modalSignin").modal('show');
      limpiarFormulario(form);
        break;

    case 'editar':      
      $("#nombre").val(nombre);
      $("#categoria").val(id_categoria).trigger("change");
      $("#marca").val(id_marca).trigger("change");
      $("#tipo_medida").val(id_producto_tipo).trigger("change");
      $("#codigo").val(codigo);
      $("#presentacion").val(presentacion);
      
      $("#modal-title").text("Actualizar producto");
      $("#modal_action_button").text("Actualizar");
      $("#modal_action_button").data("id", id);
      $("#modalSignin").modal('show');
        break;
   
    case 'ver':
      $("#nombre").val(nombre);
      $("#nombre").prop('disabled', true);
      $("#categoria").val(id_categoria).trigger("change");
      $("#categoria").prop('disabled', true);
      $("#marca").val(id_marca).trigger("change");
      $("#marca").prop('disabled', true);
      $("#tipo_medida").val(id_producto_tipo).trigger("change");
      $("#tipo_medida").prop('disabled', true);
      $("#codigo").val(codigo);
      $("#codigo").prop('disabled', true);
      $("#presentacion").val(presentacion);
      $("#presentacion").prop('disabled', true);
      
      $("#modal-title").text("Ver producto");
      $("#modal_action_button").hide();
      $("#modalSignin").modal('show');
        break;

    case 'eliminar':
        $("#modal_action_button").data("id", id);
        $("#modalSheet").modal('show');
        break;
    default:
        break;
  }
});

$(document).on('click', '#modal_action_button', function (event) {
  var accion = $(this).text();
  var id = $("#modal_action_button").data("id");
  const form = document.querySelector('.needs-validation');
  switch (accion) {
    case 'Crear':
    
      if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
      }
      crear_producto();
        break;
    case 'Actualizar':
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return;
      }      
      actualizar_producto(id);
        break;
    case 'Eliminar':
        eliminar_producto(id);
        break;
    default:
        break;
  }
});

// Evento cuando el modal se cierra completamente
$('#modalSignin').on('hidden.bs.modal', function () {
  $("#nombre").prop('disabled', false);
  $("#categoria").prop('disabled', false);
  $("#marca").prop('disabled', false);
  $("#tipo_medida").prop('disabled', false);
  $("#codigo").prop('disabled', false);
  $("#presentacion").prop('disabled', false);
  $("#modal_action_button").show();
  form.classList.remove('was-validated');
});

async function eliminar_producto(id){

    const url = '/api/eliminar-producto';

    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    });

    const resultado = await respuesta.json();
    if (resultado === true){
      $("#modalSheet").modal('hide');
      $.confirm({
        theme: 'black',
        title: 'Exito!',
        content: 'Producto eliminado correctamente',
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
      consultarAPI();
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
}

async function actualizar_producto(id){
  const url = '/api/actualizar_producto';

  nombre = $('#nombre').val();
  codigo = $('#codigo').val();
  presentacion = $('#presentacion').val();
  Marca = $('#marca').val();
  Categoria = $('#categoria').val();
  Tipo = $('#tipo_medida').val();

  const respuesta = await fetch(url, {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      id: id, 
      id_marca: Marca,
      id_categoria: Categoria,
      id_producto_tipo: Tipo,
      nombre: nombre,
      codigo_barras: codigo,
      presentacion: presentacion
    })
  });
  const resultado = await respuesta.json();
  if (resultado === true){
    $("#modalSignin").modal('hide');
    $.confirm({
      theme: 'black',
      title: 'Exito!',
      content: 'Producto actualizado correctamente',
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
    consultarAPI();
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

async function crear_producto() {

  const {nombre, codigo, presentacion, Marca, Categoria, Tipo} = productos;
  
  const idMarca = Marca.resultado.id;
  const idCategoria = Categoria.resultado.id;
  const idTipo = Tipo.resultado.id;

  const datos = new FormData();
  datos.append("id_marca", idMarca);
  datos.append("id_categoria", idCategoria);
  datos.append("id_producto_tipo", idTipo);
  datos.append("nombre", nombre);
  datos.append("codigo_barras", codigo);
  datos.append("presentacion", presentacion);

  const url = '/api/crear-producto';
  const respuesta = await fetch(url, {
      method: "POST",
      body: datos,
  });

  const resultado = await respuesta.json();
  $("#modalSignin").modal('hide');
  if (resultado.resultado === true){
    $.confirm({
      theme: 'black',
      title: 'Exito!',
      content: 'Producto agregado correctamente',
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
    limpiarFormulario(form);
    consultarAPI();
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