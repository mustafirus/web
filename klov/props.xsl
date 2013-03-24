<?xml version="1.0" encoding="UTF-8"?>
<top xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xsl:version="1.0">
        <xsl:for-each select="//prop[name/text()]">
                <xsl:copy-of select="."/>
                <xsl:element name="{name}">
                        <xsl:value-of select="value"/>
                </xsl:element>
        </xsl:for-each>
</top>
