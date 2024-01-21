<?php

namespace Controllers;

use Model\Categoria;

use MVC\Router;

class CategoriaController{
    public static function index(Router $router){
        
        isAuth();

        $router->rend('categoria/index',[
            'nombre' => $_SESSION['nombre'],
            'email' => $_SESSION['email']
        ]);
    }

    public static function crear(){   
        $categoria = New Categoria($_POST);
        $resultado = $categoria->guardar();
        echo json_encode($resultado);
    }

    public static function actualizar(){
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $categoria = Categoria::find($id);
        $categoria->sincronizar($data);
        $resultado = $categoria->guardar();
        echo json_encode($resultado);    
    }

    public static function eliminar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];

            $categoria = new Categoria();

            $categoria->id = $id;

            $resultado = $categoria->eliminar();

            echo json_encode($resultado);
            
        } else {

            $resultado = "no hay id";
            echo json_encode($resultado);
        }
    }
}