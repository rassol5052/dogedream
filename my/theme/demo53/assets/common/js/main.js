"use strict";

function timeConverter(timestamp) {
  var u = moment(timestamp * 1000).tz('Europe/Moscow');
  return u.format('YYYY-MM-DD HH:mm:ss');
}

function number_formatter(n) {
  var parts = n.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

function initChangellyPlugin(symbol, address) {
  if ($('#wrapperChangellyPlugin').length > 0) {
    var changellyUrl = 'https://old.changelly.com/widget/v1?auth=email&from=ETH&to=' + symbol + '&merchant_id=&address=' + address + '&amount=1&color=00cf70';
    $('#wrapperChangellyPlugin').html('<link rel="stylesheet" href="https://old.changelly.com/widget.css"\/><a id="changellyButton" href="' + changellyUrl +
      '" target="_blank"><img src="https://old.changelly.com/pay_button.png" \/><\/a><div id="changellyModal" style="z-index:9999999"><div class="changellyModal-content"><span class="changellyModal-close">x<\/span><iframe src="' +
      changellyUrl +
      '" width="600" height="500" class="changelly" scrolling="no" style="overflow-y:hidden; border: none" > Can\'t load widget <\/iframe><\/div><script type="text/javascript"> var changellyModal = document.getElementById(\'changellyModal\'); var changellyButton = document.getElementById(\'changellyButton\'); var changellyCloseButton = document.getElementsByClassName(\'changellyModal-close\')[0]; changellyCloseButton.onclick = function() { changellyModal.style.display = \'none\'; }; changellyButton.onclick = function widgetClick(e) { e.preventDefault(); changellyModal.style.display = \'block\'; }; <\/script><\/div>'
    );
  }
}
var generatingDepositAddress = false;

function switchDepositCurrency(symbol) {
  $('#cardDepositAddress').removeClass('hide');
  $('#cardDepositGateway').addClass('hide');
  if (generatingDepositAddress) {
    toastr.warning('We\'re generating a new deposit address for you, please switch to other currency later.', 'WARNING', {
      closeButton: true,
      progressBar: true,
      timeOut: 3000
    });
    return false;
  }
  generatingDepositAddress = true;
  $('.slim-currencies a').removeClass('active');
  var ele = $('.slim-currencies a[data-currency-symbol="' + symbol + '"]');
  ele.addClass('active');
  var currencyDetail = ele.attr('data-currency-detail');
  currencyDetail = JSON.parse(currencyDetail);
  var cardDepositAddress = $('#cardDepositAddress');
  if (currencyDetail.symbol) {
    cardDepositAddress.find('.deposit-currency-symbol').text(currencyDetail.symbol);
  }
  if (currencyDetail.name) {
    cardDepositAddress.find('.deposit-currency-name').text(currencyDetail.name);
  }
  if (currencyDetail.confirms) {
    cardDepositAddress.find('.deposit-currency-confirms').text(currencyDetail.confirms);
  }
  if (currencyDetail.min_deposit) {
    cardDepositAddress.find('.deposit-currency-min-deposit').text(currencyDetail.min_deposit);
  }
  if (currencyDetail.exchange_rate) {
    cardDepositAddress.find('.deposit-currency-exchange-rate').text(currencyDetail.exchange_rate);
  }
  if (currencyDetail.symbol != coin.symbol) {
    cardDepositAddress.find('#fiatMinDeposit').removeClass('hide');
    cardDepositAddress.find('#alertExchangeRate').removeClass('hide');
  } else {
    cardDepositAddress.find('#fiatMinDeposit').addClass('hide');
    cardDepositAddress.find('#alertExchangeRate').addClass('hide');
  }
  cardDepositAddress.find('#depositAddress').text('Generating...');
  cardDepositAddress.find('#wrapperDestinationTag').addClass('hide');
  $.ajax({
    type: 'POST',
    url: cardDepositAddress.attr('data-action'),
    data: {
      currency: symbol
    },
    success: function(result) {
      if (result && result.status) {
        QRCode.toCanvas(document.getElementById('canvasDepositAddressQrcode'), result.data.address_uri, {
          version: 9
        }, function(error) {
          if (error) console.error(error);
        });
        cardDepositAddress.find('#depositAddress').text(result.data.address).attr('data-clipboard-text', result.data.address);
        if (result.data.destination_tag) {
          cardDepositAddress.find('#destinationTag').text(result.data.destination_tag).attr('data-clipboard-text', result.data.destination_tag);
          cardDepositAddress.find('#wrapperDestinationTag .deposit-currency-destination-tag-name').text(result.data.destination_tag_name);
          cardDepositAddress.find('#wrapperDestinationTag').removeClass('hide');
        }
        initChangellyPlugin(symbol, result.data.address);
        return true;
      } else {
        toastr.error(result && result.message ? result.message : 'Failed to get the deposit address, please try again later.', 'ERROR', {
          closeButton: true,
          progressBar: true,
          timeOut: 3000
        });
        return false;
      }
    },
    error: function() {
      toastr.error('Failed to get the deposit address, please try again later.', 'ERROR', {
        closeButton: true,
        progressBar: true,
        timeOut: 3000
      });
      return false;
    },
    complete: function() {
      generatingDepositAddress = false;
    }
  });
}

function switchDepositGateway(symbol) {
  $('#cardDepositAddress').addClass('hide');
  $('#cardDepositGateway').removeClass('hide');
  $('.slim-currencies a').removeClass('active');
  var ele = $('.slim-currencies a[data-currency-symbol="' + symbol + '"]');
  ele.addClass('active');
  var currencyDetail = ele.attr('data-currency-detail');
  currencyDetail = JSON.parse(currencyDetail);
  var cardDepositGateway = $('#cardDepositGateway');
  if (currencyDetail.min_deposit) {
    cardDepositGateway.find('.deposit-gateway-min-deposit').text(currencyDetail.min_deposit);
    cardDepositGateway.find('input[name="amount"]').attr('min', currencyDetail.min_deposit);
  }
  if (currencyDetail.exchange_rate) {
    cardDepositGateway.find('.deposit-gateway-exchange-rate').text(currencyDetail.exchange_rate);
  }
  cardDepositGateway.find('input[name="gateway"]').val(symbol);
}
$(function() {
  "use strict";
  $.ajaxSetup({
    timeout: 10000
  });

  function serverTime() {
    if ($('#serverTime')) {
      var serverTime = $('#serverTime').data('server-time');
      setInterval(function() {
        serverTime++;
        $('#serverTime').text(timeConverter(serverTime));
      }, 1000);
    }
  }
  serverTime();

  $("#formLogin").bind('submit', function (e) {
    e.preventDefault();
    jQuery.ajax({
      url: "/site/user/customLoginAjax",
      type: "POST",
      data: $(this).serialize(),
      async: true,
      dataType: "html",
      beforeSend: function () {
        $("label[for=inputGroupWalletAddress]").css({color: "#000"});
        $("label[for=inputGroupWalletAddress]").html('');
        $("#formLogin button[type=submit]").attr('disabled', 'disabled');
      },
      complete: function () {
        $("#formLogin button[type=submit]").removeAttr('disabled');
      },
      success: function (e) {
        e = JSON.parse(e);

        if (typeof e !== "undefined" && e.status !== void 0) {
          if (e.status) {
            window.location = '/site/cabinet/index';
          } else {
            $("label[for=inputGroupWalletAddress]").css({color: "#e74c3c"});
            if (e.messages !== void 0 && e.messages.length > 0) {
              $.each(e.messages, function (index, value) {
                if (index == 0) {
                  $("label[for=inputGroupWalletAddress]").html(value);
                } else {
                  $("label[for=inputGroupWalletAddress]").html(
                    $("label[for=inputGroupWalletAddress]").html() + '<br>' + value
                  );
                }
              });
            }
          }
        } else {
          $("label[for=inputGroupWalletAddress]").css({color: "#e74c3c"});
          $("label[for=inputGroupWalletAddress]").html('Network error.');
        }
      },
      error: function () {
        $("label[for=inputGroupWalletAddress]").css({color: "#e74c3c"});
        $("label[for=inputGroupWalletAddress]").html('Network error.');
      },
    });
  });
});