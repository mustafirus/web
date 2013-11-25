var subscribe = function()
{
	var inputEmail = $('#subscriberEmail').val();
    var isValid = true;
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test(inputEmail)){
        isValid = false;
        alert('Your email is not in valid format');
    }
    if(isValid){
        var params = {
            'action'    : 'Subscribe',
            'email'     : inputEmail
        };
        $.ajax({
            type: "POST",
            url: "php/mainHandler.php",
            data: params,
            success: function(response){
                if(response){
                    var responseObj = jQuery.parseJSON(response);
                    if(responseObj.ResponseData)
                    {
                        $('#subscribe').val('');
						alert('You will be notified when we launch. Thank you!');
						ClosePopupWindow();
                    }
                }
            }
        });
    }
};