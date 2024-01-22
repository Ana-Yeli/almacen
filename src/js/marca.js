document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});

function iniciarApp(){
    consultarAPI();
}

async function consultarAPI(){
    const urlmarca = `${location.origin}/api/marca`;

    const resultmarca = await fetch(urlmarca);

    const marca = await resultmarca.json();

    mostrarTabla(marca);
}

function mostrarTabla(marca){
    var tabla = $("#myTable").DataTable();
    tabla.clear().destroy();

    let body = "";

    marca.forEach(element => {
        element.id = element.id == null ? "" : element.id;
        element.descripcion = element.descripcion == null ? "" : element.descripcion;
        
        var data_campos = ` data-id="${element.id}"   
                            data-descripcion="${element.descripcion}"
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
        body += '               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="eliminar" data-id="' + element.id + '">Eliminar</a></li>';
        body += "             </ul>";
        body += "           </div>";
        body += "      </td>";
        body += `      <td>${element.descripcion}</td>`;
        body += "  </tr>";
    });
    $("#myTable tbody").html(body);
    $("#myTable").DataTable();
}

function get_tag(t){
    return{
        id: $(t).data("id"),
        descripcion: $(t).data("descripcion")
    };
}

const form = document.querySelector('#form_marca');

function limpiarFormulario(form) {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
    });
}

$(document).on('click', '#button_accion', function () {
    var opcion = $(this).data("opcion");
    var data = get_tag(this);
    var id = data.id;
    var descripcion = data.descripcion;
  
    switch (opcion) {
      case 'crear':
        $("#modal-title").text("Crear marca");
        $("#modal_action_button").text("Crear");
        $("#modalMarca").modal('show');
        limpiarFormulario(form);
          break;
  
      case 'editar':      
        $("#descripcion").val(descripcion);
        
        $("#modal-title").text("Actualizar marca");
        $("#modal_action_button").text("Actualizar");
        $("#modal_action_button").data("id", data.id);
        $("#modalMarca").modal('show');
          break;
     
      case 'ver':
        $("#descripcion").val(descripcion);
        $("#descripcion").prop('disabled', true);
        
        $("#modal-title").text("Ver marca");
        $("#modal_action_button").hide();
        $("#modalMarca").modal('show');
          break;
  
      case 'eliminar':
          $("#modal_action_button").data("id", id);
          $("#modalSheet").modal('show');
          break;
      default:
          break;
    }
});

$('#modalMarca').on('hidden.bs.modal', function () {
    $("#descripcion").prop('disabled', false);
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
        crear_marca();
          break;
      case 'Actualizar':
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }      
        actualizar_marca(id);
          break;
      case 'Eliminar':
        eliminar_marca(id);
          break;
      default:
          break;
    }
});

async function crear_marca() {
    
    const descripcion = $("#descripcion").val();

    const datos = new FormData();
    datos.append("descripcion", descripcion);
  
    const url = `${location.origin}/api/crear-marca`;
    const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
    });
  
    const resultado = await respuesta.json();
    if (resultado.resultado === true){
        $("#modalMarca").modal('hide');
        $.confirm({
        theme: 'black',
        title: 'Exito!',
        content: 'Marca agregada correctamente',
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

async function actualizar_marca(id){
    const url = `${location.origin}/api/actualizar-marca`;
  
    descripcion = $('#descripcion').val();
  
    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: id, 
          descripcion: descripcion
        })
    });
    const resultado = await respuesta.json();
    if (resultado === true){
        $("#modalMarca").modal('hide');
        $.confirm({
            theme: 'black',
            title: 'Exito!',
            content: 'La marca se ha actualizado correctamente',
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

async function eliminar_marca(id){

    const url = `${location.origin}/api/eliminar-marca`;

    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    });

    const resultado = await respuesta.json();
    $("#modalSheet").modal('hide');
    if (resultado === true){
        $.confirm({
            theme: 'black',
            title: 'Exito!',
            content: 'La marca se ha eliminado correctamente',
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