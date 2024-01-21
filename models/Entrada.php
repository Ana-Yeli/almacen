<?php

namespace Model;

class Entrada extends ActiveRecord{
    //Base de datos 
    protected static $tabla = 'entrada';
    protected static $columnasDB = ['id', 'id_proveedor', 'id_usuario', 'fecha_entrada', 'fecha_recepcion', 'subtotal', 'folio', 'total', 'total_iva', 'total_descuento', 'estatus'];
    //Variables
    public $id;
    public $id_proveedor;
    public $id_usuario;
    public $fecha_entrada;
    public $fecha_recepcion;
    public $subtotal;
    public $folio;
    public $total;
    public $total_iva;
    public $total_descuento;
    public $estatus;

    public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->id_proveedor = $args['id_proveedor'] ?? null;
        $this->id_usuario = $args['id_usuario'] ?? null;
        $this->fecha_entrada = $args['fecha_entrada'] ?? '';
        $this->fecha_recepcion = $args['fecha_recepcion'] ?? '';
        $this->subtotal = $args['subtotal'] ?? '0';
        $this->folio = $args['folio'] ?? '';
        $this->total = $args['total'] ?? '0';
        $this->total_iva = $args['total_iva'] ?? '0';
        $this->total_descuento = $args['total_descuento'] ?? '0';
        $this->estatus = $args['estatus'] ?? '';
    }
}