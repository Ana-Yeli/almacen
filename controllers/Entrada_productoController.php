<?php

namespace Controllers;

use Model\Entrada_producto;

use MVC\Router;

class Entrada_productoController{
    public static function crear(){
        $entrada_producto = new Entrada_producto($_POST);
        $resultado = $entrada_producto->guardar();
        header('Content-Type: application/json'); // Asegúrate de que el encabezado sea de tipo JSON
        echo json_encode($resultado);
    }
}