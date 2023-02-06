$(function() {
    "use strict";
    $(function() {
      $(".preloader").fadeOut();
    });
    jQuery(document).on('click', '.mega-dropdown', function(e) {
      e.stopPropagation()
    });
    var set = function() {
      var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
      var topOffset = 70;
      if (width < 1170) {
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();
        $(".sidebartoggler i").addClass("ti-menu");
      } else {
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();
        $(".sidebartoggler i").removeClass("ti-menu");
      }
      var height = ((window.innerHeight > 0) ? window.innerHeight : this.screen.height) - 1;
      height = height - topOffset;
      if (height < 1) height = 1;
      if (height > topOffset) {
        $(".page-wrapper").css("min-height", (height) + "px");
      }
    };
    $(window).ready(set);
    $(window).on("resize", set);
    $(".sidebartoggler").on('click', function() {
      if ($("body").hasClass("mini-sidebar")) {
        $("body").trigger("resize");
        $("body").removeClass("mini-sidebar");
        $('.navbar-brand span').show();
        $(".sidebartoggler i").addClass("ti-menu");
      } else {
        $("body").trigger("resize");
        $("body").addClass("mini-sidebar");
        $('.navbar-brand span').hide();
        $(".sidebartoggler i").removeClass("ti-menu");
      }
    });
    $(".fix-header .topbar").stick_in_parent({});
    $(".nav-toggler").click(function() {
      $("body").toggleClass("show-sidebar");
      $(".nav-toggler i").toggleClass("ti-menu");
      $(".nav-toggler i").addClass("ti-close");
    });
    $(".right-side-toggle").click(function() {
      $(".right-sidebar").slideDown(50);
      $(".right-sidebar").toggleClass("shw-rside");
    });
    $(function() {
      var url = window.location;
      var element = $('ul#sidebarnav a').filter(function() {
        return this.href == url;
      }).addClass('active').parent().addClass('active');
      while (true) {
        if (element.is('li')) {
          element = element.parent().addClass('in').parent().addClass('active');
        } else {
          break;
        }
      }
    });
    $('ul#sidebarnav a').on('click', function() {
      $('ul#sidebarnav a').removeClass('active').parent().removeClass('active');
      $(this).addClass('active').parent().addClass('active');
      $('body').removeClass('show-sidebar');
      $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(function() {
      $('[data-toggle="tooltip"]').tooltip()
    })
    $(function() {
      $('[data-toggle="popover"]').popover()
    })
    $(function() {
      $('#sidebarnav').metisMenu();
    });
    $('.aboutscroll').slimScroll({
      position: 'right',
      size: "5px",
      height: '80',
      color: '#dcdcdc'
    });
    $('.message-scroll').slimScroll({
      position: 'right',
      size: "5px",
      height: '570',
      color: '#dcdcdc'
    });
    $('.chat-box').slimScroll({
      position: 'right',
      size: "5px",
      height: '470',
      color: '#dcdcdc'
    });
    $('.slimscrollright').slimScroll({
      height: '100%',
      position: 'right',
      size: "5px",
      color: '#dcdcdc'
    });
    $("body").trigger("resize");
    $(".list-task li label").click(function() {
      $(this).toggleClass("task-done");
    });
    $('#to-recover').on("click", function() {
      $("#loginform").slideUp();
      $("#recoverform").fadeIn();
    });
    $(document).on("click", ".card-actions a", function(e) {
      if (e.preventDefault(), $(this).hasClass("btn-close")) $(this).parent().parent().parent().fadeOut();
    });
    (function($, window, document) {
      var panelSelector = '[data-perform="card-collapse"]';
      $(panelSelector).each(function() {
        var $this = $(this),
          parent = $this.closest('.card'),
          wrapper = parent.find('.card-block'),
          collapseOpts = {
            toggle: false
          };
        if (!wrapper.length) {
          wrapper = parent.children('.card-heading').nextAll().wrapAll('<div/>').parent().addClass('card-block');
          collapseOpts = {};
        }
        wrapper.collapse(collapseOpts).on('hide.bs.collapse', function() {
          $this.children('i').removeClass('ti-minus').addClass('ti-plus');
        }).on('show.bs.collapse', function() {
          $this.children('i').removeClass('ti-plus').addClass('ti-minus');
        });
      });
      $(document).on('click', panelSelector, function(e) {
        e.preventDefault();
        var parent = $(this).closest('.card');
        var wrapper = parent.find('.card-block');
        wrapper.collapse('toggle');
      });
    }(jQuery, window, document));
  });