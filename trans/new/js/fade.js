(function($){
            var $window = $(window);
            $window.scroll(function(){
                if ($window.scrollTop() >= 260) {
                    $('#intro').fadeOut();
                }
                else {
                    $('#intro').fadeIn();
                }
            });
            }(jQuery));