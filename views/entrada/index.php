<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Entradas</h1>
  <div class="btn-toolbar mb-2 mb-md-0"></div>
</div>

<div class="container">
  <main>
    <div class="row g-5">
      <!--Contenedor donde se muestra el resumen-->
      <div class="col-md-5 col-lg-4 order-md-last">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
          <span class="text-primary">Ticket</span>
          <span class="badge bg-primary rounded-pill">0</span>
        </h4>
        <ul class="list-group mb-3" id="producto">
          <!--li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Agua</h6>
              <small class="text-muted">Ciel</small>
            </div>
            <div>1</div>
            <span class="text-muted">$12</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Toallitas</h6>
              <small class="text-muted">Huggies</small>
            </div>
            <div>1</div>
            <span class="text-muted">$42</span>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Galletas</h6>
              <small class="text-muted">Gamesa</small>
            </div>
            <div>1</div>
            <span class="text-muted">$5</span>
          </li-->
        </ul>
        <ul class="list-group mb-3">
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-success">
              <h6 class="my-0">Proveedor</h6>
              <small id="proveedor_seleccionado"></small>
            </div>
            <span class="text-success"></span>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Subotal (MXN)</span>
            <strong id="subtotal"></strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Descuento (MXN)</span>
            <strong id="total_descuento"></strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>IVA (MXN)</span>
            <strong id="iva"></strong>
          </li>
          <li class="list-group-item d-flex justify-content-between">
            <span>Total (MXN)</span>
            <strong id="total"></strong>
          </li>
          <li class="list-group-item d-flex justify-content-between bg-light">
            <div class="text-primary">
              <h6 class="my-0">Folio</h6>
              <span id="folio_ingresado"></span>
            </div> 
          </li>
        </ul>
        <button id="btn_crear_entrada_producto" type="button" class="w-100 btn btn-outline-primary btn-lg mb-3">Confirmar recepción</button>
      </div>
      <!--Contenedor donde se muestra el formulario de entrada-->
      <div class="col-md-7 col-lg-8" id="contenedor_entrada">
        <h4 class="mb-3">Ingresar datos de Factura/Remisión</h4>
        <input type="hidden" id="id" value="<?php echo $id; ?>">
        <form class="needs-validation" id="form_entrada" novalidate>
          <div class="row g-3">  

            <div class="col-sm-4">
              <label for="folio" class="form-label">Folio<span class="text-muted">(Optional)</span></label>
              <div class="input-group has-validation">
                <input type="text" class="form-control" id="folio" placeholder="">
              </div>
            </div>

            <div class="col-4">
              <label for="proveedor" class="form-label">Proveedor</label>
              <div class="input-group has-validation">
                <select class="form-select" id="proveedor" required>
                    <option value="">-- Selecciona --</option>
                </select>
                <div class="invalid-feedback">
                  El campo es obligatorio
                </div>
              </div>
            </div>

            <div class="col-sm-4">
              <label for="fecha_recepcion" class="form-label">Fecha de recepción</label>
              <input type="date" class="form-control" id="fecha_recepcion" placeholder="Fecha de caducidad del producto" value="" required>
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <!--div class="col-4">
              <label for="subtotal" class="form-label">Subtotal</label>
              <div class="input-group has-validation">
                <span class="input-group-text">$</span>
                <input type="text" class="form-control" id="subtotal" placeholder="" required>
                <div class="invalid-feedback">
                  El campo es obligatorio
                </div>
                <div class="error-message5" style="font-size: small; text-align: center; color: crimson;"></div>
              </div>
            </div>

            <div class="col-sm-4">
            <button id="btn_agregar_entrada" type="button" class="w-100 btn btn-outline-primary btn-lg">Agregar entrada</button-->
          </div> 
          <hr class="my-4">
        </form>
        <h4 class="mb-3">Seleccionar productos</h4>
        <form class="needs-validation" id="form_producto" novalidate>
          <div class="row g-3">           
            <div class="col-4">
                <label for="productos" class="form-label">Productos</label>
                <div class="input-group has-validation">
                  <select class="form-select" id="productos" required>
                      <option value="">-- Selecciona --</option>
                  </select>
                  <div class="invalid-feedback">
                    El campo es obligatorio
                  </div>
                </div>
            </div>

            <div class="col-3">
                <label for="nombre" class="form-label">Código de barras</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="codigo_barras" placeholder="" disabled>
                </div>
            </div>

            <div class="col-5">
                <label for="presentacion" class="form-label">Presentación</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="presentacion" placeholder="" disabled>
                </div>
            </div>

            <div class="col-4">
                <label for="cantidad" class="form-label">Cantidad</label>
                <div class="input-group has-validation">
                <input type="number" class="form-control" id="cantidad" placeholder="" required>
                  <div class="invalid-feedback">
                    El campo es obligatorio
                  </div>
                </div>
                <div class="error-message" style="font-size: small; text-align: center; color: crimson;"></div>
            </div>

            <div class="col-4">
                <label for="descripcion" class="form-label">Descripción</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="descripcion" placeholder="" required>
                  <div class="invalid-feedback">
                    El campo es obligatorio
                  </div>
                </div>
            </div>

            <div class="col-4">
                <label for="costo" class="form-label">Costo unitario</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="costo" placeholder="" required>
                  <div class="invalid-feedback">
                    El campo es obligatorio
                  </div>
                </div>
                <div class="error-message2" style="font-size: small; text-align: center; color: crimson;"></div>
            </div>

            <div class="col-4">
                <label for="importe" class="form-label">Importe</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="importeADescuento" placeholder="" disabled>
                </div>
            </div>

            <div class="col-4">
                <label for="descuento" class="form-label">Descuento</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="descuento" placeholder="" required>
                  <div class="invalid-feedback">
                    El campo es obligatorio
                  </div>
                </div>
                <div class="error-message3" style="font-size: small; text-align: center; color: crimson;"></div>
            </div>

            <div class="col-4">
                <label for="importe" class="form-label">Importe</label>
                <div class="input-group has-validation">
                <input type="text" class="form-control" id="importeDDescuento" placeholder="" disabled>
                </div>
            </div>

            <div class="col-2">
              <input class="form-check-input" type="checkbox" value="" id="Check">
              <label class="form-check-label" for="Check">
                Perecedero
              </label>
            </div>

            <div class="col-sm-4" style="display: none;" id="div_fecha_cad">
              <label for="fecha_caducidad" class="form-label">Fecha de caducidad</label>
              <input type="date" class="form-control" id="fecha_caducidad" placeholder="Fecha de caducidad del producto" value="">
              <div class="invalid-feedback">
                El campo es obligatorio
              </div>
            </div>

            <div class="col-2">
              <input class="form-check-input" type="checkbox" value="" id="CheckIVA">
              <label class="form-check-label" for="CheckIVA">
                IVA
              </label>
            </div>
            
          </div>
        </form>
        <div class="col-sm-1">
            <button id="btn_agregar_producto" type="button" class="w-100 btn btn-outline-primary btn-lg">+</button>
        </div> 
      </div>
    </div>
  </main>
</div>
<?php
  $script = "<script src='build/js/entrada.js'></script>";
?>