<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\APIController;
use Controllers\ProductoController;
use Controllers\CategoriaController;
use Controllers\ProveedorController;
use Controllers\MarcaController;
use Controllers\EntradaController;
use Controllers\Entrada_productoController;
use Controllers\LoginController;
use MVC\Router;
$router = new Router();

//iniciar sesion 
$router->get('/', [LoginController::class, 'login']);
$router->post('/', [LoginController::class, 'login']);
$router->get('/logout', [LoginController::class, 'logout']);

//recuperar password
$router->get('/olvide', [LoginController::class, 'olvide']);
$router->post('/olvide', [LoginController::class, 'olvide']);
$router->get('/recuperar', [LoginController::class, 'recuperar']);
$router->post('/recuperar', [LoginController::class, 'recuperar']);

//Crear cuenta
$router->get('/crear-cuenta', [LoginController::class, 'crear']);
$router->post('/crear-cuenta', [LoginController::class, 'crear']);

//Confirmar cuenta
//$router->get('/confirmar-cuenta', [LoginController::class, 'confirmar']);
$router->get('/mensaje', [LoginController::class, 'mensaje']);

//Inicio
$router->get('/dashboard', [EntradaController::class, 'dash']);
$router->get('/lista_entrada', [EntradaController::class, 'lista_entrada']);


$router->get('/api/categoria', [APIController::class, 'categoria']);
$router->get('/api/marca', [APIController::class, 'marca']);
$router->get('/api/proveedor', [APIController::class, 'proveedor']);
$router->get('/api/producto_tipo', [APIController::class, 'producto_tipo']);
$router->get('/api/entradas', [APIController::class, 'entradas']);
$router->get('/api/entrada_productos', [APIController::class, 'entrada_productos']);
$router->get('/api/usuario', [APIController::class, 'usuario']);
//Productos
$router->get('/producto', [ProductoController::class, 'index']);
$router->get('/api/productos', [ProductoController::class, 'productos']);
$router->post('/api/crear-producto', [ProductoController::class, 'crear']);
$router->post('/api/eliminar-producto', [ProductoController::class, 'eliminar']);
$router->post('/api/actualizar_producto', [ProductoController::class, 'actualizar']);
//Proveedores
$router->get('/proveedor', [ProveedorController::class, 'index']);
$router->post('/api/crear-proveedor', [ProveedorController::class, 'crear']);
$router->post('/api/actualizar_proveedor', [ProveedorController::class, 'actualizar']);
$router->post('/api/eliminar-proveedor', [ProveedorController::class, 'eliminar']);

//Categorias
$router->get('/categoria', [CategoriaController::class, 'index']);
$router->post('/api/crear-categoria', [CategoriaController::class, 'crear']);
$router->post('/api/actualizar_categoria', [CategoriaController::class, 'actualizar']);
$router->post('/api/eliminar-categoria', [CategoriaController::class, 'eliminar']);

//Marcas
$router->get('/marca', [MarcaController::class, 'index']);
$router->post('/api/crear-marca', [MarcaController::class, 'crear']);
$router->post('/api/actualizar-marca', [MarcaController::class, 'actualizar']);
$router->post('/api/eliminar-marca', [MarcaController::class, 'eliminar']);

//Entradas
$router->get('/entrada', [EntradaController::class, 'index']);
$router->post('/api/crear-entrada', [EntradaController::class, 'crear']);
$router->post('/api/actualizar-entrada', [EntradaController::class, 'actualizar']);
$router->post('/api/eliminar-entrada', [EntradaController::class, 'eliminar']);

//Entrada producto
$router->post('/api/crear-entrada_producto', [Entrada_productoController::class, 'crear']);

// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();