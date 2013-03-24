<?php
$name=$_GET["name"];
$file="";
if ($name){
    $file = $name . ".xml";
}
else{
    exit;// "incorrect params";
}

//$file="clients.xml";
if (isset($HTTP_RAW_POST_DATA)){
	$fh = fopen($file, 'w') or die("can't open file");
	reset($_REQUEST);
	fwrite($fh, print_r($HTTP_RAW_POST_DATA,true));
	fclose($fh);
}else{
	header('Content-Type: application/xml');
	header('Content-Length: ' . filesize($file));
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	ob_clean();
	flush();
	readfile($file);
}
?>
