var script_v = 1;
var all_id = get_last_id('#all_deposits'),
    my_id = get_last_id('#my_deposits'),
    pays_id = get_last_id('#pays')
    referal_id = get_last_id('#referals');

$('#add_new_pay--off').submit(function(event) {
    event.preventDefault();
    $.when(send_ajax($('#add_new_pay').serialize(), "ajax/new_pay.php")).done(function(data) {
        if(data) {
            alertify.log(data,"success",13000);
            $('#pay_block').hide();
            console.log(data);
            $('#pay_message').html(data).show();
        }
    })
});




function send_ajax(form,url,callback) {
    return $.ajax({
        type:"POST",
        url:url,
        dataType: 'json',
        data:form
    });
}

function get_last_id(parent) {
    id=$(parent).find('tbody').first().find('tr').attr('countdown_time');
    if(typeof id!=="undefined") {
        return id;
    } else {
        return 1;
    }
}


function get_server_event() {
    $.when(send_ajax('all='+all_id+'&my='+my_id+'&pays='+pays_id+'&referal='+referal_id,'/ajax/my_events')).done(function(data) {
        if(data.pays.all_deposits.length) {
            pays_add_to_table('#all_deposits',data.pays.all_deposits,'Активирован новый депозит, выплата через 150 часов',false);
            all_id=get_last_id('#all_deposits');
        }

        if(data.pays.my_deposits.length) {
            pays_add_to_table('#my_deposits',data.pays.all_deposits,'Мы получили от вас платеж, загляните в "Мои депозиты"',true);
            my_id=get_last_id('#my_deposits');
        }

        if(data.pays.pays.length) {
            pays_add_to_table('#pays',data.pays.pays,'Произведена выплата',false);
            pays_id=get_last_id('#pays');
        }

        if(data.pays.my_referals.length) {
            pays_add_to_table('#referals',data.pays.my_referals,'У вас появился проплаченный реферал!',true);
            referal_id=get_last_id('#referals');
        }

        if(typeof data.count!=="undefined") {
            all=$('#count_all');
            all_o=parseFloat(all.html());

            if(all_o!=data.count.all)
                all.html(data.count.all)
            my = $('#count_my');
            my_o = parseFloat(my.html());

            if(my_o!=data.count.my)
                my.html(data.count.my)
            pays=$('#count_pays');
            pays_o=parseFloat(pays.html());

            if(pays_o!=data.count.pays)
                pays.html(data.count.pays)
            r_all=$('#all_refs');
            r_all_o=parseFloat(r_all.html());

            if(r_all_o!=data.count.referals.all)
                r_all.html(data.count.referals.all)
            r_pay=$('#pay_refs');
            r_pay_o=parseFloat(r_pay.html());

            if(r_pay_o!=data.count.referals.payed)
                r_pay.html(data.count.referals.payed)
        }
    })
}

function new_pay() {
    $('#pay_block').show('fast');
    $('#pay_message').hide('fast');
}

function pays_add_to_table(k,v,msg,sound) {
    res='';
    node=$(k).find('tbody');
    $(v).each(function(key,val) {
        obj=node.find('#'+ val.id);
        if(!obj.length) {
            res='<tr class="dn" id ="'+val.id+'" pay_out="'+val.pay_out_clear+'" countdown_time="'+val.countdown_time+'">'+'<td>'+val.date+'</td>'+'<td>QIWI</td>'+'<td>'+val.phone+'</td>'+'<td>'+val.pay_in+'</td>'+'<td class="countdown">'+val.status+'</td>'+'<td>'+val.pay_out+'</td>'+'</tr>'+ res;
        }
    });

    if(res.length) {
        if(node.find('tr').length>0) {
            console.log('2');
            node.find('tr').first().before(res);
        } else {
            node.html(res);
            console.log('3')
        }
        countdown('.countdown');node.find('.dn').show(1500);if(sound)
        play_sound();
        alertify.log(msg,"",7000);
    }
}

function show() {
    /*$.ajax({
        url: "ajax/is_login.php",
        cache: false,
        success: function(html){
            $("#pay_message").html(html);
        }
    });*/
}



(function () {
    $("#auth_form").submit(function () {
        var $form = $(this);
        $.ajax({
            type: "post",
            url: '/ajax/auth_user.php',
            data: $form.serialize(),
            success: function (data) {
                if (!data.error) {
                    $("#auth_error")
                        .css("color", "blue")
                        .css("font-weight", "bold")
                        .text(data.message);
                    window.setTimeout(function () {
                        window.location.reload();
                    }, 1000);
                } else if (data.error && data.message) {
                    $("#auth_error")
                        .css("color", "red")
                        .css("font-weight", "bold")
                        .text(data.message);
                } else {
                    $("#auth_error")
                        .css("color", "red")
                        .css("font-weight", "bold")
                        .text("Ошибка ответа сервера!");
                }
            },
            error: function () {
                window.alert("Ошибка запроса!");
            },
        });
        return false;
    });
})();
