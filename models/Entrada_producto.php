<?php

namespace Model;

class Entrada_producto extends ActiveRecord{
    protected static $tabla = 'entrada_producto';
    protected static $columnasDB = ['id', 'id_entrada','id_producto', 'cantidad', 'descripcion', 'costo', 'descuento', 'fecha_caducidad', 'iva', 'importe_a_descuento', 'importe_d_descuanto', 'importe_c_iva', 'precio_sugerido'];

    public $id;
    public $id_entrada;
    public $id_producto;
    public $cantidad;
    public $descripcion;
    public $costo;
    public $descuento;
    public $fecha_caducidad; 
    public $iva;
    public $importe_a_descuento;
    public $importe_d_descuanto;
    public $importe_c_iva;
    public $precio_sugerido;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->id_entrada = $args['id_entrada'] ?? null;
        $this->id_producto = $args['id_producto'] ?? null;
        $this->cantidad = $args['cantidad'] ?? null;
        $this->descripcion = $args['descripcion'] ?? '';
        $this->costo = $args['costo'] ?? '';
        $this->descuento = $args['descuento'] ?? '';
        $this->fecha_caducidad = $args['fecha_caducidad'] ?? '';
        $this->iva = $args['iva'] ?? '';
        $this->importe_a_descuento = $args['importe_a_descuento'] ?? '';
        $this->importe_d_descuanto = $args['importe_d_descuanto'] ?? '';
        $this->importe_c_iva = $args['importe_c_iva'] ?? '';
        $this->precio_sugerido = $args['precio_sugerido'] ?? '';
    }
}