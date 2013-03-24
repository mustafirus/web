<?php 
	$st=$_GET["st"];
	$fl=$_GET["fl"];
	if (!$st or !$fl){
	    exit;// "incorrect params";
	}

        $doc= new DOMDocument;
        $doc->load( $st.'.xml' );
	$xsl= new DOMDocument( );
/*        $xsl->loadXML( '<?xml version="1.0" encoding="UTF-8"?>
		<top xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="1.0">
			<xsl:copy-of select="//'.$fl.'[not(text()=preceding::'.$fl.'/text())]"/>
		</top>'
	);
*/
        $xsl->loadXML( '<?xml version="1.0" encoding="UTF-8"?>
		<top xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="1.0">
            <xsl:for-each select="//'.$fl.'[not(text()=preceding::'.$fl.'/text())]">
                <row><col>
                    <xsl:value-of select="."/>
                </col></row>
            </xsl:for-each>
		</top>'
	);
        $proc= new XSLTProcessor( );
        $proc->importStyleSheet( $xsl );
	header('Content-Type: application/xml');
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	ob_clean();
	flush();
        echo $proc->transformToXML( $doc );
?>
