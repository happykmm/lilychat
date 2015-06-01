<?php 
header('content-type: text/html; charset=utf-8;'); 
session_start();
if (isset($_SESSION['userid'])) {
    $script = <<<EOT
    <script type="text/javascript">
	     window.location.href = 'message.htm';
	</script>
EOT;
} else {
	$script = <<<EOT
	<script type="text/javascript">
		window.location.href = 'login.htm';
	</script>
EOT;
}
echo $script;
?>



