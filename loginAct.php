<?php 
ob_start();
require('./include/init.php');

$username = $_POST['username'];
$password = $_POST['password'];

$sql = "select userid from users where username='" . $username
. "' and password='" . $password . "'";
$userid = getOne($sql, $conn) + 0;
if ($userid>0) {
	session_start();
	$lifetime = 24*60*60;
	setcookie(session_name(), session_id(), time()+$lifetime);
	$_SESSION['userid'] = $userid;
	$_SESSION['logtime'] = time();
	echo 'True';
} else {
	echo 'False';
}


?>