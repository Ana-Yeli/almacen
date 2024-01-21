const entradas = {
    fechaEntrada: '',
    fechaRecepcion: '',
    subtotal: '',
    folio: '',
    total: '',
    totaliva:'',
    totaldescuento:'',
    estatus: '',
    Usuario: '',
    Proveedor: []
  };

document.addEventListener("DOMContentLoaded", function (){
    iniciarApp();
});

function iniciarApp(){
    consultarAPI();
}

async function consultarAPI(){
    try{
        const urlentradas = "/api/entradas";
        const urlproveedor = "/api/proveedor";
        const urlusuario = "/api/usuario";
    
        const resultentradas = await fetch(urlentradas);
        const resultprov = await fetch(urlproveedor);
        const resultuser = await fetch(urlusuario);
    
        const entradas = await resultentradas.json();
        const proveedor = await resultprov.json();
        const usuario = await resultuser.json();
    
        mostrarTabla(entradas);
        mostrarProveedor(proveedor);
        mostrarUsuario(usuario);
    } catch (error){
        console.log(error);
    }
}

function mostrarProveedor(proveedor) {
    // Obtener referencia al elemento select
    const selectProveedor = document.querySelector("#proveedor");

    // Limpiar el contenido actual del elemento select
    selectProveedor.innerHTML = "";

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

function seleccionarProveedor(resultado) {
    const { Proveedor } = entradas;
    
    entradas.Proveedor = { ...Proveedor, resultado };
    const nombre_comercial = resultado.nombre_comercial;
    
    //console.log(entradas);
}

function mostrarUsuario(usuario) {
    // Obtener referencia al elemento select
    const selectUsuario = document.querySelector("#usuario");

    // Limpiar el contenido actual del elemento select
    selectUsuario.innerHTML = "";

    usuario.forEach(user => {
      const { id, nombre, apellidos, email, admin, confirmado, token, password } = user;
  
      const nombreUsuario = document.createElement("OPTION");
      nombreUsuario.textContent = nombre + " " +apellidos;
      nombreUsuario.value = id;
      document.querySelector("#usuario").appendChild(nombreUsuario);
    });
    //Evento para mostrar el objeto seleccionado cuando cambia la selección del dropdown
    document.querySelector("#usuario").addEventListener("change", function () {
      const selectUsuarioId = this.value;
      const usuarioSeleccionado = usuario.find(user => user.id === selectUsuarioId);
      // Llamar a la función para seleccionar la categoría
      seleccionarUsuario(usuarioSeleccionado);
    });
}
  
function seleccionarUsuario(resultado) {
  const id_usuario = resultado.id;
  console.log(id_usuario);
}

function mostrarTabla(entradas){
    var tabla = $("#myTable").DataTable();
    tabla.clear().destroy();

    let body = "";

    entradas.forEach(entrada => {
        entrada.id = entrada.id == null ? "" : entrada.id;
        entrada.id_proveedor = entrada.id_proveedor == null ? "" : entrada.id_proveedor;
        entrada.nombre_comercial = entrada.nombre_comercial == null ? "" : entrada.nombre_comercial;
        entrada.id_usuario = entrada.id_usuario == null ? "" : entrada.id_usuario;
        entrada.usuario = entrada.usuario == null ? "" : entrada.usuario;
        entrada.fecha_entrada = entrada.fecha_entrada == null ? "" : entrada.fecha_entrada;
        entrada.fecha_recepcion = entrada.fecha_recepcion == null ? "" : entrada.fecha_recepcion;
        entrada.subtotal = entrada.subtotal == null ? "" : entrada.subtotal;
        entrada.folio = entrada.folio == null ? "" : entrada.folio;
        entrada.total = entrada.total == null ? "" : entrada.total;
        entrada.total_iva = entrada.total_iva == null ? "" : entrada.total_iva;
        entrada.total_descuento = entrada.total_descuento == null ? "" : entrada.total_descuento;
        entrada.estatus = entrada.estatus == null ? "" : entrada.estatus;
                
        var data_campos = ` data-id="${entrada.id}"   
                            data-id_proveedor="${entrada.id_proveedor}"
                            data-nombre_comercial="${entrada.nombre_comercial}"
                            data-id_usuario="${entrada.id_usuario}"
                            data-usuario="${entrada.usuario}"
                            data-fecha_entrada="${entrada.fecha_entrada}"
                            data-fecha_recepcion="${entrada.fecha_recepcion}"
                            data-subtotal="${entrada.subtotal}"
                            data-folio="${entrada.folio}"
                            data-total="${entrada.total}"
                            data-total_iva="${entrada.total_iva}"
                            data-total_descuento="${entrada.total_descuento}"
                            data-estatus="${entrada.estatus}"
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
        body += '               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="eliminar" data-id="' + entrada.id + '">Eliminar</a></li>';
        body += "             </ul>";
        body += "           </div>";
        body += "      </td>";
        body += `      <td>${entrada.nombre_comercial}</td>`;
        body += `      <td>${entrada.fecha_entrada}</td>`;
        body += `      <td>${entrada.fecha_recepcion}</td>`;
        body += `      <td>${entrada.folio}</td>`;
        body += `      <td>${entrada.estatus}</td>`;
        body += "  </tr>";
    });
    $("#myTable tbody").html(body);
    $("#myTable").DataTable();
}

function get_tag(t){
    return{
        id: $(t).data("id"),
        id_proveedor: $(t).data("id_proveedor"),
        nombre_comercial: $(t).data("nombre_comercial"),
        id_usuario: $(t).data("id_usuario"),
        usuario: $(t).data("usuario"),
        fecha_entrada: $(t).data("fecha_entrada"),
        fecha_recepcion: $(t).data("fecha_recepcion"),
        subtotal: $(t).data("subtotal"),
        folio: $(t).data("folio"),
        total: $(t).data("total"),
        total_iva: $(t).data("total_iva"),
        total_descuento: $(t).data("total_descuento"),
        estatus: $(t).data("estatus")
    };
}

const form = document.querySelector('#form_entrada_productos');

$(document).on('click', '#button_accion', function () {
    var opcion = $(this).data("opcion");
    var data = get_tag(this);
    var id = data.id;
    var id_proveedor = data.id_proveedor;
    var nombre_comercial = data.nombre_comercial;
    var id_usuario = data.id_usuario;
    var nombre_usuario = data.usuario;
    var fecha_entrada = data.fecha_entrada;
    var fecha_recepcion = data.fecha_recepcion;
    var subtotal = data.subtotal;
    var folio = data.folio;
    var total = data.total;
    var total_iva = data.total_iva;
    var total_descuento = data.total_descuento;
    var estatus = data.estatus;

    switch (opcion) {
        case 'editar':      

      $("#proveedor").val(id_proveedor);
      $("#usuario").val(id_usuario);
      $("#fecha_entrada").val(fecha_entrada);
      $("#fecha_recepcion").val(fecha_recepcion);
      $("#folio").val(folio);

    $("#subtotal").val(subtotal);
    $("#subtotal").prop('disabled', true);
    $("#total").val(total);
    $("#total").prop('disabled', true);
    $("#total_iva").val(total_iva);
    $("#total_iva").prop('disabled', true);
    $("#total_descuento").val(total_descuento);
    $("#total_descuento").prop('disabled', true);

      $("#estatus").val(estatus);
        
      $("#modal-title").text("Actualizar Factura/Remisión");
      $("#modal_action_button").text("Actualizar");
      $("#modal_action_button").data("id", data.id);
      $("#div_table").hide();
      $("#modalSignin").modal('show');
        break;
     
      case 'ver':
        
        $("#proveedor").val(id_proveedor);
        $("#proveedor").prop('disabled', true);
        $("#usuario").val(id_usuario);
        $("#usuario").prop('disabled', true);
        $("#fecha_entrada").val(fecha_entrada);
        $("#fecha_entrada").prop('disabled', true);
        $("#fecha_recepcion").val(fecha_recepcion);
        $("#fecha_recepcion").prop('disabled', true);
        $("#folio").val(folio);
        $("#folio").prop('disabled', true);
        $("#subtotal").val('$' + subtotal);
        $("#subtotal").prop('disabled', true);
        $("#total").val('$' + total);
        $("#total").prop('disabled', true);
        $("#total_iva").val('$' + total_iva);
        $("#total_iva").prop('disabled', true);
        $("#total_descuento").val('$' + total_descuento);
        $("#total_descuento").prop('disabled', true);
        $("#estatus").val(estatus);
        $("#estatus").prop('disabled', true);
        
        $("#modal-title").text("Ver Factura/Remisión");
        $("#modal_action_button").hide();
        mostrarTablaDetalle(id);
        $("#div_table").show();
        $("#modalSignin").modal('show');
          break;
  
      case 'eliminar':
          $("#modal_action_button").data("id", id);
          $("#modal_action_button").data("source", opcion);
          $("#modal-title-sheet").text("Eliminar Factura/Remisión");
          $("#modalSheet").modal('show');
          break;
      default:
          break;
    }
});

$('#modalSignin').on('hidden.bs.modal', function () {
    $("#proveedor").prop('disabled', false);
    $("#usuario").prop('disabled', false);
    $("#fecha_recepcion").prop('disabled', false);
    $("#folio").prop('disabled', false);
    $("#estatus").prop('disabled', false);

    $("#modal_action_button").show();
    form.classList.remove('was-validated');
});

$(document).on('click', '#modal_action_button', function (event) {
    var accion = $(this).text();
    var id = $("#modal_action_button").data("id");
    var source = $("#modal_action_button").data("source");
    const form = document.querySelector('.needs-validation');
    switch (accion) {
        case 'Actualizar':
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              form.classList.add('was-validated');
              return;
            }      
            actualizar_fac_rem(id);
              break;
        case 'Eliminar':
            if(source === 'eliminar'){
                eliminar_fac_rem(id);
            } else if (source === 'eliminar_producto'){
                console.log("Eliminar producto");
            }
            break;
        default:
            break;
    }
});

async function actualizar_fac_rem(id){
    const url = '/api/actualizar-entrada';

    Proveedor =  $('#proveedor').val();
    Usuario = $('#usuario').val();
    fechaEntrada = $('#fecha_entrada').val();
    fechaRecepcion = $('#fecha_recepcion').val();
    folio = $('#folio').val();
    subtotal = $('#subtotal').val();
    total = $('#total').val();
    totaliva = $('#total_iva').val();
    totaldescuento = $('#total_descuento').val();
    estatus = $('#estatus').val();
    
    const respuesta = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          id: id, 
          id_proveedor: Proveedor,
          id_usuario: Usuario,
          fecha_entrada: fechaEntrada,
          fecha_recepcion: fechaRecepcion,
          subtotal: subtotal,
          folio: folio,
          total: total,
          total_iva: totaliva,
          total_descuento: totaldescuento,
          estatus: estatus
        })
    });
    const resultado = await respuesta.json();
    if (resultado === true){
        $("#modalSignin").modal('hide');
        $.confirm({
            theme: 'black',
            title: 'Exito!',
            content: 'Los datos generales de la Fcatura/Remisión se han actualizado correctamente',
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

async function eliminar_fac_rem(id){

    const url = '/api/eliminar-entrada';

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
            content: 'La Factura/Remisión se ha eliminado correctamente',
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
//Productos relacionados a la entrada
async function mostrarTablaDetalle(id_entrada){
    try {
        const urlEntradaProductos = `/api/entrada_productos?id_entrada=${id_entrada}`;
        const resultEntradaProductos = await fetch(urlEntradaProductos);
        const entradaProductos = await resultEntradaProductos.json();
        var tabla = $("#myTableDetail").DataTable();
        tabla.clear().destroy();
    
        let body = "";
    
        entradaProductos.forEach(entrada_producto => {
            entrada_producto.id = entrada_producto.id == null ? "" : entrada_producto.id;
            entrada_producto.id_producto = entrada_producto.id_producto == null ? "" : entrada_producto.id_producto;
            entrada_producto.nombre_producto = entrada_producto.nombre_producto == null ? "" : entrada_producto.nombre_producto;
            entrada_producto.presentacion = entrada_producto.presentacion == null ? "" : entrada_producto.presentacion;
            entrada_producto.descripcion = entrada_producto.descripcion == null ? "" : entrada_producto.descripcion;
            entrada_producto.marca = entrada_producto.marca == null ? "" : entrada_producto.marca;
            entrada_producto.fecha_caducidad = entrada_producto.fecha_caducidad == null ? "" : entrada_producto.fecha_caducidad;
            entrada_producto.cantidad = entrada_producto.cantidad == null ? "" : entrada_producto.cantidad;
            entrada_producto.precio_compra = entrada_producto.precio_compra == null ? "" : entrada_producto.precio_compra;
            entrada_producto.importe_sin_descuento = entrada_producto.importe_sin_descuento == null ? "" : entrada_producto.importe_sin_descuento;
            entrada_producto.descuento = entrada_producto.descuento == null ? "" : entrada_producto.descuento;
            entrada_producto.importe_con_descuento = entrada_producto.importe_con_descuento == null ? "" : entrada_producto.importe_con_descuento;
            entrada_producto.iva = entrada_producto.iva == null ? "" : entrada_producto.iva;
            entrada_producto.importe_c_iva = entrada_producto.importe_c_iva == null ? "" : entrada_producto.importe_c_iva;
            entrada_producto.precio_sugerido = entrada_producto.precio_sugerido == null ? "" : entrada_producto.precio_sugerido;
                    
            var data_campos = ` data-id="${entrada_producto.id}"   
                                data-id_producto="${entrada_producto.id_producto}"
                                data-nombre_producto="${entrada_producto.nombre_producto}"
                                data-presentacion="${entrada_producto.presentacion}"
                                data-descripcion="${entrada_producto.descripcion}"
                                data-marca="${entrada_producto.marca}"
                                data-fecha_caducidad="${entrada_producto.fecha_caducidad}"
                                data-cantidad="${entrada_producto.cantidad}"
                                data-precio_compra="${entrada_producto.precio_compra}"
                                data-importe_sin_descuento="${entrada_producto.importe_sin_descuento}"
                                data-descuento="${entrada_producto.descuento}"
                                data-importe_con_descuento="${entrada_producto.importe_con_descuento}"
                                data-iva="${entrada_producto.iva}"
                                data-importe_c_iva="${entrada_producto.importe_c_iva}"
                                data-precio_sugerido="${entrada_producto.precio_sugerido}"
                                `;
    
            body += "  <tr>";
            body += "      <td>";
            body += '          <div class="dropdown">';
            body +=	'             <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">';
            body += '              	Acciones <span class="caret"></span>';
            body += "             </button>";
            body += '             <ul class="dropdown-menu">';
            body += `               <li><a href="#" class="dropdown-item" id="button_accion_producto" data-opcion="ver_producto" ${data_campos}>Ver</a></li>`;
            //body += `				        <li><a href="#" class="dropdown-item" id="button_accion_producto" data-opcion="editar_producto" ${data_campos}>Editar</a></li>`;
            //body += '               <li><a href="#" class="dropdown-item" id="button_accion_producto" data-opcion="eliminar_producto" data-id="' + entrada_producto.id + '">Eliminar</a></li>';
            body += "             </ul>";
            body += "           </div>";
            body += "      </td>";
            body += `      <td>${entrada_producto.nombre_producto}</td>`;
            body += `      <td>${entrada_producto.presentacion}</td>`;
            body += `      <td>${entrada_producto.descripcion}</td>`;
            body += `      <td>${entrada_producto.marca}</td>`;
            body += `      <td>${entrada_producto.fecha_caducidad}</td>`;
            body += "  </tr>";
        });
        $("#myTableDetail tbody").html(body);
        $("#myTableDetail").DataTable();
    } catch (error) {
        console.log(error);
    }
}

function get_tag_detail(t){
    return{
        id: $(t).data("id"),
        id_producto: $(t).data("id_producto"),
        nombre_producto: $(t).data("nombre_producto"),
        presentacion: $(t).data("presentacion"),
        descripcion: $(t).data("descripcion"),
        marca: $(t).data("marca"),
        fecha_caducidad: $(t).data("fecha_caducidad"),
        cantidad: $(t).data("cantidad"),
        precio_compra: $(t).data("precio_compra"),
        importe_sin_descuento: $(t).data("importe_sin_descuento"),
        descuento: $(t).data("descuento"),
        importe_con_descuento: $(t).data("importe_con_descuento"),
        iva: $(t).data("iva"),
        importe_c_iva: $(t).data("importe_c_iva"),
        precio_sugerido: $(t).data("precio_sugerido")
    };
}

$(document).on('click', '#button_accion_producto', function () {
    var opcion = $(this).data("opcion");
    var data = get_tag_detail(this);
    var id = data.id;
    var id_producto = data.id_producto;
    var presentacion = data.presentacion;
    var descripcion = data.descripcion;
    var marca = data.marca;
    var fecha_caducidad = data.fecha_caducidad;
    var cantidad = data.cantidad;
    var precio_compra = data.precio_compra;
    var importe_sin_descuento = data.importe_sin_descuento;
    var descuento = data.descuento;
    var importe_con_descuento = data.importe_con_descuento;
    var iva = data.iva;
    var importe_c_iva = data.importe_c_iva;
    var precio_sugerido = data.precio_sugerido;
    
    switch (opcion) {
        case 'editar_producto':      

        //$("#proveedor").val(id_proveedor);
        //$("#usuario").val(id_usuario);
        //$("#fecha_entrada").val(fecha_entrada);
        //$("#fecha_recepcion").val(fecha_recepcion);
        //$("#folio").val(folio);
        //$("#subtotal").val(subtotal);
        //$("#subtotal").prop('disabled', true);
        //$("#total").val(total);
        //$("#total").prop('disabled', true);
        //$("#total_iva").val(total_iva);
        //$("#total_iva").prop('disabled', true);
        //$("#total_descuento").val(total_descuento);
        //$("#total_descuento").prop('disabled', true);
        //$("#estatus").val(estatus);
        
        $("#modal-title-producto").text("Actualizar Producto");
        $("#modal_action_button_producto").text("Actualizar");
        $("#modal_action_button_producto").data("id", data.id);
        $("#modalProducto").modal('show');
        break;
     
      case 'ver_producto':
        
        $("#producto").val(id_producto);
        $("#producto").prop('disabled', true);

        $("#presentacion").val(presentacion);
        $("#presentacion").prop('disabled', true);

        $("#descripcion").val(descripcion);
        $("#descripcion").prop('disabled', true);

        $("#marca").val(marca);
        $("#marca").prop('disabled', true);

        $("#fecha_caducidad").val(fecha_caducidad);
        $("#fecha_caducidad").prop('disabled', true);

        $("#cantidad").val(cantidad);
        $("#cantidad").prop('disabled', true);

        $("#precio_compra").val('$' + precio_compra);
        $("#precio_compra").prop('disabled', true);

        $("#sub").val('$' + importe_sin_descuento);
        $("#sub").prop('disabled', true);

        $("#descuento").val('$' + descuento);
        $("#descuento").prop('disabled', true);

        $("#importe_con_descuento").val('$' + importe_con_descuento);
        $("#importe_con_descuento").prop('disabled', true);

        $("#iva").val(iva);
        $("#iva").prop('disabled', true);

        $("#importe_c_iva").val('$' + importe_c_iva);
        $("#importe_c_iva").prop('disabled', true);

        $("#precio_sugerido").val('$' + precio_sugerido);
        $("#precio_sugerido").prop('disabled', true);

        
        $("#modal-title-producto").text("Ver Producto");
        $("#modal_action_button_producto").hide();
        $("#modalProducto").modal('show');
          break;
  
      case 'eliminar_producto':
          $("#modal_action_button").data("id", id);
          $("#modal_action_button").data("source", opcion);
          $("#modal-title-sheet").text("Eliminar Producto");
          $("#modalSheet").modal('show');
          break;
      default:
          break;
    }
});

$(document).on('click', '#modal_action_button_producto', function (event) {
    var accion = $(this).text();
    var id = $("#modal_action_button_producto").data("id");
    var source = $("#modal_action_button_producto").data("source");
    const form = document.querySelector('.needs-validation');
    switch (accion) {
        case 'Actualizar':
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              form.classList.add('was-validated');
              return;
            }      
            //actualizar_fac_rem(id);
              break;
        default:
            break;
    }
});