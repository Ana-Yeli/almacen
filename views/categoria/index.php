<div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
  <h1 class="h2">Categorías</h1>
  <div class="btn-toolbar mb-2 mb-md-0"></div>
</div>

<div class="container">
  <main>
    <div class="row g-5">
      <div class="col-md-7 col-lg-8">
        <div class="col-sm-4">
          <button id="button_accion" data-opcion="crear" type="button" class="w-100 btn btn-outline-primary btn-lg mb-3">Agregar categoria</button>
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
        <th scope="col">DESCRIPCIÓN</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
</div>

<div class="modal modal-sheet py-5" tabindex="-1" role="dialog" id="modalCategoria">
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header border-bottom-0">
        <h1 id="modal-title" class="modal-title fs-5">Titulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body py-0">
        <form class="needs-validation" id="form_categoria" novalidate>
            <div class="form-floating mb-3">
                <input type="text" class="form-control rounded-3" id="descripcion" placeholder="Nombre categoría" required>
                <label for="floatingInput">Nombre categoría</label>
                <div class="invalid-feedback">
                El campo es obligatorio
                </div>
            </div>
        </form>
        <div class="modal-footer flex-column border-top-0">
            <button type="button" class="btn btn-lg btn-primary w-100 mx-0 mb-2" id="modal_action_button">Accion</button>
        </div>
    </div>
  </div>
</div>
</div>

<div class="modal modal-sheet py-5" tabindex="-1" role="dialog" id="modalSheet">
  <div class="modal-dialog" role="document">
    <div class="modal-content rounded-4 shadow">
      <div class="modal-header border-bottom-0">
        <h1 class="modal-title fs-5">Eliminar categoría</h1>
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
    $script = "<script src='build/js/categoria.js'></script>";
?>