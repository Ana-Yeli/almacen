<?php

namespace Model;

class Producto_tipo extends ActiveRecord{
    protected static $tabla = 'producto_tipo';
    protected static $columnasDB = ['id', 'descripcion'];

    public $id;
    public $descripcion;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->descripcion = $args['descripcion'] ?? '';
    }
}