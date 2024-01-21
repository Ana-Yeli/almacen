<?php

namespace Model;

class Producto extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'producto';
    protected static $columnasDB = [ 'id', 'id_marca', 'id_categoria', 'id_producto_tipo', 'nombre', 'codigo_barras', 'presentacion'];
    //Variables
    public $id;
    public $id_marca;
    public $id_categoria;
    public $id_producto_tipo;
    public $nombre;
    public $codigo_barras;
    public $presentacion;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->id_marca = $args['id_marca'] ?? null;
        $this->id_categoria = $args['id_categoria'] ?? null;
        $this->id_producto_tipo = $args['id_producto_tipo'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->presentacion = $args['presentacion'] ?? '';
    }
}