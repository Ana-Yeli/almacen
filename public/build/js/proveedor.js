const proveedores={nombre_comercial:"",nombre_fiscal:"",rfc:"",domicilio:"",telefono:"",correo:""};function iniciarApp(){consultarAPI()}async function consultarAPI(){const o=await fetch("http://localhost:3000/api/proveedor");mostrarTabla(await o.json())}function mostrarTabla(o){$("#myTable").DataTable().clear().destroy();let e="";o.forEach(o=>{o.id=null==o.id?"":o.id,o.nombre_comercial=null==o.nombre_comercial?"":o.nombre_comercial,o.nombre_fiscal=null==o.nombre_fiscal?"":o.nombre_fiscal,o.rfc=null==o.rfc?"":o.rfc,o.domicilio=null==o.domicilio?"":o.domicilio,o.telefono=null==o.telefono?"":o.telefono,o.correo=null==o.correo?"":o.correo;var a=`         data-id="${o.id}"   \n                                    data-nombre_comercial="${o.nombre_comercial}"\n                                    data-nombre_fiscal="${o.nombre_fiscal}"\n                                    data-rfc="${o.rfc}"\n                                    data-domicilio="${o.domicilio}"\n                                    data-telefono="${o.telefono}"\n                                    data-correo="${o.correo}"\n                        `;e+="  <tr>",e+="      <td>",e+='          <div class="dropdown">',e+='             <button class="btn btn-primary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">',e+='              \tAcciones <span class="caret"></span>',e+="             </button>",e+='             <ul class="dropdown-menu">',e+=`               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="ver" ${a}>Ver</a></li>`,e+=`\t\t\t\t        <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="editar" ${a}>Editar</a></li>`,e+='               <li><a href="#" class="dropdown-item" id="button_accion" data-opcion="eliminar" data-id="'+o.id+'">Eliminar</a></li>',e+="             </ul>",e+="           </div>",e+="      </td>",e+=`      <td>${o.nombre_comercial}</td>`,e+=`      <td>${o.rfc}</td>`,e+=`      <td>${o.domicilio}</td>`,e+="  </tr>"}),$("#myTable tbody").html(e),$("#myTable").DataTable()}function get_tag(o){return{id:$(o).data("id"),nombre_comercial:$(o).data("nombre_comercial"),nombre_fiscal:$(o).data("nombre_fiscal"),rfc:$(o).data("rfc"),domicilio:$(o).data("domicilio"),telefono:$(o).data("telefono"),correo:$(o).data("correo")}}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()})),$(document).on("blur","#nombre_comercial",(function(){const o=$("#nombre_comercial").val();proveedores.nombre_comercial=o})),$(document).on("blur","#nombre_fiscal",(function(){const o=$("#nombre_fiscal").val();proveedores.nombre_fiscal=o})),$(document).on("blur","#rfc",(function(){const o=$("#rfc").val();proveedores.rfc=o})),$(document).on("blur","#domicilio",(function(){const o=$("#domicilio").val();proveedores.domicilio=o})),$(document).on("blur","#telefono",(function(){const o=$("#telefono").val();proveedores.telefono=o})),$(document).on("blur","#correo",(function(){const o=$("#correo").val();proveedores.correo=o}));const form=document.querySelector("#form_proveedor");function limpiarFormulario(o){o.querySelectorAll("input, select").forEach(o=>{o.value=""})}async function crear_proveedor(){const{nombre_comercial:o,nombre_fiscal:e,rfc:a,domicilio:t,telefono:r,correo:i}=proveedores,n=new FormData;n.append("nombre_comercial",o),n.append("nombre_fiscal",e),n.append("rfc",a),n.append("domicilio",t),n.append("telefono",r),n.append("correo",i);const c=await fetch("http://localhost:3000/api/crear-proveedor",{method:"POST",body:n});!0===(await c.json()).resultado?($.confirm({theme:"black",title:"Exito!",content:"Producto agregado correctamente",type:"blue",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-blue",close:function(){}}}}),limpiarFormulario(form),consultarAPI()):$.confirm({theme:"black",title:"Error!",content:"Algo salió mal, intentalo mas tarde",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}})}async function actualizar_proveedor(o){nombre_comercial=$("#nombre_comercial").val(),nombre_fiscal=$("#nombre_fiscal").val(),rfc=$("#rfc").val(),domicilio=$("#domicilio").val(),telefono=$("#telefono").val(),correo=$("#correo").val();const e=await fetch("http://localhost:3000/api/actualizar_proveedor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:o,nombre_comercial:nombre_comercial,nombre_fiscal:nombre_fiscal,rfc:rfc,domicilio:domicilio,telefono:telefono,correo:correo})});!0===await e.json()?($("#modalSignin").modal("hide"),$.confirm({theme:"black",title:"Exito!",content:"Proveedor actualizado correctamente",type:"blue",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-blue",close:function(){}}}}),consultarAPI()):$.confirm({theme:"black",title:"Error!",content:"Algo salió mal, intentalo mas tarde",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}})}async function eliminar_proveedor(o){const e=await fetch("http://localhost:3000/api/eliminar-proveedor",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:o})});!0===await e.json()?($("#modalSheet").modal("hide"),$.confirm({theme:"black",title:"Exito!",content:"Proveedor eliminado correctamente",type:"blue",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-blue",close:function(){}}}}),consultarAPI()):$.confirm({theme:"black",title:"Error!",content:"Algo salió mal, intentalo mas tarde.",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}})}$(document).on("click","#button_accion",(function(){var o=$(this).data("opcion"),e=get_tag(this),a=e.id,t=e.nombre_comercial,r=e.nombre_fiscal,i=e.rfc,n=e.domicilio,c=e.telefono,l=e.correo;switch(o){case"crear":$("#modal-title").text("Crear proveedor"),$("#modal_action_button").text("Crear"),$("#modalSignin").modal("show"),limpiarFormulario(form);break;case"editar":$("#nombre_comercial").val(t),$("#nombre_fiscal").val(r),$("#rfc").val(i),$("#domicilio").val(n),$("#telefono").val(c),$("#correo").val(l),$("#modal-title").text("Actualizar proveedor"),$("#modal_action_button").text("Actualizar"),$("#modal_action_button").data("id",a),$("#modalSignin").modal("show");break;case"ver":$("#nombre_comercial").val(t),$("#nombre_comercial").prop("disabled",!0),$("#nombre_fiscal").val(r),$("#nombre_fiscal").prop("disabled",!0),$("#rfc").val(i),$("#rfc").prop("disabled",!0),$("#domicilio").val(n),$("#domicilio").prop("disabled",!0),$("#telefono").val(c),$("#telefono").prop("disabled",!0),$("#correo").val(l),$("#correo").prop("disabled",!0),$("#modal-title").text("Ver proveedor"),$("#modal_action_button").hide(),$("#modalSignin").modal("show");break;case"eliminar":$("#modal_action_button").data("id",a),$("#modalSheet").modal("show")}})),$("#modalSignin").on("hidden.bs.modal",(function(){$("#nombre_comercial").prop("disabled",!1),$("#nombre_fiscal").prop("disabled",!1),$("#rfc").prop("disabled",!1),$("#domicilio").prop("disabled",!1),$("#telefono").prop("disabled",!1),$("#correo").prop("disabled",!1),$("#modal_action_button").show(),form.classList.remove("was-validated")})),$(document).on("click","#modal_action_button",(function(o){var e=$(this).text(),a=$("#modal_action_button").data("id");const t=document.querySelector(".needs-validation");switch(e){case"Crear":if(!t.checkValidity())return o.preventDefault(),o.stopPropagation(),void t.classList.add("was-validated");crear_proveedor();break;case"Actualizar":if(!t.checkValidity())return o.preventDefault(),o.stopPropagation(),void t.classList.add("was-validated");actualizar_proveedor(a);break;case"Eliminar":eliminar_proveedor(a)}}));