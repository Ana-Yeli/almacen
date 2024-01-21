<?php

namespace Model;

class Categoria extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'categoria';
    protected static $columnasDB = ['id', 'descripcion'];
 
    public $id;
    public $descripcion;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->descripcion = $args['descripcion'] ?? '';

    }
}