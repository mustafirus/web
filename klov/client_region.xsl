<?xml version="1.0" encoding="UTF-8"?>
<top xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="1.0">
        <xsl:copy-of select="//region[not(text()=preceding::region/text())]"/>
</top>
