<?php 
ob_start();
require('./include/init.php');

session_start();
if (!isset($_SESSION['userid'])) {
	exit('登录超时');
}
$userid = $_SESSION['userid'];
if (!isset($_GET['method'])) {
	exit('非法操作');
}
if ($_GET['method']=='get') {
	$sql = 'select msgid,send,content,time from msg'.$userid.' where s2c=0';
	$msgs = getAll($sql, $conn);
	if (empty($msgs)) {
		exit();
	}
	echo json_encode($msgs);
	$time = time();
	$msgid1 = $msgs[0]['msgid'];
	$msgid2 = $msgs[count($msgs)-1]['msgid'];
	$sql = 'update msg'.$userid.' set s2c='.$time.' where msgid>='.$msgid1.' and msgid<='.$msgid2.' and s2c=0';
	mysql_query($sql, $conn);
} else if ($_GET['method']=='send') {
	//$sendto = $_POST['sendto'];
	$sendto = 3 - $userid;
	$content = $_POST['content'];
	$sql = 'insert into msg'.$sendto.' (send,content,time) values ('.$userid.',"'.$content.'",'.time().')';
	mysql_query($sql, $conn);
	echo 'True';
}
?>