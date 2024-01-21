<?php

namespace Controllers;

use Model\Proveedor;

use MVC\Router;

class ProveedorController{
    public static function index(Router $router){

        isAuth();

        $router->rend('proveedor/index',[
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email']
        ]);
    }

    public static function crear(){
        $proveedor = new Proveedor($_POST);
        $resultado = $proveedor->guardar();
        echo json_encode($resultado);
    }

    public static function actualizar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];
            $proveedor = Proveedor::find($id);
            if($_SERVER['REQUEST_METHOD'] === 'POST') {
                $proveedor->sincronizar($data);
                $resultado = $proveedor->guardar();
                echo json_encode($resultado);
            }
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
        
    }

    public static function eliminar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];

            $proveedor = new Proveedor();

            $proveedor->id = $id;

            $resultado = $proveedor->eliminar();

            echo json_encode($resultado);
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
    }
}