var xmlhttpget;
var xmlhttpsend;
setInterval("getmsg()", 1000);

function getmsg() {
	if (window.XMLHttpRequest) {
		xmlhttpget = new XMLHttpRequest();
	} else {
		xmlhttpget = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttpget.onreadystatechange = xmlhttpget_ok;
	xmlhttpget.open("GET", "messageAct.php?method=get", true);
	xmlhttpget.send();	
}

function sendmsg() {
	var sendto = '1';
	var content = document.getElementById("textInput").value;
	var str = "sendto="+sendto+"&content="+content;
	if (window.XMLHttpRequest) {
		xmlhttpsend = new XMLHttpRequest();
	} else {
		xmlhttpsend = new ActiveXObject("Microsoft.XMLHTTP");
	}
	//xmlhttpsend.onreadystatechange = xmlhttpsend_ok;
	xmlhttpsend.open("POST", "messageAct.php?method=send", true);
	xmlhttpsend.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttpsend.send(str);	
	xmlhttpsend_ok(content);
}

function xmlhttpsend_ok(content) {
	var htm = "";
	htm += '<div class="chatItem me">';
	htm += '<div class="chatItemContent"> <img class="avatar" src="message/webwxgeticon_011.jpg" title="小度依然爱你">';
	htm += '<div class="cloud cloudText">';
	htm += '<div class="cloudPannel" style="">';
	htm += '<div class="sendStatus"> </div>';
	htm += '<div class="cloudBody">';
	htm += '<div class="cloudContent">';
	htm += '<pre style="white-space:pre-wrap">'+content+'</pre>';
	htm += '</div></div><div class="cloudArrow "></div></div></div></div></div>';
	document.getElementById("chat_chatmsglist").innerHTML += htm;
	document.getElementById("textInput").value = "";
	var e=document.getElementById("chat_chatscorll")
	e.scrollTop=e.scrollHeight;
}

function xmlhttpget_ok() {
	if (xmlhttpget.readyState==4 && xmlhttpget.status==200) {
		if (xmlhttpget.responseText == "") {
			return;
		}
		var msgs = eval('('+xmlhttpget.responseText+')');
		var msgbox = document.getElementById("chat_chatmsglist");
		var i, msg, htm;
		var date = new Date();
		for (i=0; i<msgs.length; i++) {
			msg = msgs[i];
			date.setTime(parseInt(msg.time)*1000);
			htm = "";
			htm += '<div class="chatItem you">';
			//htm += '<div class="time"> <span class="timeBg left"></span>'+ '88:88' +'<span class="timeBg right"></span> </div>';
			htm += '<div class="chatItemContent"> <img class="avatar" src="message/webwxgeticon_005.jpg" onerror="reLoadImg(this)" un="avatar_wxid_y62jzctozxen22" title="Plain Bridge" click="showProfile" username="wxid_y62jzctozxen22">';
			htm += '<div class="cloud cloudText" un="cloud_1021445652" msgid="1021445652">';
			htm += '<div class="cloudPannel" style="">';
			htm += '<div class="sendStatus"> </div>';
			htm += '<div class="cloudBody">';
			htm += '<div class="cloudContent">';
			htm += '<pre style="white-space:pre-wrap">'+msg.content+'</pre>';
			htm += '</div></div><div class="cloudArrow "></div></div></div></div></div>';
			msgbox.innerHTML += htm;
		}
		var e=document.getElementById("chat_chatscorll")
		e.scrollTop=e.scrollHeight;
	}
}