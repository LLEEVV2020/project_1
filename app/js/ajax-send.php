<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/'); // ошибки будут на русском языке
$mail->IsHTML(true); // включение html тегов в письме

//От кого письмо
$mail->setFrom('sales@mf-vi.ru', 'от My Gradus');
// куда отправить
$mail->addAddress('info@mf-vi.ru', 'Лев');
//$mail->addAddress('ufafeniks@yandex.ru', 'narcologufa');


// тема письма
$mail->Subject = 'Данные с '.$_SERVER['SERVER_NAME'];



$body = '<h2 style="margin-top: 0;">Форма с сайта"'.$_SERVER['SERVER_NAME'].'"</h2>';

if(trim(!empty($_POST['name']))){
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['lastname']))){
    $body.='<p><strong>Фамилия:</strong> '.$_POST['lastname'].'</p>';
}

if(trim(!empty($_POST['email']))){
    $body.='<p><strong>Емайл:</strong> '.$_POST['email'].'</p>';
}

if(trim(!empty($_POST['phone']))){
    $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].'</p>';
}
if(trim(!empty($_POST['message']))){
    $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
}






$mail->Body = $body;

// ООтправляем
if(!$mail->send()){
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);

?>



