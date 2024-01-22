const entradas={fechaEntrada:"",fechaRecepcion:"",subtotal:"",folio:"",total:"",totaliva:"",totaldescuento:"",estatus:"",idUsuario:"",Proveedor:[]},entrada_producto={cantidad:"",descripcion:"",costo:"",descuento:"",importeDDescuento:"",fechaCaducidad:"",IVA:"",importeADescuento:"",importeCiva:"",precio_sugerido:"",Producto:[]};function iniciarApp(){consultarAPI(),idUsuario(),seleccionarFechacaducidad(),seleccionarFechaRecepcion()}async function consultarAPI(){try{const e="/api/proveedor",t="/api/productos",o=await fetch(e),a=await fetch(t),r=await o.json(),n=await a.json();mostrarProveedor(r),mostrarProducto(n)}catch(e){console.log(e)}}function mostrarProveedor(e){e.forEach(e=>{const{id:t,nombre_comercial:o,nombre_fiscal:a,rfc:r,domicilio:n,telefono:d,correo:c}=e,i=document.createElement("OPTION");i.textContent=r,i.value=t,document.querySelector("#proveedor").appendChild(i)}),document.querySelector("#proveedor").addEventListener("change",(function(){const t=this.value;seleccionarProveedor(e.find(e=>e.id===t))}))}document.addEventListener("DOMContentLoaded",(function(){iniciarApp()}));const proveedorSeleccionado=document.querySelector("#proveedor_seleccionado");function seleccionarProveedor(e){const{Proveedor:t}=entradas;entradas.Proveedor={...t,resultado:e};const o=e.nombre_comercial;proveedorSeleccionado.textContent=o}const inputFolio=document.querySelector("#folio"),folioIngresado=document.querySelector("#folio_ingresado");inputFolio.addEventListener("input",(function(){entradas.folio=inputFolio.value,folioIngresado.textContent=entradas.folio}));const inputFecha=document.querySelector("#fecha_recepcion");function seleccionarFechaRecepcion(){inputFecha.addEventListener("input",(function(){entradas.fechaRecepcion=inputFecha.value}))}function obtenerFechaHoraActual(){const e=new Date;return`${e.getFullYear()}-${(e.getMonth()+1).toString().padStart(2,"0")}-${e.getDate().toString().padStart(2,"0")} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`}function idUsuario(){entradas.idUsuario=document.querySelector("#id").value}function mostrarProducto(e){e.forEach(e=>{const{id:t,nombre:o,id_marca:a,Marca:r,id_categoria:n,Categoria:d,id_producto_tipo:c,Tipo:i,codigo_barras:s,presentacion:u}=e,p=document.createElement("OPTION");p.textContent=o,p.value=t,document.querySelector("#productos").appendChild(p)}),document.querySelector("#productos").addEventListener("change",(function(){const t=this.value;seleccionarProducto(e.find(e=>e.id===t))}))}function seleccionarProducto(e){const{Producto:t}=entrada_producto;entrada_producto.Producto={...t,resultado:e},$("#codigo_barras").val(e.codigo_barras),$("#presentacion").val(e.presentacion)}const inputCantidad=document.querySelector("#cantidad"),inputDescripcion=document.querySelector("#descripcion"),inputCosto=document.querySelector("#costo"),inputDescuento=document.querySelector("#descuento"),errorMensaje=document.querySelector(".error-message"),errorMensaje2=document.querySelector(".error-message2"),errorMensaje3=document.querySelector(".error-message3"),actualizarImporte=()=>{const e=inputCantidad.value.trim(),t=inputCosto.value.trim(),o=inputDescuento.value.trim(),a=/^\d+(\.\d{0,4})?$/.test(o),r=/^\d+(\.\d{0,4})?$/.test(t);if(""===e)return void(errorMensaje.textContent="Campo obligatorio");if(""===t||!r)return void(errorMensaje2.textContent="Campo obligatorio o formato de número incorrecto");if(""===o||!a)return void(errorMensaje3.textContent="Campo obligatorio o formato de número incorrecto");errorMensaje.textContent="",errorMensaje2.textContent="",errorMensaje3.textContent="";const n=parseFloat(e),d=parseFloat(t),c=parseFloat(o);if(n<=0)return void(errorMensaje.textContent="Ingrese una cantidad valida");if(d<=0)return void(errorMensaje2.textContent="Ingrese una cantidad valida");if(c<0)return void(errorMensaje3.textContent="Ingrese un descuento valido");errorMensaje.textContent="",errorMensaje2.textContent="",errorMensaje3.textContent="";let i=(d*n).toFixed(3);i=Math.floor(100*parseFloat(i))/100,$("#importeADescuento").val(i),entrada_producto.importeADescuento=parseFloat(i),i=parseFloat(i-c).toFixed(3),$("#importeDDescuento").val(i),entrada_producto.cantidad=n,entrada_producto.costo=d,entrada_producto.descuento=c,entrada_producto.importeDDescuento=parseFloat(i)};inputCantidad.addEventListener("input",actualizarImporte),inputCosto.addEventListener("input",actualizarImporte),inputDescuento.addEventListener("input",actualizarImporte),inputDescripcion.addEventListener("input",(function(){entrada_producto.descripcion=inputDescripcion.value}));const checkbox=document.getElementById("Check");function seleccionarFechacaducidad(){const e=document.querySelector("#fecha_caducidad");e.addEventListener("input",(function(){entrada_producto.fechaCaducidad=e.value}))}checkbox.addEventListener("change",(function(){this.checked?($("#div_fecha_cad").show(),$("#fecha_caducidad").prop("required",!0)):($("#div_fecha_cad").hide(),$("#fecha_caducidad").prop("required",!1))}));let entradas_productos=[];$(document).on("click","#btn_agregar_producto",(function(e){const t=document.querySelector("#form_producto");if(!t.checkValidity())return e.preventDefault(),e.stopPropagation(),void t.classList.add("was-validated");let o,a;entrada_producto.IVA=0;let r=$("#importeDDescuento").val(),n=$("#cantidad").val();r=parseFloat(r),n=parseFloat(n),document.getElementById("CheckIVA").checked?(o=.16*r,a=o+r,entrada_producto.IVA=parseFloat(o.toFixed(2)),entrada_producto.importeCiva=parseFloat(a.toFixed(2))):(o=0,a=o+r,entrada_producto.IVA=parseFloat(o.toFixed(2)),entrada_producto.importeCiva=parseFloat(a.toFixed(2)));let d=a/n;entrada_producto.precio_sugerido=parseFloat(d.toFixed(2));const c={cantidad:entrada_producto.cantidad,descripcion:entrada_producto.descripcion,costo:entrada_producto.costo,descuento:entrada_producto.descuento,importeDDescuento:entrada_producto.importeDDescuento,fechaCaducidad:entrada_producto.fechaCaducidad,IVA:entrada_producto.IVA,importeADescuento:entrada_producto.importeADescuento,importeCiva:entrada_producto.importeCiva,precio_sugerido:entrada_producto.precio_sugerido,Producto:entrada_producto.Producto.resultado.id};entradas_productos.push(c),mostrarResumenProducto(),actualizarSubtotal(),console.log(entradas_productos),console.log(entradas);var i=entradas_productos.length;$(".badge").text(i),limpiarFormulario(t),t.classList.remove("was-validated")}));const resumen=document.querySelector("#producto");function mostrarResumenProducto(){const{cantidad:e,importeADescuento:t,Producto:o}=entrada_producto,a=document.createElement("li");a.classList.add("list-group-item","d-flex","justify-content-between","lh-sm"),a.innerHTML=`\n    <div>\n      <h6 class="my-0">${o.resultado.nombre}</h6>\n      <small class="text-muted">${o.resultado.Marca}</small>\n    </div>\n    <div>${e}</div>\n    <span class="text-muted">$${t}</span>\n    <button id="btn_eliminar_lista" type="button" class="btn btn-outline-danger"><svg class="bi"><use xlink:href="#trash"/></svg></button>\n  `,resumen.appendChild(a)}$(document).on("click","#btn_eliminar_lista",(function(){var e=$(this).closest("li"),t=Array.from(e.parent().children()).indexOf(e[0]);if(t>=0){entradas_productos.splice(t,1),actualizarSubtotal();var o=entradas_productos.length;$(".badge").text(o)}e.remove()}));var totalElement=$("#total"),subtotalElement=$("#subtotal"),ivaElement=$("#iva"),descuentoElement=$("#total_descuento");function actualizarSubtotal(){var e=0,t=0,o=0,a=0;entradas_productos.forEach((function(r){console.log(r.importeCiva),e+=r.importeADescuento,r.importeDDescuento,t+=r.IVA,o+=r.descuento,a+=r.importeCiva})),subtotalElement.text("$"+e.toFixed(2)),descuentoElement.text("$"+o.toFixed(2)),ivaElement.text("$"+t),totalElement.text("$"+a),entradas.total=a,entradas.totaliva=t,entradas.subtotal=e.toFixed(2),entradas.totaldescuento=o.toFixed(2)}const formEntrada=document.querySelector("#form_entrada");async function crearEntrada(){entradas.fechaEntrada=obtenerFechaHoraActual(),entradas.estatus="Pendiente de pago";const{fechaEntrada:e,fechaRecepcion:t,subtotal:o,folio:a,total:r,totaliva:n,totaldescuento:d,estatus:c,idUsuario:i,Proveedor:s}=entradas,u=s.resultado.id,p=new FormData;p.append("id_proveedor",u),p.append("id_usuario",i),p.append("fecha_entrada",e),p.append("fecha_recepcion",t),p.append("subtotal",o),p.append("folio",a),p.append("total",r),p.append("total_iva",n),p.append("total_descuento",d),p.append("estatus",c);const l=await fetch("/api/crear-entrada",{method:"POST",body:p}),m=await l.json();if(!0===m.resultado){crear_entrada_producto(m.id),entradas_productos=[]}else $.confirm({theme:"black",title:"Error!",content:"Algo salió mal, intentalo mas tarde",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}})}async function crear_entrada_producto(e){let t=!0;for(const o of entradas_productos){const{cantidad:a,descripcion:r,costo:n,descuento:d,importeDDescuento:c,fechaCaducidad:i,IVA:s,importeADescuento:u,importeCiva:p,precio_sugerido:l,Producto:m}=o,f=new FormData;f.append("id_entrada",e),f.append("id_producto",m),f.append("cantidad",a),f.append("descripcion",r),f.append("costo",n),f.append("descuento",d),f.append("fecha_caducidad",i),f.append("iva",s),f.append("importe_a_descuento",u),f.append("importe_d_descuanto",c),f.append("importe_c_iva",p),f.append("precio_sugerido",l);const _="/api/crear-entrada_producto",v=await fetch(_,{method:"POST",body:f}),h=await v.json();h&&h.resultado||(t=!1)}t?$.confirm({theme:"black",title:"Exito!",content:"Entrada agregada correctamente",type:"blue",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-blue",close:function(){}}}}):$.confirm({theme:"black",title:"Error!",content:"Algo salió mal, intentalo mas tarde.",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}}),entradas_productos=[],limpiarFormulario(formEntrada),folioIngresado.textContent="",proveedorSeleccionado.textContent="",subtotalElement.text(""),descuentoElement.text(""),ivaElement.text(""),totalElement.text(""),formEntrada.classList.remove("was-validated")}function limpiarFormulario(e){e.querySelectorAll("input, select").forEach(e=>{"checkbox"===e.type?(e.checked=!1,$("#div_fecha_cad").hide(),$("#fecha_caducidad").prop("required",!1),entrada_producto.IVA=0):e.value=""})}$(document).on("click","#btn_crear_entrada_producto",(function(e){if(!formEntrada.checkValidity())return e.preventDefault(),e.stopPropagation(),void formEntrada.classList.add("was-validated");entradas_productos&&0!==entradas_productos.length?crearEntrada():$.confirm({theme:"black",title:"Error!",content:"Aun no se encuentran productos agregados",type:"red",typeAnimated:!0,buttons:{tryAgain:{text:"OK",btnClass:"btn-red",close:function(){}}}})}));