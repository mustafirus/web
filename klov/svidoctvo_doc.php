<?php 
	@$client_name=$_GET["client"];
	@$sertificate=$_GET["sertificate"];
	@$masa=$_GET["masa"];
	@$idd=$_GET["idd"];
        $doc= new DOMDocument;
        $doc->load( 'sertificates.xml' );
        $clients= new DOMDocument;
        $clients->load( 'clients.xml' );
	$xp = new DOMXPath($doc);
	$xp1 = new DOMXPath($clients);
	$sert = simplexml_import_dom ($xp->query("sertificate[idd=".$sertificate."]")->item(0));
	$client = simplexml_import_dom ($xp1->query("client[common='".$client_name."']")->item(0));
//	$sert->date = date("d M Y");
//	$sert->date = strtotime($sert->date);

	$mons = Array("січня", "лютого","березня","квітня","травня","червня","липня","серпня","вересня","жовтня","листопада","грудня");
	$date_parsed = date_parse($sert->date);
	$date_parsed['month'] = $mons [$date_parsed['month']-1];
	$sert->date = "«" . $date_parsed['day'] . "» " . $date_parsed['month'] . " " . $date_parsed['year'];
	$act = preg_split("/\//", $sert->act);
	$sert->act = "№ " . $act[0] . " від " . $act[1] . "р.";

/*
	setlocale (LC_TIME, 'uk_UA.UTF-8');
        $sert->date = strftime( "«%d» %B %Y", strtotime($sert->date) );
*/
	$inf1 = preg_split("/\//", $sert->inf1);
	$inf2 = preg_split("/\//", $sert->inf2);
	$inf3 = preg_split("/\//", $sert->inf3);
	@$infectnames = "<p class=\"Standard\">".$inf1[0]."</p><p class=\"Standard\">".$inf2[0]."</p><p class=\"Standard\">".$inf3[0]."</p>";
	@$infectnumes = "<p class=\"Standard\">".$inf1[1]."</p><p class=\"Standard\">".$inf2[1]."</p><p class=\"Standard\">".$inf3[1]."</p>";
	$props = getProps();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.1 plus MathML 2.0//EN" "http://www.w3.org/TR/MathML2/dtd/xhtml-math11-f.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head profile="http://dublincore.org/documents/dcmi-terms/">

	
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title xml:lang="uk-UA"> </title>
		<style type="text/css">
			@page {
			}
			body div {
			    width : 19cm;
			    border : thin solid;
			    margin : 1cm;
			}
			@media print {
			    body div {
				    border : none;
			        margin : 0;
			    }
			}
			
			td {
			    overflow : hidden;
			}
			td[rowspan] {
				padding: 0;
				vertical-align: bottom;
			}
			td[rowspan] p{
//			    writing-mode : tb-rl;
//			    -webkit-transform : rotate(270deg);
			    -moz-transform : rotate(270deg);
//			    -o-transform : rotate(270deg);
			    white-space : nowrap;
//			    display : block;
				margin-bottom: 20ems;
				bottom: 0;
				width:20px;
				height:20px;
				text-align: center;
			}
			
			table {
			    border-collapse : collapse;
			    border-spacing : 0;
			    empty-cells : show
			}
			td,
			th {
			    vertical-align : top;
			    font-size : 12pt;
			}
			h1,
			h2,
			h3,
			h4,
			h5,
			h6 {
			    clear : both
			}
			ol,
			ul {
			    margin : 0;
			    padding : 0;
			}
			li {
			    list-style : none;
			    margin : 0;
			    padding : 0;
			}<!--
			"li span.odfLiEnd" - IE 7 issue-->
			li span.{ clear: both; line-height:0; width:0; height:0; margin:0; padding:0; }
			span.footnodeNumber {
			    padding-right : 1em;
			}
			span.annotation_style_by_filter {
			    font-size : 95%;
			    font-family : Arial;
			    background-color : #fff000;
			    margin : 0;
			    border : 0;
			    padding : 0;
			}
			* {
			    margin : 0;
			}
			.P1 {
			    font-size : 12pt;
			    text-align : right ! important;
			    font-family : Times New Roman;
			    writing-mode : lr-tb;
			}
			.P2 {
			    font-size : 12pt;
			    text-align : center ! important;
			    font-family : Times New Roman;
			    writing-mode : lr-tb;
			    font-weight : bold;
			}
			.P3 {
			    font-size : 12pt;
			    text-align : center ! important;
			    font-family : Times New Roman;
			    writing-mode : lr-tb;
			}
			.P4 {
			    font-size : 12pt;
			    text-align : left ! important;
			    font-family : Times New Roman;
			    writing-mode : lr-tb;
			}
			.Standard {
			    font-size : 12pt;
			    font-family : Times New Roman;
			    writing-mode : lr-tb;
			    text-align : left ! important;
			}
			.Table1 {
			    width : 100%;
			    margin-left : 0cm;
			    writing-mode : lr-tb;
			}
			.Table1_A1 {
			    vertical-align : middle;
			    padding-left : 0.191cm;
			    padding-right : 0.191cm;
			    padding-top : 0cm;
			    padding-bottom : 0cm;
			    border-left-width : 0.018cm;
			    border-left-style : solid;
			    border-left-color : #000000;
			    border-right-style : none;
			    border-top-width : 0.018cm;
			    border-top-style : solid;
			    border-top-color : #000000;
			    border-bottom-width : 0.018cm;
			    border-bottom-style : solid;
			    border-bottom-color : #000000;
			    writing-mode : lr-tb;
			}
			.Table1_A4 {
			    vertical-align : top;
			    padding-left : 0.191cm;
			    padding-right : 0.191cm;
			    padding-top : 0cm;
			    padding-bottom : 0cm;
			    border-left-width : 0.018cm;
			    border-left-style : solid;
			    border-left-color : #000000;
			    border-right-style : none;
			    border-top-width : 0.018cm;
			    border-top-style : solid;
			    border-top-color : #000000;
			    border-bottom-width : 0.018cm;
			    border-bottom-style : solid;
			    border-bottom-color : #000000;
			    writing-mode : lr-tb;
			}
			.Table1_L1 {
			    vertical-align : top;
			    padding-left : 0.191cm;
			    padding-right : 0.191cm;
			    padding-top : 0cm;
			    padding-bottom : 0cm;
			    border-width : 0.018cm;
			    border-style : solid;
			    border-color : #000000;
			    writing-mode : lr-tb;
			}
			.Table1_M2 {
			    vertical-align : middle;
			    padding-left : 0.191cm;
			    padding-right : 0.191cm;
			    padding-top : 0cm;
			    padding-bottom : 0cm;
			    border-width : 0.018cm;
			    border-style : solid;
			    border-color : #000000;
			    writing-mode : lr-tb;
			}
			.Table1_A {
			    width : 1.406cm;
			}
			.Table1_B {
			    width : 1.122cm;
			}
			.Table1_C {
			    width : 1.383cm;
			}
			.Table1_E {
			    width : 1.304cm;
			}
			.Table1_F {
			    width : 1.252cm;
			}
			.Table1_H {
			    width : 1.199cm;
			}
			.Table1_J {
			    width : 1.409cm;
			}
			.Table1_K {
			    width : 1.461cm;
			}
			.Table1_L {
			    width : 3.184cm;
			}
			.Table1_M {
			    width : 1.263cm;
			}
			.T2 {
			    text-decoration : underline;
			}
			.T3 {
			    vertical-align : sub;
			    font-size : 58%;
			    text-decoration : underline;
			}<!--
			ODF styles with no properties representable as CSS-->
			.Table1.1 .Table1.2 .Table1.3 .Table1.4 .Table1.5 .T1 { }</style>
	</head><body>
		<div>
			<p class="P4">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
			<p class="P1">Сільгоспоблік, форма 215</p>
			<p class="P1">Затверджено Мінсільгосппродом</p>
			<p class="P1">України 14.03.94р. № 11</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard"><?php echo $sert->date ?></p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="P2">СВІДОЦТВО НА НАСІННЯ № <?php printf("%03d", $idd); ?></p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">Категорія насіння (1-3т або 4 та наступної
				репродукції)____________________________</p>
			<p class="Standard"><span class="T1">_______________________</span><span class="T2"><?php echo $props->generation ?></span><span class="T1">________________________________________</span></p>
			<p class="Standard"><span class="T1">Господарство (організація) ________</span><span class="T2"><?php echo $props->org ?></span><span class="T1">________________________________</span></p>
			<p class="Standard"><span class="T1">Адреса: поштовий індекс: </span><span class="T2"><?php echo $props->zip ?></span><span class="T1"> область:
					________________________________________</span></p>
			<p class="Standard">Район _______________місто, село: <?php echo $props->city ?>
				__________________</p>
			<p class="Standard"><span class="T1">1. Культура _______</span><span class="T2"><?php echo $sert->cultura ?></span><span class="T1">_______________________________________________________</span></p>
			<p class="Standard"><span class="T1">2. Сорт __________</span><span class="T2"><?php echo $sert->sort ?></span><span class="T1">_______________________________________________________</span></p>
			<p class="Standard"><span class="T1">3. Генерація ________</span><span class="T2">РН1-1-3, перша</span><span class="T1">_____________________________________________</span></p>
			<p class="Standard"><span class="T1">4. Рік урожаю ____</span><span class="T2"><?php echo $props->year ?></span><span class="T1">____5. № партії _________</span><span class="T2"><?php echo $sert->part ?></span><span class="T1">_______________________________</span></p>
			<p class="Standard"><span class="T1">6. Маса партії: ____</span><span class="T2"><?php echo $masa ?>
					(тон</span><span class="T1">) _____ 7. Місце зберігання: ___</span><span class="T2">с.Печанівка</span><span class="T1">______________</span></p>
			<p class="Standard">8. Кількість місць:
				____________________________________________________________</p>
			<p class="Standard"><span class="T1">9. Характеристика вирощеного насіння: сортова
					чистота (типовість): &nbsp;_____</span><span class="T2"><?php echo $sert->vmist ?></span><span class="T1">______,</span></p>
			<p class="Standard">Панцирність соняшника _____-_____%, ксенійність кукурудзи (зернин на
				100 качанів)</p>
			<p class="Standard">______-____, алкалоїдність люпину (гірких насінин)
				______________-________________%</p>
			<p class="Standard">10. Вміст сортової домішки (назва,%)
				______________________-_____________________,</p>
			<p class="Standard">стрілкуючих рослин (овочі та
				коренеплоди)_________________-______________________</p>
			<p class="Standard">11. Ураження посівів хворобами та шкідниками (за актами апробації):
				летючою сажкою</p>
			<p class="Standard">________-_______%, твердою сажкою _________-_______%, іншими (назва,
				%)____-_____</p>
			<p class="Standard">12. Засміченість посіву: карантинними бур’янами (назва, % за актом
				польової апробації):________________-____________ ураження іншими карантинними
				об’єктами (назва,%) ________-_________, отруйними, злісними та
				вантажовідокремлюваними бур’янами (назва, кількість або
				%)_________________-______________________________</p>
			<p class="Standard">&nbsp;</p>
			<table class="Table1" border="0" cellpadding="0" cellspacing="0">
<!--				<col width="2.64cm" />
				<col width="55.0px" />
				<col width="92.0px" />
				<col width="70.0px" />
				<col width="86.0px" />
				<col width="55.0px" />
				<col width="68.0px" />
				<col width="78.0px" />
				<col width="102.0px" />
				<col width="74.0px" />
				<col width="79.0px" />
				<col width="139.0px" />
				<col width="78.0px" />
-->				<tbody><tr class="Table11">
					<td rowspan="3" class="Table1_A1"><p class="Standard">Насіння основної &nbsp;культури , %</p></td>
					<td rowspan="3" class="Table1_A1"><p class="Standard">Відхід, ,%</p></td>
					<td colspan="5" class="Table1_A1"><p class="Standard">Вміст</p></td>
					<td rowspan="3" class="Table1_A1"><p class="Standard">Вологість, %</p></td>
					<td rowspan="3" class="Table1_A1"><p class="Standard">Енергія проростанн, % </p></td>
					<td rowspan="3" class="Table1_A1"><p class="Standard">Схожість, %</p></td>
					<td rowspan="3" class="Table1_A1"><p class="Standard">Маса 1000 насінин, г</p></td>
					<td colspan="2" class="Table1_L1"><p class="Standard">Зараження хворобами та шкідниками</p></td>
				</tr>
				<tr class="Table12">
					<td colspan="2" class="Table1_A1"><p class="Standard">насіння</p></td>
					<td rowspan="2" class="Table1_A1"><p class="Standard">Сажкових утворень, %</p></td>
					<td rowspan="2" class="Table1_A1"><p class="Standard">Ріжків, %</p></td>
					<td rowspan="2" class="Table1_A1"><p class="Standard">Склер оцій сірої і білої гнилей, %</p></td>
					<td rowspan="2" class="Table1_A1"><p class="Standard">назва</p></td>
					<td rowspan="2" class="Table1_M2"><p class="Standard">% або ступінь зараження</p></td>
				</tr>
				<tr class="Table13">
					<td class="Table1_A1"><br><br><br><p class="Standard">Інших
						культурних рослин, шт./кг або %</p><br><br><br><br>
					</td>
					<td class="Table1_A1"><p class="Standard">бур’янів,
							шт./кг</p></td>
				</tr>
				<tr class="Table14">
					<td class="Table1_A4"><p class="Standard">1</p></td>
					<td class="Table1_A4"><p class="Standard">2</p></td>
					<td class="Table1_A4"><p class="Standard">3</p></td>
					<td class="Table1_A4"><p class="Standard">4</p></td>
					<td class="Table1_A4"><p class="Standard">5</p></td>
					<td class="Table1_A4"><p class="Standard">6</p></td>
					<td class="Table1_A4"><p class="Standard">7</p></td>
					<td class="Table1_A4"><p class="Standard">8</p></td>
					<td class="Table1_A4"><p class="Standard">9</p></td>
					<td class="Table1_A4"><p class="Standard">10</p></td>
					<td class="Table1_A4"><p class="Standard">11</p></td>
					<td class="Table1_A4"><p class="Standard">12</p></td>
					<td class="Table1_L1"><p class="Standard">13</p></td>
				</tr>
				<tr class="Table15">
					<td class="Table1_A1"><p class="Standard"><?php echo $sert->vmist ?></p></td>
					<td class="Table1_A1"><p class="Standard"><?php echo (10000 - (("".$sert->vmist)*100))/100 ?></p></td>
					<td class="Table1_A1"><p class="Standard">-</p></td>
					<td class="Table1_A1"><p class="Standard">-</p></td>
					<td class="Table1_A1"><p class="Standard">-</p></td>
					<td class="Table1_A1"><p class="Standard">-</p></td>
					<td class="Table1_A1"><p class="Standard">-</p></td>
					<td class="Table1_A1"><p class="Standard"><?php echo $sert->vologost ?></p></td>
					<td class="Table1_A1"><p class="Standard"><?php echo $sert->energy ?></p></td>
					<td class="Table1_A1"><p class="Standard"><?php echo $sert->shogest ?></p></td>
					<td class="Table1_A1"><p class="Standard"><?php echo $sert->masa1000 ?></p></td>
					<td class="Table1_A1"><?php echo $infectnames ?></td>
					<td class="Table1_M2"><?php echo $infectnumes ?></td>
				</tr>
			</tbody></table>
			<p class="Standard">
			</p><p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">13. Відомості про показники:
				___________________________________________________</p>
			<p class="Standard">(сортова чистота або типовість, засміченість і ураженість хворобами
				та шкідниками)</p>
			<p class="Standard"><span class="T1">Подано на основі документів ___</span><span class="T2">акт апробації <?php echo $sert->act ?></span><span class="T1">.__________________</span></p>
			<p class="Standard">(вид документу, номер і дата)</p>
			<p class="Standard">14. Відомості про посівні якості подано на основі «Сертифікати на
				насіння України» за</p>
			<p class="Standard"><span class="T2">Серія <?php echo $sert->serial ?>  № <?php echo $sert->num ?>
					від <?php echo $sert->date ?> року</span><span class="T1"> видано державною насіннєвою інспекцією</span><br/>
				<span class="T2">&nbsp; &nbsp; &nbsp; &nbsp; Любарського району Житомирської області&nbsp; &nbsp; &nbsp; &nbsp;</span></p>
			<p class="Standard">Господарська придатність
				_____________________________________________________</p>
			<p class="Standard"><span class="T1">Додаткові відомості про посівні якості:
					</span><span class="T2">насіння оброблено <?php echo $props->obrobka ?> &nbsp; &nbsp; &nbsp; &nbsp; </span></p>
			<p class="Standard">15. Відомості про направлення насіння: партію зазначеного насіння
				направлено (відпущено) залізницею (іншим транспортом) автотранспортом за документов
				№ _______</p>
			<p class="Standard"><span class="T1">На станцію __________ за адресою
					________</span><span class="T2"><?php echo $client->common ?> __ (<?php echo $client->region ?> обл.)</span><span class="T1">__________________</span></p>
			<p class="Standard">&nbsp;</p>
			<p class="P2">ГАРАНТІЯ</p>
			<p class="P3"><?php echo $props->org ?></p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">Гарантує, що:</p>
			<p class="Standard">а) насіння не засмічено іншими сортами, формами або культурами під
				час збирання, обмолоту, приймання, складування, зберігання та відвантажування;</p>
			<p class="Standard">б) до зазначеної партії не домішано насіння того ж сорту, лінії, але
				гіршої партії;</p>
			<p class="Standard">в) насіння хрестоцвітих роду Brassica не засмічено видами та
				різновидностями того ж роду.</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">&nbsp;</p>
			<p class="Standard">М.П. &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Директор <?php echo $props->org ?>
				_______________________<?php echo $props->director ?></p>
		</div>
	</body>
</html>

<?php
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
