<?php

namespace Controllers;

use Model\Marca;

use MVC\Router;

class MarcaController{
    public static function index(Router $router){

        isAuth();

        $router->rend('marca/index',[
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email']
        ]);
    }

    public static function crear(){   
        $marca = new Marca($_POST);
        $resultado = $marca->guardar();
        echo json_encode($resultado);
    }

    public static function actualizar(){
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $marca = Marca::find($id);
        $marca->sincronizar($data);
        $resultado = $marca->guardar();
        echo json_encode($resultado);    
    }

    public static function eliminar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];

            $marca = new Marca();

            $marca->id = $id;

            $resultado = $marca->eliminar();

            echo json_encode($resultado);
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
    }
}