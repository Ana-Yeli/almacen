<?php

namespace Model;

class EntradaProductoJoin extends ActiveRecord{

    protected static $tabla = 'entrada_producto';
    protected static $columnasDB = [ 'id', 'id_producto', 'nombre_producto', 'presentacion','descripcion', 'marca', 'fecha_caducidad', 'cantidad', 'precio_compra', 'importe_sin_descuento', 'descuento', 'importe_con_descuento', 'iva', 'importe_c_iva', 'precio_sugerido'];

    public $id;
    public $id_producto;
    public $nombre_producto;
    public $presentacion;
    public $descripcion;
    public $marca;
    public $fecha_caducidad;
    public $cantidad;
    public $precio_compra;
    public $importe_sin_descuento;
    public $descuento;
    public $importe_con_descuento;
    public $iva;
    public $importe_c_iva;
    public $precio_sugerido;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->id_producto = $args['id_producto'] ?? null;
        $this->nombre_producto = $args['nombre_producto'] ?? '';
        $this->presentacion = $args['presentacion'] ?? '';
        $this->descripcion = $args['descripcion'] ?? '';
        $this->marca = $args['marca'] ?? '';
        $this->fecha_caducidad = $args['fecha_caducidad'] ?? '';
        $this->cantidad = $args['cantidad'] ?? null;
        $this->precio_compra = $args['precio_compra'] ?? '';
        $this->importe_sin_descuento = $args['importe_sin_descuento'] ?? '';
        $this->descuento = $args['descuento'] ?? '';
        $this->importe_con_descuento = $args['importe_con_descuento'] ?? '';
        $this->iva = $args['iva'] ?? '';
        $this->importe_c_iva = $args['importe_c_iva'] ?? '';
        $this->precio_sugerido = $args['precio_sugerido'] ?? '';

    }
}