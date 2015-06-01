
document.getElementsByName("username")[0].onfocus = username_onfocus;
document.getElementsByName("password")[0].onfocus = password_onfocus;
var xmlhttp;

function username_onfocus() {
	var username = document.getElementsByName("username")[0];
	if (username.value == "请输入账号") {
		username.value = "";
	}
}

function password_onfocus() {
	var enter_psw = document.getElementsByName("enter_psw")[0];
	if (enter_psw.innerHTML == "请输入密码") {
		enter_psw.innerHTML = "";
	}
}

function btn_submit_onclick() {
	var username = document.getElementsByName("username")[0].value;
	var password = document.getElementsByName("password")[0].value;

	if (window.XMLHttpRequest) {
		xmlhttp = new XMLHttpRequest();
	} else {
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = xmlhttp_onreadystatechange;
	xmlhttp.open("POST", "loginAct.php", true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("username="+username+"&password="+password);	
}

function xmlhttp_onreadystatechange() {
	if (xmlhttp.readyState==4 && xmlhttp.status==200) {
		if (xmlhttp.responseText == "True") {
			window.location.href = "index.php";
		} else {
			document.getElementsByName("login_error")[0].style.display = "";
		}
	}
}
