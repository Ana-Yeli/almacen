<?php

 namespace Classes;

 use PHPMailer\PHPMailer\PHPMailer;

class Email {

    public $email;
    public $nombre;
    public $token;

    public function _construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion(){
        //Crear objeto de email
        $mail = new PHPMailer();
        $mail->isSMTP();

        //$mail->SMTPDebug = SMTP::DEBUG_SERVER;

        $mail->Host = 'smtp.gmail.com';
        $mail->Port = 465;
        $mail->SMTPSecure = 'tls';
        $mail->SMTPAuth = true;
        

        //$mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;

        $mail->Username = 'yelidiaz43@gmail.com';
        $mail->Password = '---';

        $mail->setFrom('yelidiaz43@gmail.com');
        $mail->addAddress('yelidiaz840@gmail', 'Yeli');
        $mail->Subject = 'Confirma tu cuenta';

        //Set html 
        $mail->isHTML(TRUE);
        $mail->Charset = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola" . $this->nombre . "</strong>Has creado tucuenta en Almacen ML, solo debes confirmarla presionando el siguiente enlace</p>"; 
        $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token ."'>Confirmar cuenta</a></p>"; 
        $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
        $contenido .= "/<html>";
        $mail->Body = $contenido;

        if(!$mail->Send()) {
            echo "Correo enviado";
            } else {

            echo "Enviado!";
            }

        //$mail->send();
    }
}