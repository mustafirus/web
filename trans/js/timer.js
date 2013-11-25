jQuery(document).ready(function(){
/********************************/
/*Timer
/********************************/
    /**
    * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
    * according to the GMT+0 Timezone
    **/

    /**
    * The script
    **/
    var message = jQuery('#message');
    var days = jQuery('#days');
    var hours = jQuery('#hours');
    var minutes = jQuery('#minutes');
    var seconds = jQuery('#seconds');
    
    setDate();
    function setDate(){
        var now = new Date();
        if( launch < now ){
            days.html('<strong>0</strong><p>Day</p>');
            hours.html('<strong>0</strong><p>Hour</p>');
            minutes.html('<strong>0</strong><p>Minute</p>');
            seconds.html('<strong>0</strong><p>Second</p>');
            message.html('<p>We are truly sorry for our delay, but our website is coming...</p>');
        }
        else{
            var s = -now.getTimezoneOffset()*60 + (launch.getTime() - now.getTime())/1000;
            var d = Math.floor(s/86400);
            days.html('<strong>'+d+'</strong><p>Day'+(d>1?'s':''),'</p>');
            s -= d*86400;

            var h = Math.floor(s/3600);
            hours.html('<strong>'+h+'</strong><p>Hour'+(h>1?'s':''),'</p>');
            s -= h*3600;

            var m = Math.floor(s/60);
            minutes.html('<strong>'+m+'</strong><p>Minute'+(m>1?'s':''),'</p>');

            s = Math.floor(s-m*60);
            seconds.html('<strong>'+s+'</strong><p>Second'+(s>1?'s':''),'</p>');
            setTimeout(setDate, 1000);

            message.html('');
        }
    } 

	$(window).load(function() {
		$('.loader').fadeOut('slow', function() {
			$(this).remove();
		});
	});
});