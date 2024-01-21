<?php

namespace Model;

class Marca extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'marca';
    protected static $columnasDB = ['id', 'descripcion'];
 
    public $id;
    public $descripcion;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->descripcion = $args['descripcion'] ?? '';
    }
}