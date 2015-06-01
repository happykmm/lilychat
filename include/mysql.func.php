<?php 


/*
getAll()
parm String $sql; sql语句
parm resource $conn; 资源通道
return 二维数组/false
*/
function getAll($sql, $conn){
	$rs = mysql_query($sql, $conn);
	if (!$rs){
		return false;
	}
	$res = array();
	while ($row = mysql_fetch_assoc($rs)){
		$res[] = $row;
	}
	return $res;
}


/*
getRow() 取出单行数据
parm String $sql;  sql语句
parm resource $conn;  资源通道
return 一位数组/false
*/
function getRow($sql, $conn) {
	$rs = mysql_query($sql, $conn);
	return mysql_fetch_assoc($rs);
}


/*
getOne()
parm String $sql;  sql语句
parm resource $conn;  资源通道
return 单个标量值
*/
function getOne($sql, $conn){
	$rs = mysql_query($sql, $conn);
	$row = mysql_fetch_row($rs);
	return $row[0];
}

?>