<?php

namespace Model;

class Usuario extends ActiveRecord{
    //Base de datos 
    protected static $tabla = 'usuario';
    protected static $columnasDB = ['id', 'nombre', 'apellidos', 'email', 'admin', 'confirmado', 'token', 'password'];

    public $id;
    public $nombre;
    public $apellidos;
    public $email;
    public $admin;
    public $confirmado;
    public $token;
    public $password;

    public function _construct($args = []) {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellidos = $args['apellidos'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
        $this->password = $args['password'] ?? '';
    }
    //Mensajes de validación para la creación de una cuenta
    public function validarnuevaCuenta(){
        if(!$this->nombre){
            self::$alertas['error'][] = 'El nombre es obligatorio';
        }
        if(!$this->apellidos){
            self::$alertas['error'][] = 'Los apellidos son obligatorios';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El E-mail es obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El password es obligatorio';
        }
        if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'El password debe contener al menos 6 caracteres';
        }
        return self::$alertas;
    }

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El E-mail es obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El password es obligatorio';
        }

        return self::$alertas;
    }
    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El E-mail es obligatorio';
        }
        return self::$alertas;
    }
    public function validarPassword(){
        if(!$this->password){
            self::$alertas['error'][] = 'El password es boligatorio';
        }
        if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'El password debe tener al menos 6 caracteres';
        }

        return self::$alertas;
    }

    //Revisa si el usuario ya existe
    public function existeUsuario(){
        $query = "SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
        $resultado = self::$db->query($query);

        if($resultado->num_rows){
            self::$alertas['error'][] = 'El usuario ya esta registrado';
        }

        return $resultado;
    }

    public function hashPassword(){
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
    }

    public function crearToken(){
        $this->token = uniqid();
    }
    public function comprobarPasswordandverificado($password){
        $resultado = password_verify($password, $this->password);
        
        if(!$resultado || !$this->confirmado){
            self::$alertas['error'][] = 'Password Incorrecto o tu cuenta no ha sido confirmada';
        } else {
            return true;
        }
    }
}