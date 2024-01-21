<?php

namespace Controllers;

use Model\Entrada;
use Model\Entrada_producto;

use MVC\Router;

class EntradaController{
    
    public static function index(Router $router){

        isAuth();

        $router->rend('entrada/index', [
        'nombre' => $_SESSION['nombre'],
        'email' => $_SESSION['email'],
        'id' => $_SESSION['id']
        ]);
    }

    public static function dash(Router $router){
        
        isAuth();

        $router->rend('dashboard/index', [
        'nombre' => $_SESSION['nombre'],
        'email' => $_SESSION['email']
        ]);
    }

    public static function lista_entrada(Router $router){

        isAuth();
        
        $router->rend('lista_entrada/index', [
        'nombre' => $_SESSION['nombre'],
        'email' => $_SESSION['email']
        ]);
    }

    public static function crear(){
        $entrada = new Entrada($_POST);
        $resultado = $entrada->guardar();
        echo json_encode($resultado);
    }

    public static function actualizar(){
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $entrada = Entrada::find($id);
        $entrada->sincronizar($data);
        $resultado = $entrada->guardar();
        echo json_encode($resultado);    
    }

    public static function eliminar(){
        // Obtenemos los datos del cuerpo de la solicitud
        $data = json_decode(file_get_contents('php://input'), true);

        // Verificamos si se proporcionó el id
        if (isset($data['id'])) {
            $id = $data['id'];

            $consulta = " SELECT * FROM entrada_producto WHERE id_entrada = '${id}' ";
        
            $entrada_productos = Entrada_producto::SQL($consulta);
            $resultados = [];
            // Iterar sobre los resultados y eliminar cada entrada_producto
            foreach ($entrada_productos as $entrada_producto) {                
                $resultado_producto = $entrada_producto->eliminar();
                $resultados[] = $resultado_producto;
            }
            
            // Verificar si todos los resultados son true
            $todos_exitosos = !in_array(false, $resultados, true);

            if ($todos_exitosos) {
                $entrada = new Entrada();
                $entrada->id = $id;
                $resultado = $entrada->eliminar();
                echo json_encode($resultado);
            } else {
                $resultado = ["error" => "Al menos una eliminación falló"];
                echo json_encode($resultado);
            }
        } else {

            $resultado = "No hay id";
            echo json_encode($resultado);
        }
    }
}