document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});

function iniciarApp(){
    consultarAPI();
}

async function consultarAPI(){
    const urlcategoria = `${location.origin}/api/categoria`;

    const resultcat = await fetch(urlcategoria);

    const categoria = await resultcat.json();

    mostrarTabla(categoria);
}

function mostrarTabla(categoria){
    var tabla = $("#myTable").DataTable();
    tabla.clear().destroy();

    let body = "";

    categoria.forEach(element => {
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

const form = document.querySelector('#form_categoria');

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
        $("#modal-title").text("Crear categoría");
        $("#modal_action_button").text("Crear");
        $("#modalCategoria").modal('show');
        limpiarFormulario(form);
          break;
  
      case 'editar':      
        $("#descripcion").val(descripcion);
        
        $("#modal-title").text("Actualizar categoría");
        $("#modal_action_button").text("Actualizar");
        $("#modal_action_button").data("id", data.id);
        $("#modalCategoria").modal('show');
          break;
     
      case 'ver':
        $("#descripcion").val(descripcion);
        $("#descripcion").prop('disabled', true);
        
        $("#modal-title").text("Ver categoría");
        $("#modal_action_button").hide();
        $("#modalCategoria").modal('show');
          break;
  
      case 'eliminar':
          $("#modal_action_button").data("id", id);
          $("#modalSheet").modal('show');
          break;
      default:
          break;
    }
});

$('#modalCategoria').on('hidden.bs.modal', function () {
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
        crear_categoria();
          break;
      case 'Actualizar':
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
          form.classList.add('was-validated');
          return;
        }      
        actualizar_categoria(id);
          break;
      case 'Eliminar':
        eliminar_categoria(id);
          break;
      default:
          break;
    }
});

async function crear_categoria() {
    
    const descripcion = $("#descripcion").val();

    const datos = new FormData();
    datos.append("descripcion", descripcion);
  
    const url = `${location.origin}/api/crear-categoria`;
    const respuesta = await fetch(url, {
        method: "POST",
        body: datos,
    });
  
    const resultado = await respuesta.json();
    if (resultado.resultado === true){
        $.confirm({
        theme: 'black',
        title: 'Exito!',
        content: 'Categoria agregada correctamente',
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

async function actualizar_categoria(id){
    const url = `${location.origin}/api/actualizar_categoria`;
  
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
        $.confirm({
            theme: 'black',
            title: 'Exito!',
            content: 'La categoría se ha actualizado correctamente',
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

async function eliminar_categoria(id){

    const url = `${location.origin}/api/eliminar-categoria`;

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
            content: 'La categoría se ha eliminado correctamente',
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