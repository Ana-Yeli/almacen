<?php

namespace Model;

class ProductoJoin extends ActiveRecord{
    //Base de datos
    protected static $tabla = 'producto';
    protected static $columnasDB = [ 'id', 'nombre', 'id_marca', 'Marca','id_categoria', 'Categoria', 'id_producto_tipo', 'Tipo', 'codigo_barras', 'presentacion'];
    //Variables
    public $id;
    public $nombre;
    public $id_marca;
    public $Marca;
    public $id_categoria;
    public $Categoria;
    public $id_producto_tipo;
    public $Tipo;
    public $codigo_barras;
    public $presentacion;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->id_marca = $args['id_marca'] ?? null;
        $this->Marca = $args['Marca'] ?? '';
        $this->id_categoria = $args['id_categoria'] ?? null;
        $this->Categoria = $args['Categoria'] ?? '';
        $this->id_producto_tipo = $args['id_producto_tipo'] ?? null;
        $this->Tipo = $args['Tipo'] ?? '';
        $this->codigo_barras = $args['codigo_barras'] ?? '';
        $this->presentacion = $args['presentacion'] ?? '';
    }
}