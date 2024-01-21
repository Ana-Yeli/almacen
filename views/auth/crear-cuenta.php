<h1 class="nombre-pagina">Crear cuenta</h1>
<p class="descripcion-pagina">Llena el siguiente formulario para crear una cuenta</p>

<?php 
    include_once __DIR__ . "/../templates/alertas.php" 
?>

<form class="formulario" method="POST" action="/crear-cuenta">
    <div class="campo">
        <label for="nombre">Nombre</label>
        <input 
            type="text"
            id="nombre" 
            name="nombre" 
            placeholder="Tu nombre"
            value="<?php echo s($usuario->nombre);?>"
        >
    </div>
    <div class="campo">
        <label for="apellidos">Apellidos</label>
        <input 
            type="text"
            id="apellidos" 
            name="apellidos" 
            placeholder="Tus apellidos"
            value="<?php echo s($usuario->apellidos);?>"
        >
    </div>

    <div class="campo">
        <label for="email">E-mail</label>
        <input 
            type="email"
            id="email"
            placeholder="Tu e-mail"
            name="email"
            value="<?php echo s($usuario->email);?>"
        >
    </div>

    <div class="campo">
        <label for="password">Password</label>
        <input 
            type="password"
            id="password"
            placeholder="Tu password" 
            name="password"
        >
    </div>

    <input type="submit" class="boton" value="Crear cuenta">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia sesión</a>
    <a href="/olvide">Olvidaste tu password</a>
</div>