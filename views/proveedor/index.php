<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Proveedores</h1>
  <div class="btn-toolbar mb-2 mb-md-0"></div>
</div>

<div class="container">
  <main>
    <div class="row g-5">
      <div class="col-md-7 col-lg-8" id="contenedor_producto">
        <div class="col-sm-4">
          <button id="button_accion" data-opcion="crear" type="button" class="w-100 btn btn-outline-primary btn-lg mb-3">Agregar proveedor</button>
        </div>
      </div>
    </div>
  </main>
</div>

<div class="table-responsive">
  <table class="table table-striped table-sm display" id="myTable">
    <thead>
      <tr>
        <th scope="col">OPCIONES</th>
        <th scope="col">NOMBRE COMERCIAL</th>
        <th scope="col">RFC</th>
        <th scope="col">DOMICILIO</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>
<div class="modal modal-signin py-5" tabindex="-1" role="dialog" id="modalSignin">  
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header p-5 pb-4 border-bottom-0">
        <h1 id="modal-title" class="fw-bold mb-0 fs-2">Titulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body p-5 pt-0">
        <form class="needs-validation" id="form_proveedor" novalidate>
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="nombre_comercial" placeholder="Nombre comercial" required>
            <label for="floatingInput">Nombre comercial</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="nombre_fiscal" placeholder="Nombre fiscal" required>
            <label for="floatingInput">Nombre fiscal</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="rfc" placeholder="RFC" required>
            <label for="floatingInput">RFC</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="domicilio" placeholder="Domicilio" required>
            <label for="floatingInput">Domicilio</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
          </div>
          <div class="form-floating mb-3">
            <input type="text" class="form-control rounded-3" id="telefono" placeholder="Teléfono de contacto" required>
            <label for="floatingInput">Teléfono de contacto</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
          </div>
          <div class="form-floating mb-3">
            <input name="email" type="email" class="form-control rounded-3" id="correo" placeholder="Correo electrónico" required>
            <label for="floatingInput">Correo electrónico</label>
            <div class="invalid-feedback">
              El campo es obligatorio
            </div>
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
        <h1 class="modal-title fs-5">Eliminar proveedor</h1>
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
<?php
    $script = "<script src='build/js/proveedor.js'></script>";
?>