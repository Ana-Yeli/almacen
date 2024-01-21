<?php

namespace Controllers;

use Model\Producto;
use Model\ProductoJoin;

use MVC\Router;

class ProductoController{
    public static function index(Router $router){

        isAuth();

        $router->rend('producto/index',[
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email']
        ]);
    }

    public static function productos(){
        $consulta = "SELECT producto.id, nombre, id_marca, marca.descripcion AS Marca, id_categoria, categoria.descripcion AS Categoria, ";
        $consulta .= " id_producto_tipo, producto_tipo.descripcion AS Tipo, codigo_barras, presentacion  ";
        $consulta .= " FROM producto  ";
        $consulta .= " LEFT JOIN marca ";
        $consulta .= " ON producto.id_marca = marca.id  ";
        $consulta .= " LEFT JOIN categoria ";
        $consulta .= " ON producto.id_categoria = categoria.id ";
        $consulta .= " LEFT JOIN producto_tipo ";
        $consulta .= " ON producto.id_producto_tipo=producto_tipo.id ";
     
        $productos = ProductoJoin::SQL($consulta);
        
        // Establecer el encabezado de respuesta JSON
        header('Content-Type: application/json');

        // Enviar el resultado como JSON
        echo json_encode($productos);
    }

    public static function crear(){
        $producto = new Producto($_POST);
        $resultado = $producto->guardar();
        echo json_encode($resultado);
    }

    public static function eliminar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];

            $producto = new Producto();

            $producto->id = $id;

            $resultado = $producto->eliminar();

            echo json_encode($resultado);
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
    }

    public static function actualizar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];
            $producto = Producto::find($id);
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $producto->sincronizar($data);
                $resultado = $producto->guardar();
                echo json_encode($resultado);
            }
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
        
    }
}