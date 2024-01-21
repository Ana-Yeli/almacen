<?php

namespace Controllers;

use Model\Categoria;
use Model\Entrada;
use Model\Marca;
use Model\Producto_medida;
use Model\Producto_tipo;
use Model\Producto;
use Model\Proveedor;
use Model\Usuario;
use Model\EntradaJoin;
use Model\EntradaProductoJoin;

class APIController{

    public static function categoria(){
        $categoria = Categoria::all();
        echo json_encode($categoria);
    }

    public static function marca(){
        $marca = Marca::all();
        echo json_encode($marca);
    }

    public static function proveedor(){
        $proveedor = Proveedor::all();
        echo json_encode($proveedor);
    }

    public static function producto_tipo(){
        $p_tipo = Producto_tipo::all();
        echo json_encode($p_tipo);
    }

    public static function usuario(){
        $usuario = Usuario::all();
        echo json_encode($usuario);
    }

    public static function entradas(){
        $consulta = " SELECT entrada.id, id_proveedor, proveedor.nombre_comercial, id_usuario, CONCAT(usuario.nombre, ' ',usuario.apellidos) as usuario, ";
        $consulta .= " fecha_entrada, fecha_recepcion, subtotal, folio, total, total_iva, total_descuento, estatus ";
        $consulta .= " FROM entrada ";
        $consulta .= " LEFT JOIN proveedor ";
        $consulta .= " ON entrada.id_proveedor = proveedor.id  ";
        $consulta .= " LEFT JOIN usuario ";
        $consulta .= " ON entrada.id_usuario = usuario.id ";
     
        $entradas = EntradaJoin::SQL($consulta);
        
        // Establecer el encabezado de respuesta JSON
        header('Content-Type: application/json');

        // Enviar el resultado como JSON
        echo json_encode($entradas);
    }
    
    public static function entrada_productos(){
        $id_entrada = isset($_GET['id_entrada']) ? $_GET['id_entrada'] : null;

        $consulta = " SELECT entrada_producto.id, producto.id as id_producto, producto.nombre as nombre_producto, producto.presentacion, entrada_producto.descripcion, ";
        $consulta .= " marca.descripcion as marca, entrada_producto.fecha_caducidad, entrada_producto.cantidad, entrada_producto.costo as precio_compra, ";
        $consulta .= " entrada_producto.importe_a_descuento as importe_sin_descuento, entrada_producto.descuento, entrada_producto.importe_d_descuanto as importe_con_descuento, ";
        $consulta .= " entrada_producto.iva, entrada_producto.importe_c_iva, entrada_producto.precio_sugerido ";
        
        $consulta .= " FROM entrada_producto ";

        $consulta .= " LEFT JOIN producto ";
        $consulta .= " ON entrada_producto.id_producto = producto.id ";
        $consulta .= " LEFT JOIN marca ";
        $consulta .= " ON producto.id_categoria = marca.id ";
        $consulta .= " LEFT JOIN entrada ";
        $consulta .= " ON entrada_producto.id_entrada = entrada.id ";

        $consulta .= " WHERE id_entrada = '${id_entrada}' ";
     
        $entrada_productos = EntradaProductoJoin::SQL($consulta);
        
        // Establecer el encabezado de respuesta JSON
        header('Content-Type: application/json');

        // Enviar el resultado como JSON
        echo json_encode($entrada_productos);
    }
    
}