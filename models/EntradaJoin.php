<?php

namespace Model;

class EntradaJoin extends ActiveRecord{

    protected static $tabla = 'entrada';
    protected static $columnasDB = [ 'id', 'id_proveedor', 'nombre_comercial', 'id_usuario','usuario', 'fecha_entrada', 'fecha_recepcion', 'subtotal', 'folio', 'total', 'total_iva', 'total_descuento', 'estatus'];

    public $id;
    public $id_proveedor;
    public $nombre_comercial;
    public $id_usuario;
    public $usuario;
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
        $this->nombre_comercial = $args['nombre_comercial'] ?? '';
        $this->id_usuario = $args['id_usuario'] ?? null;
        $this->usuario = $args['usuario'] ?? '';
        $this->fecha_entrada = $args['fecha_entrada'] ?? '';
        $this->fecha_recepcion = $args['fecha_recepcion'] ?? '';
        $this->subtotal = $args['subtotal'] ?? '';
        $this->folio = $args['folio'] ?? '';
        $this->total = $args['total'] ?? '';
        $this->total_iva = $args['total_iva'] ?? '';
        $this->total_descuento = $args['total_descuento'] ?? '';
        $this->estatus = $args['estatus'] ?? '';

    }
}