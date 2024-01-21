<?php

namespace Model;

class Proveedor extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'proveedor';
    protected static $columnasDB = ['id', 'nombre_comercial', 'nombre_fiscal', 'rfc', 'domicilio', 'telefono', 'correo'];
 
    public $id;
    public $nombre_comercial;
    public $nombre_fiscal;
    public $rfc;
    public $domicilio;
    public $telefono;
    public $correo;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre_comercial = $args['nombre_comercial'] ?? '';
        $this->nombre_fiscal = $args['nombre_fiscal'] ?? '';
        $this->rfc = $args['rfc'] ?? '';
        $this->domicilio = $args['domicilio'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->correo = $args['correo'] ?? '';
    }
}