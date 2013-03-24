<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:param name="all"/>
    <xsl:param name="max"/>
    <xsl:output method="xml"/>
    <xsl:variable name="svs" select="document('svidoctvos.xml')//svidoctvo"/>

    <xsl:template match="/*">
        <xsl:copy>
            <xsl:apply-templates select="*"/>
        </xsl:copy>
    </xsl:template>


    <xsl:template match="sertificate">
        <xsl:variable name="cur" select="."/>
        <xsl:variable name="sum"
            select="sum($svs[sertificate/text() = $cur/idd/text()]/masa/text())"/>
        <xsl:if test="$all=1 or $sum &lt; $max">
            <xsl:copy>
                <xsl:copy-of select="idd"/>
                <xsl:element name="desc">
                    <xsl:if test="$all=0">
                        <xsl:value-of select="idd"/>
                        <xsl:text> </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="cultura"/>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="sort"/>
                    <xsl:text> </xsl:text>
                    <xsl:value-of select="part"/>
                    <xsl:if test="$all=0">
                        <xsl:text> </xsl:text>
                        <xsl:value-of select="$sum"/>
                    </xsl:if>
                </xsl:element>
            </xsl:copy>
        </xsl:if>
    </xsl:template>

</xsl:stylesheet>
