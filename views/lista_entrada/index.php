<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Facturas/Remisiones</h1>
  <div class="btn-toolbar mb-2 mb-md-0"></div>
</div>

<div class="table-responsive">
  <table class="table table-striped table-sm display" id="myTable">
    <thead>
      <tr>
        <th scope="col">OPCIONES</th>
        <th scope="col">NOMBRE COMERCIAL</th>
        <th scope="col">FECHA ENTRADA</th>
        <th scope="col">FECHA RECEPCIÓN</th>
        <th scope="col">FOLIO</th>
        <th scope="col">ESTATUS</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>

<div class="modal modal-signin py-5" tabindex="-1" role="dialog" id="modalSignin">  
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow" style="width: fit-content;">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 id="modal-title" class="fw-bold mb-0 fs-2">Titulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-5 pt-0">
        <form class="needs-validation" id="form_entrada_productos" novalidate>
          <div class="row">
            <div class="col-6 form-floating mb-3">
              <select class="form-select" id="proveedor" required>
                <option value="">-- Selecciona --</option>
              </select>
              <label for="floatingInput" style="left:auto;">Proveedor</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>
            <div class="col-6 form-floating mb-3">
              <select class="form-select" id="usuario" required>
                <option value="">-- Selecciona --</option>
              </select>
              <label for="floatingInput" style="left:auto;">Usuario</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>
            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="fecha_entrada" placeholder="Fecha entrada" required>
              <label for="floatingInput" style="left:auto;">Fecha entrada</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>
            <div class="col-6 form-floating mb-3">
              <input type="date" class="form-control rounded-3" id="fecha_recepcion" placeholder="Fecha recepcion" required>
              <label for="floatingInput" style="left:auto;">Fecha recepción</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>
  
            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="folio" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Folio</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="subtotal" placeholder="Total" required>
              <label for="floatingInput" style="left:auto;">Subtotal</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="total" placeholder="Total" required>
              <label for="floatingInput" style="left:auto;">Total</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="total_iva" placeholder="Total IVA" required>
              <label for="floatingInput" style="left:auto;">Total IVA</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="total_descuento" placeholder="Total descuento" required>
              <label for="floatingInput" style="left:auto;">Total descuento</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="estatus" placeholder="Estatus" required>
              <label for="floatingInput" style="left:auto;">Estatus</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

          </div>
          <div class="table-responsive" style="display: none;" id="div_table">
            <table class="table table-striped table-sm display" id="myTableDetail">
              <thead>
                <tr>
                <th scope="col">OPCIONES</th>
                  <th scope="col">NOMBRE PRODUCTO</th>
                  <th scope="col">PRESENTACIÓN</th>
                  <th scope="col">DESCRIPCIÓN</th>
                  <th scope="col">MARCA</th>
                  <th scope="col">FECHA CADUCIDAD</th>
                </tr>
              </thead>
              <tbody>
              </tbody>
            </table>
          </div>
          <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="button" id="modal_action_button">Accion</button>
        </form>
      </div>
    </div>
  </div>
</div>

<div class="modal modal-sheet py-5" tabindex="-1" role="dialog" id="modalSheet">
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header border-bottom-0">
        <h1 id="modal-title-sheet" class="modal-title fs-5">Titulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body py-0">
        <p>Esta accion es permanente ¿Desea continuar?</p>
      </div>
      <div class="modal-footer flex-column border-top-0">
        <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" id="modal_action_button">Eliminar</button>
        <button type="button" class="btn btn-lg btn-light w-100 mx-0" data-bs-dismiss="modal">Cancelar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal modal-signin py-5" tabindex="-1" role="dialog" id="modalProducto">  
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow" style="width: fit-content;">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 id="modal-title-producto" class="fw-bold mb-0 fs-2">Titulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-5 pt-0">
        <form class="needs-validation" id="form_entrada_productos" novalidate>
          <div class="row">
            
            <div class="col-6 form-floating mb-3">
              <select class="form-select" id="producto" required>
                <option value="">-- Selecciona --</option>
              </select>
              <label for="floatingInput" style="left:auto;">Producto</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="presentacion" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Presentación</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="descripcion" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Descripción</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="marca" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Marca</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="date" class="form-control rounded-3" id="fecha_caducidad" placeholder="Fecha recepcion" required>
              <label for="floatingInput" style="left:auto;">Fecha caducidad</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>
  
            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="cantidad" placeholder="Total" required>
              <label for="floatingInput" style="left:auto;">Cantidad</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="precio_compra" placeholder="Total" required>
              <label for="floatingInput" style="left:auto;">Precio compra</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="sub" placeholder="Total IVA" required>
              <label for="floatingInput" style="left:auto;">Subtotal</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="descuento" placeholder="Total descuento" required>
              <label for="floatingInput" style="left:auto;">Descuento</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="importe_con_descuento" placeholder="Estatus" required>
              <label for="floatingInput" style="left:auto;">Subtotal con descuento</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="iva" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">IVA</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="importe_c_iva" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Subtotal con IVA</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-6 form-floating mb-3">
              <input type="text" class="form-control rounded-3" id="precio_sugerido" placeholder="Folio">
              <label for="floatingInput" style="left:auto;">Precio sugerido</label>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

          </div>
          <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary" type="button" id="modal_action_button_producto">Accion</button>
        </form>
      </div>
    </div>
  </div>
</div>

<?php
    $script = "<script src='build/js/lista_entrada.js'></script>";
?>