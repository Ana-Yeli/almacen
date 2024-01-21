<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;


class LoginController {
    public static function login(Router $router){
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST); 
            $auth->sincronizar($_POST);  
            $alertas = $auth->validarLogin();
            
            if(empty($alertas)) {
                //Comprobar que exista el usuario
                $usuario = Usuario::where('email', $auth->email);
                
                if($usuario){
                    //Verificar password
                    if($usuario->comprobarPasswordandverificado($auth->password)) {
                        //Autenticar el usuario
                        session_start();
                        
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellidos;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;

                        //Redireccionamiento
                        if($usuario->admin === "1"){
                        $_SESSION['admin'] = $usuario->admin ?? null;
                            header('Location: /views/dashboard/index.php');
                        } else {
                            header('Location: /views/dashboard/index.php');
                        }
                        
                    }
                } else {
                    Usuario::setAlerta('error', 'Usuario no encontrado');
                } 
            }
        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/login', [
            'alertas' => $alertas      
        ]);
    }

    public static function logout(){
        session_start();

        $_SESSION = [];

        header('Location: /');
    }

    public static function olvide(Router $router){
        
        $alertas = [];
        $error = false;
        
        if($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);
            $auth->sincronizar($_POST);             
            $alertas = $auth->validarEmail();

            if(empty($alertas)){
                $usuario = Usuario::where('email', $auth->email);
                if($usuario && $usuario->confirmado === "1")
                {
                    Usuario::setAlerta('exito', "<p><strong>Hola " . $usuario->nombre . " </strong>Has solicitado restablecer tu password, sigue el siguiente enlace para hacerlo.</p><p>Presiona aquí: <a href='http://localhost:3000/recuperar?email=" . $usuario->email ."'>Restablecer password</a></p>");
                    $error = true;
                } 
                    else 
                {
                    Usuario::setAlerta('error', 'El usuario no existe o no esta confirmado');     
                }
                
            }
        }
        $alertas = Usuario::getAlertas();

        $router->render('auth/olvide-password', [
            'alertas' => $alertas,
            'error' => $error
        ]);
    }

    public static function recuperar(Router $router){
       
       $alertas = [];
       $error = false;

       $email = s($_GET['email']);

       //Buscar usuario por email
       $usuario = Usuario::where('email', $email);

       if(empty($usuario)){
            Usuario::setAlerta('error', 'Email no válido');
            $error = true;
       }
       if($_SERVER['REQUEST_METHOD'] === 'POST'){
            //Leer el nuevo passsword y guardarlo
            $password = new Usuario($_POST);
            $password->sincronizar($_POST);  
            $alertas = $password->validarPassword();
            if(empty($alertas)){
                $usuario->password = null;
                $usuario->password = $password->password;
                $usuario->hashPassword();

                $resultado = $usuario->guardar();
                if($resultado){
                    header('Location: /');
                }
            }
       }

       $alertas = Usuario::getAlertas();
        $router->render('auth/recuperar-password', [
            'alertas' => $alertas,
            'error' => $error
        ]);
    }

    public static function crear(Router $router){
        $usuario = new Usuario;
        
        //Alertas vacías
        $alertas = [];

        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            $usuario->sincronizar($_POST);       
            $alertas = $usuario->validarnuevaCuenta();            
        
            //Revisar que alerta este vacio
            if(empty($alertas)){
                //Verificar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();

                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else {
                    //Hashear el password
                    $usuario->hashPassword();

                    //Crear Token unico
                    $usuario->crearToken();

                    //Enviar el Email
                    //$email = new Email($usuario->nombre, $usuario->email, $usuario->token);
                    //$email->enviarConfirmacion();

                    //Crear Usuario
                    $resultado = $usuario->guardar();
                    if($resultado){
                        //echo "Guardado correctamente";
                        header('Location: /mensaje');
                        
                    }

                }
            }            
        }

        $router->render('auth/crear-cuenta', [
          'usuario' => $usuario,
          'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router){
        
        $router->render('auth/mensaje');
    }
}
