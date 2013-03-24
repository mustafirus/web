<?php 
	@$all=$_GET["all"];
        $doc= new DOMDocument;
        $doc->load( 'sertificates.xml' );
	$xsl= new DOMDocument( );
        $xsl->load( 'sertificates_desc.xsl' );
        $proc= new XSLTProcessor( );
        $proc->importStyleSheet( $xsl );
    header('Content-Type: application/xml');
	header('Expires: 0');
	header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
	ob_clean();
	flush();
	$props = getProps();
    $proc->setParameter('', 'all', $all);
	$proc->setParameter('', 'max', $props->maxmasa);
        echo $proc->transformToXML( $doc );






function getProps(){
        $doc= new DOMDocument;
        $doc->load( 'props.xml' );
	$xsl= new DOMDocument( );
        $xsl->loadXML( '<?xml version="1.0" encoding="UTF-8"?>
		<top xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="1.0">
		<xsl:for-each select="//prop[name/text()]">
			<xsl:element name="{name}">
				<xsl:value-of select="value"/>
			</xsl:element>
		</xsl:for-each>
		</top>
	');
        $proc= new XSLTProcessor( );
        $proc->importStyleSheet( $xsl );
	return  simplexml_import_dom ($proc->transformToDoc( $doc ));
}
?>
