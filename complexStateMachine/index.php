<!DOCTYPE html>
<html>
<head>
	<script src="http://code.jquery.com/jquery-latest.min.js"></script>
</head>
<body>
	<div id="output"></div>

	<div id="scripts">
	<?php
	/* Create a footer including all JS files in this folder. */
	foreach(scandir(__DIR__) as $file)
	{
		if(end(explode(".", $file)) == "js")
			echo "<script type='text/javascript' src='$file'></script>";
	}
	?>
	</div>
</body>
</html>