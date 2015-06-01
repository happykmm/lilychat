<?php 
ob_start();
header('content-type: text/html; charset=utf-8;');
date_default_timezone_set('Asia/Chongqing');

$root = dirname(dirname(__FILE__));
define('ROOT', $root);
require(ROOT . '/include/config.inc.php');
require(ROOT . '/include/mysql.func.php');

//检测开发环境或生产环境
if (defined('DEBUG')){
	error_reporting(E_ALL);
} else{
	error_reporting(0);
}

//检测魔术引号是否开启
if (!get_magic_quotes_gpc()){
	function _addslashes(&$v, $k){
		$v = addslashes($v);
	}
	array_walk_recursive($_GET, '_addslashes');
	array_walk_recursive($_POST, '_addslashes');
	array_walk_recursive($_COOKIE, '_addslashes');
}

//连接数据库
$conn = mysql_connect($_CFG['host'],$_CFG['user'],$_CFG['passwd']);
if (!$conn){
	exit('数据库连接出错');
}

$sql = 'use ' . $_CFG['db'];
mysql_query($sql, $conn);

$sql = 'set charset ' . $_CFG['charset'];
mysql_query($sql, $conn);

?>