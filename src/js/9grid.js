window._9grid = {};
$(function(){	
    $('.nav_menu .menu_item,.div_tool .tool_btn').each(function(){
    	$(this).mouseover(function(){
    		$(this).addClass('focusin');
    	}).mouseout(function(){
    		$(this).removeClass('focusin');
    	}).focus(function(){
    		$(this).addClass('focusin');
    	}).blur(function(){
    		$(this).removeClass('focusin');
    	});        
    });

    $('.content_item_focus').removeClass('content_item_focus');
    var menu_item = location.hash;
    if(menu_item !=null && menu_item !=''){
        menu_item = menu_item.replace('#','');
    }else{
        menu_item = 'content_canvas';
    }
    $('#'+menu_item).addClass('content_item_focus');
    $('.nav_menu .menu_item[href*="'+menu_item+'"]').addClass('selected');
    $('.nav_default').height($('.wrapper').height());
    init_pwd(function(){
        init(menu_item);    
    });    

    function init(menu_item) {
        switch(menu_item){
            case 'content_canvas':
                _9grid.init_canvas();
                $('#nav_top_txt').html('Generate');
                break;
            case 'content_my':
                $('#nav_top_txt').html('My');
                _9grid.init_my();
                break;
            case 'content_lib':
                $('#nav_top_txt').html('Library');
                _9grid.init_lib();
                break;
            case 'content_setting':
                $('#nav_top_txt').html('Preferences');
                _9grid.init_setting();
                break;
            default:               
        }   
         
    }
    $('#nav_btn').click(function(){
        $('.wrapper').toggleClass('mini_navbar');
    });
    $(window).bind('load resize',function(){
        if($('.wrapper').width() <768 ){
            $('.wrapper').addClass('mini_navbar');
        }else{
            $('.wrapper').removeClass('mini_navbar');
        }
    });

    function set_pwd(call_back){
        $('#set_pwd').show();
        $('#bt_pwd_ok').on('click', function(){
            var value = $('#text_pwd').val();
			var value2 = $('#text_pwd2').val();
            if(value !=''){
				if(value == value2){
					window.localStorage.setItem('passwordxx',value);
					$('#set_pwd').hide();
					call_back();
				}else{
					alert('two input are not same!')
				}
			}else{
                alert('password can not null!');
            }
        });
    }

    function valid_pwd(pwd, call_back){
        $('#valid_pwd').show();
        $('#bt_valid_pwd').on('click', function(){
            var value = $('#text_valid_pwd').val();
            if(value!=''){
                if(value == pwd){
                    $('#valid_pwd').hide();
                    call_back();
                }else{
                    alert('password is error!');
                }
            }else{
                alert('password can not null!');
            }
        });
    }

    function init_pwd(call_back){
        var pwd = window.localStorage.getItem('passwordxx');
        if(pwd ==null || pwd ==''){
            set_pwd(call_back);
        }else{
            valid_pwd(pwd, call_back);
        }
    }
})
