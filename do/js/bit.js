var _get = false;
var timer;

function get(vv){

var w = $("#_w").val();
var val = $("#_v").val();

if(val){

$.ajax({
	url: '/resource/_get.php',
	method: 'POST',
	data: {w: w,v: val}
})
.done(function(text) {
if(text != 0){
	
	$('#res2').html('');
	$('#res2').html(text);

	_get = false;
	clearTimeout(timer); 

}

if(_get){
timer = setTimeout(function() {get(vv);}, 5000);
}
});
}

}

function show_bit(plan){
$.arcticmodal({

 
    afterClose: function(data, el) {
        _get = false;
		clearTimeout(timer); 
    },
	closeOnOverlayClick:true,
    type: 'ajax',
    url: '/resource/bit.php?get=show&plan='+plan,
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
        success: function(data, el, responce) {
             var h = $('<div class="box-modal">' +
                    
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});

}

function seach(){
var address = $("#address").val();

if(address){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/seach.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"address="+address,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}

}

function _reflink(){
var reflink = $("#reflink").val();

if(reflink){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/reflink.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"reflink="+reflink,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}

}

function _refinfo(_in){
if(_in){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/refinfo.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"ref="+_in,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}
}


function _top(w){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/top.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"top="+w,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}



function _banners(w){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/banners.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"top="+w,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}

function _support(address = 0){
$.arcticmodal({
    type: 'ajax',
    url: '/resource/support.php',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"w="+address,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}

function _reviews(){
$.arcticmodal({
    type: 'ajax',
    url: '/?page=reviews',
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
		data:"w="+address,
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '<div class="box-modal_close arcticmodal-close">X</div>' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}

 function _select(s,wallet,plan){
		if(s > 0){
		$(".modal-body").empty();
		$(".modal-body").html("<h3>Loading...</h3>");
		$.getJSON("/resource/bit.php?get=select", { select: s,wallet:wallet,plan:plan }, function(json) {
		if(json.text){
		$(".modal-body").empty();
		$(".modal-body").html(json.text);

		_get = true;
		timer = setTimeout(function() {get(s);}, 5000);
		}
        });
		}else{
		alert("error");
		}
		}


	function _news(n = 1){
    $.arcticmodal({
    type: 'ajax',
    url: '/resource/news.php?news='+n,
    ajax: {
        type: 'POST',
        cache: false,
        dataType: 'json',
        success: function(data, el, responce) {
            var h = $('<div class="box-modal">' +
                    '' +
                    '<p><b /></p><p />' +
                    '</div>');
            $('B', h).html(responce.title);
            $('P:last', h).html(responce.text);
            data.body.html(h);
        }
    }
});
}





new ClipboardJS('.copy').on('success', function(e) {
    notes('Copied!');
    
});


function notes(t){
		noty({animateOpen: {opacity: "show"}, animateClose: {opacity: "hide"}, layout: "topRight", text: t, type: "success", textAlign: "left"});

	}




