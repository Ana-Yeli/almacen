const proveedores = {
    nombre_comercial: "",
    nombre_fiscal: "",
    rfc: "",
    domicilio: "",
    telefono: "",
    correo: ""
};

document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});

function iniciarApp(){
    consultarAPI();
}

async function consultarAPI(){
    const urlproveedor = `${location.origin}/api/proveedor`;

    const resultprov = await fetch(urlproveedor);

    const proveedor = await resultprov.json();

    mostrarTabla(proveedor);
}

function mostrarTabla(proveedor){
    var tabla = $("#myTable").DataTable();
    tabla.clear().destroy();

    let body = "";

    proveedor.forEach((value) => {
        value.id = value.id == null ? "" : value.id;
        value.nombre_comercial = value.nombre_comercial == null ? "" : value.nombre_comercial;
        value.nombre_fiscal = value.nombre_fiscal == null ? "" : value.nombre_fiscal;
        value.rfc = value.rfc == null ? "" : value.rfc;
        value.domicilio = value.domicilio == null ? "" : value.domicilio;
        value.telefono = value.telefono == null ? "" : value.telefono;
        value.correo = value.correo == null ? "" : value.correo;

        var data_campos = `         data-id="${value.id}"   
                                    data-nombre_comercial="${value.nombre_comercial}"
                                    data-nombre_fiscal="${value.nombre_fiscal}"
                                    data-rfc="${value.rfc}"
                                    data-domicilio="${value.domicilio}"
                                    data-telefono="${value.telefono}"
                                    data-correo="${value.correo}"
                        `;

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
        body += `      <td>${value.nombre_comercial}</td>`;
        body += `      <td>${value.rfc}</td>`;
        body += `      <td>${value.domicilio}</td>`;
        body += "  </tr>";
    });
    $("#myTable tbody").html(body);
    $("#myTable").DataTable();
}

function get_tag(t) {
    return {
      id: $(t).data("id"),
      nombre_comercial: $(t).data("nombre_comercial"),
      nombre_fiscal: $(t).data("nombre_fiscal"),
      rfc: $(t).data("rfc"),
      domicilio: $(t).data("domicilio"),
      telefono: $(t).data("telefono"),
      correo: $(t).data("correo")
    };
}

$(document).on("blur", "#nombre_comercial", function () {
    const nombre_comercial_ingresado = $("#nombre_comercial").val();
    // Asigna el valor al objeto entradas
    proveedores.nombre_comercial = nombre_comercial_ingresado;
});

$(document).on("blur", "#nombre_fiscal", function () {
    const nombre_fiscal_ingresado = $("#nombre_fiscal").val();
    // Asigna el valor al objeto entradas
    proveedores.nombre_fiscal = nombre_fiscal_ingresado;
});

$(document).on("blur", "#rfc", function () {
    const rfc_ingresado = $("#rfc").val();
    // Asigna el valor al objeto entradas
    proveedores.rfc = rfc_ingresado;
});

$(document).on("blur", "#domicilio", function () {
    const domicilio_ingresado = $("#domicilio").val();
    // Asigna el valor al objeto entradas
    proveedores.domicilio = domicilio_ingresado;
});

$(document).on("blur", "#telefono", function () {
    const telefono_ingresado = $("#telefono").val();
    // Asigna el valor al objeto entradas
    proveedores.telefono = telefono_ingresado;
});

$(document).on("blur", "#correo", function () {
    const correo_ingresado = $("#correo").val();
    // Asigna el valor al objeto entradas
    proveedores.correo = correo_ingresado;
});

const form = document.querySelector('#form_proveedor');

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
    var nombre_comercial = data.nombre_comercial;
    var nombre_fiscal = data.nombre_fiscal;
    var rfc = data.rfc;
    var domicilio = data.domicilio;
    var telefono = data.telefono;
    var correo = data.correo;
  
    switch (opcion) {
      case 'crear':
        $("#modal-title").text("Crear proveedor");
        $("#modal_action_button").text("Crear");
        $("#modalSignin").modal('show');
        limpiarFormulario(form);
          break;
  
      case 'editar':      
        $("#nombre_comercial").val(nombre_comercial);
        $("#nombre_fiscal").val(nombre_fiscal);
        $("#rfc").val(rfc);
        $("#domicilio").val(domicilio);
        $("#telefono").val(telefono);
        $("#correo").val(correo);
        
        $("#modal-title").text("Actualizar proveedor");
        $("#modal_action_button").text("Actualizar");
        $("#modal_action_button").data("id", id);
        $("#modalSignin").modal('show');
          break;
     
      case 'ver':
        $("#nombre_comercial").val(nombre_comercial);
        $("#nombre_comercial").prop('disabled', true);
        $("#nombre_fiscal").val(nombre_fiscal);
        $("#nombre_fiscal").prop('disabled', true);
        $("#rfc").val(rfc);
        $("#rfc").prop('disabled', true);
        $("#domicilio").val(domicilio);
        $("#domicilio").prop('disabled', true);
        $("#telefono").val(telefono);
        $("#telefono").prop('disabled', true);
        $("#correo").val(correo);
        $("#correo").prop('disabled', true);
        
        $("#modal-title").text("Ver proveedor");
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

$('#modalSignin').on('hidden.bs.modal', function () {
    $("#nombre_comercial").prop('disabled', false);
    $("#nombre_fiscal").prop('disabled', false);
    $("#rfc").prop('disabled', false);
    $("#domicilio").prop('disabled', false);
    $("#telefono").prop('disabled', false);
    $("#correo").prop('disabled', false);
    $("#modal_action_button").show();
    form.classList.remove('was-validated');
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
        crear_proveedor();
          break;
      case 'Actualizar':
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }      
        actualizar_proveedor(id);
          break;
      case 'Eliminar':
          eliminar_proveedor(id);
          break;
      default:
          break;
    }
  });

  async function crear_proveedor() {

    const {nombre_comercial, nombre_fiscal, rfc, domicilio, telefono, correo} = proveedores;
    
    const datos = new FormData();
    datos.append("nombre_comercial", nombre_comercial);
    datos.append("nombre_fiscal", nombre_fiscal);
    datos.append("rfc", rfc);
    datos.append("domicilio", domicilio);
    datos.append("telefono", telefono);
    datos.append("correo", correo);
  
    const url = `${location.origin}/api/crear-proveedor`;
    const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
    });
  
    const resultado = await respuesta.json();
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

  async function actualizar_proveedor(id){
    const url = `${location.origin}/api/actualizar_proveedor`;
  
    nombre_comercial = $('#nombre_comercial').val();
    nombre_fiscal = $('#nombre_fiscal').val();
    rfc = $('#rfc').val();
    domicilio = $('#domicilio').val();
    telefono = $('#telefono').val();
    correo = $('#correo').val();
  
    const respuesta = await fetch(url, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        id: id, 
        nombre_comercial: nombre_comercial,
        nombre_fiscal: nombre_fiscal,
        rfc: rfc,
        domicilio: domicilio,
        telefono: telefono,
        correo: correo
      })
    });
    const resultado = await respuesta.json();
    if (resultado === true){
      $("#modalSignin").modal('hide');
      $.confirm({
        theme: 'black',
        title: 'Exito!',
        content: 'Proveedor actualizado correctamente',
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

  async function eliminar_proveedor(id){

    const url = `${location.origin}/api/eliminar-proveedor`;

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
        content: 'Proveedor eliminado correctamente',
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