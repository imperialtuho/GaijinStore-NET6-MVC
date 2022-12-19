// OBSOLETE!!! This file is no longer supported and must be remove.
// Only bugfixes and fallbacks.

var screenTitleText, screenOrder,
    popupScreen, popupInner,
    screensButton, screenLink,
    screenTitle, screensCount,
    popupImg, popupImgWidth, popupImgHeight,
    screenWidth, screenHeight, storeTitle,
    linkSliderPosition, linkSliderAnimate,
    elementCount, elementWidth, linkSliderBody;

var LEGACY_CSS_CLASSES = {
  isHidden: 'is-hidden',
  isVisible: 'is-visible',
};

var hover = [];
var overTimers = [];

$('document').ready(function()
{
  popupScreen = $('.js-popup-screens');
  popupInner = $('.js-popup-inner');
  screensButton = $('.js-screens-button ');
  screenLink = $('.js-screens-link');
  screenTitle = $('.js-popup-title');
  screensCount = getScreensCount();
  popupImg = $('.js-popup-img');
  screenWidth = $( window ).width();
  screenHeight = $( window ).height();
  storeTitle = $('.gaijin-title');

  storeTitle.text(storeTitle.text().substr(1));

  linkSliderPosition = 0;
  linkSliderAnimate = false;
  elementCount = $('#js-link-slider .screens__link').length;
  elementWidth = $('#js-link-slider .screens__link').width() + 17;
  linkSliderBody = $('#js-link-slider .js-screens-list');

  showLinkSliderArrow();

  function moveLinkSlider()
  {
    var curLeft = linkSliderPosition * -elementWidth;
    linkSliderBody.animate({left: curLeft}, 200, function(){
      linkSliderAnimate = false;
      showLinkSliderArrow();
    });
    linkSliderAnimate = true;
  }

  function showLinkSliderArrow()
  {
    var bBack = $('#js-link-slider .button-back');
    var bForward = $('#js-link-slider .button-forward');

    bBack.css('display', 'none');
    bForward.css('display', 'none');

    if (elementCount > 4)
    {
      if (linkSliderPosition > 0)
        bBack.css('display', 'block');
      else
        bBack.css('display', 'none');

      if (linkSliderPosition == elementCount - 4)
        bForward.css('display', 'none');
      else
        bForward.css('display', 'block');
    }
  }

  $('#js-link-slider .buttons').on('click', function ()
  {
    if (elementCount < 5)
      return false;

    if ($(this).hasClass("button-forward"))
    {
      if (!linkSliderAnimate && linkSliderPosition < (elementCount - 4))
      {
        linkSliderPosition++;
        moveLinkSlider();
      }
    }

    if ($(this).hasClass("button-back"))
    {
      if (!linkSliderAnimate && linkSliderPosition > 0)
      {
        linkSliderPosition--;
        moveLinkSlider();
      }
    }
    return false;
  });

  $('.js-filter-search').on('focus', function ()
  {
    $(this).parent().addClass('filter-search__wrapper--blue');
    $(this).attr('placeholder','');
  });

  $('.js-filter-search').on('blur', function ()
  {
    $(this).parent().removeClass('filter-search__wrapper--blue');
  });

  $('.js-shop__time-value, .js-plank__time-value').each(function(i, elem){
    var tillTimeString = $(elem).text().replace(" ", "T") + "+03:00";
    var tillTime = Date.parse(tillTimeString);
    var nowTime = Date.now();

    var remaining = tillTime - nowTime;
    var remText = '';

    if (remaining && remaining > 0)
    {
      remaining /= 1000;
      var remSecs = parseInt(remaining);
      remaining /= 60;
      var remMins = parseInt(remaining);
      remaining /= 60;
      var remHours = parseInt(remaining);
      remaining /= 24;
      var remDays = parseInt(remaining);

      if (remDays) {
        remText = remDays + ' ' + discountLocale.days;
        remText += (' ' + (remHours - 24*parseInt(remHours/24)) + ' ' + discountLocale.hours);
      }
      else if (remHours)
        remText = remHours + ' ' + discountLocale.hours;
      else if (remMins)
        remText = remMins + ' ' + discountLocale.mins;
      else if (remSecs)
        remText = remSecs + ' ' + discountLocale.secs;
    }

    $(elem).text(remText).show();
  });

  if ($('.shop-title').length)
  {
    $('.shop-title:first').append($('.js-search'));
    $('.js-search').show();
  }
  else if ($('.filter.row').length)
  {
    $('.js-search').show();
  }

  $('.js-shop-title')
    .on("mouseover", function(event) {
      if(event.target === this)
        $(this).addClass('hover');
    })
    .on("mouseleave", function(){
      $(this).removeClass('hover');
    });

  $('.js-search')
    .on("mouseover", function(){
      $(this).parent().removeClass('hover');
    });

  $('.shop__item-link').click(function() {
    var url = $(this).find('a').attr("href");

    if (typeof(url) !== "undefined") {
      window.location.href = url;
    }
  });

  $('.select_countries').click(function(e){
    var submenu = $(this).find('.cont');
    //var submenu = $(this).find('.select_countries-submenu').eq(0);
    var isVis = $(submenu).is(":visible");

    //$('.select_countries-submenu').hide();
    //$(this).removeClass('opened');

    if (isVis)
      $(submenu).hide();
    else
    {
      $(this).addClass('opened');
      $(submenu).show();
      overCheck("select_countries", $('.select_countries'),
        submenu);
    }
  });


  var cookieBox = $('.cookieBox'),
      cookieWt = $.cookie('ok_c');

  if ((cookieWt !== '1') || (cookieWt === 'undefined')) {
    cookieBox.css({'display': 'flex'});
  }

  $('.cookieBox__btn, .cookieBox__closeBtn').on('click', function () {
    $.cookie('ok_c', 1, {expires: 1000000});
    cookieBox.fadeOut('middle');
  });


  $('.prime-question > ul#list > li').click(function (event) {
    var cur = $(this).children("div");

    $('.prime-question > ul#list > li > div').each(function(i,elem) {
      if (cur.attr('id') != $(this).attr('id') && $(this).is(':visible')) {
        $(this).slideToggle();
      }
    });

    cur.slideToggle();
    event.stopPropagation();
  });

});

function overCheck(id, h, sub)
{
  hover[id] = true;
  h.mouseover(function() {
    hover[id] = true;
    clearTimeout(overTimers[id]);
    overTimers[id] = undefined;
  });

  h.mouseout(function() {
    hover[id] = false;
    if (!overTimers[id]>0) overTimers[id] = setTimeout(function() {overClose(id, sub)}, 2000);
  });
}

function overClose(id, sub)
{
  if (hover[id] == false)
  {
    sub.hide();
    $('.'+id).removeClass('opened');
  }
  clearTimeout(overTimers[id]);
  overTimers[id] = undefined;
}

function setCookie(name, value, options)
{
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

/* smodal */
function showSmodal(header, body, w, close)
{
  if (typeof(close) == "undefined")
    close = true;

  $(".js-smodal-title").html(header);
  $(".js-smodal-body").html(body);

  $('#simplemodal-container').css('height', 'auto');
  document.getElementById( 'smodal' ).classList.add( LEGACY_CSS_CLASSES.isVisible );
}

/* Popup */
function showPopup(){
  //$('.js-popup').fadeIn();

  document.getElementById( 'rmodal' ).classList.add( LEGACY_CSS_CLASSES.isVisible );
  //$('html').css('overflow', 'hidden');
}

function getScreensCount(){
  return screenLink.length;
}

function getSrc(obj){
  var src = obj.attr('href');
  return src;
}

function getTitle(obj){
  var src = obj.attr('title');
  return src;
}

function setScreentTitle()
{
  screenTitle.html(screenTitleText);
}

function popupAdaptating(){
  popupImgWidth = popupImg.width();
  popupImgHeight = popupImg.height();

  resizeImg(popupImgWidth, popupImgHeight);
}

// If the width or height of the image greater than the width of the screen - 100 pixels, then reduce the image by 20%
function resizeImg(imgWidth, imgHeight)
{
  if ((imgHeight > screenHeight - 100) || (imgWidth > screenWidth - 200))
  {
    var orientation = findOrientation(imgHeight, imgWidth);

    if (orientation == 'album')
    {
      imgWidth = (screenWidth - 200) * 0.8;
      popupImg.css({'width':'100%', 'height':'auto','bacground-size':'contain'});

      centerHorizontal(imgWidth);
      centerVertical();
    }
    else
    {
      imgHeight = (screenHeight - 100) * 0.8;
      popupImg.css({'width':'auto', 'height':'100%','bacground-size':'contain'});

      centerHorizontal(imgWidth, true);
      centerVertical();
    }
  }
  else
  {
    centerHorizontal(imgWidth);
    centerVertical();
  }
}

function findOrientation(height, width)
{
  if (height> width)
    return 'book';
  else
    return 'album';
}

function centerHorizontal(value, book)
{
  if (book)
    popupInner.css({'margin-left': -value/2, 'width': 'auto'})
  else
    popupInner.css({'margin-left': -value/2, 'width': value})
}

function centerVertical(height)
{
  popupInner.css({'margin-top': (screenHeight - popupInner.height()) / 2});

  if (height)
    popupInner.css({'height': height})
}

function getOrder(obj)
{
  return obj.index();
}

function hideSomthn(obj)
{
  obj.fadeOut();
  // $('html').css('overflow', 'auto');
}

function hidePopup()
{
  //$('.js-popup').fadeOut();
  document.getElementById( 'rmodal' ).classList.remove( LEGACY_CSS_CLASSES.isVisible );
  //$('html').css('overflow', 'auto');
}

function changeImg(src)
{
  popupImg.attr('src',src);
  popupImg.on('load', function() {
      popupAdaptating();
      setScreentTitle();
  });
}

function findNewImg(order)
{
  var src = screenLink.eq(order).attr('href');
  screenTitleText = screenLink.eq(order).attr('title');
  return src;
}

/* User purchase */
function showPurch(type, project)
{
  $('#PURCH_' + type + '_c').html('<div class="loader loader_active"></div>');

  var url = "/user.php?view=purch_type&type=" + type + "&rand=" + Math.random();
  if (typeof project != "undefined")
    url += ("&project="+project);

  $.ajax({
    type: "GET",
    url: url,
    success: function(data)
    {
      $( '#PURCH_' + type + '_c' ).remove();
      $( '#PURCH_' + type + '_link' ).html(data);
      window.popups.refresh();
    }
  });
}

/* common.js */
function onQiwiKeyUp(edit)
{
  var enable =
    edit.form.country.value.match(/^[0-9]{1,3}$/) &&
    edit.form.phone.value.match(/^[0-9]{7,14}$/);

  $(document).trigger("validNumber", [Boolean(enable)]);

  if (enable)
    edit.form.qiwi_submit.removeAttribute("disabled");
  else
    edit.form.qiwi_submit.setAttribute("disabled", 1);
}

function payWm(external)
{
  var wmForm = external ?
    window.opener.document.getElementById("ShopFormWm") :
    document.getElementById("ShopFormWm");

  if (parseFloat(wmForm.Sum.value) >= 1.0 && parseInt(wmForm.WMItemID.value) >= 0)
    wmForm.submit();
}

function showPayWind(payUrl, windTitle, paySystem, pay_height, pay_width)
{
  if (!pay_height)
    pay_height = 610;
  if (!pay_width)
    pay_width = 810;

  if (payUrl)
  {
    switch (paySystem)
    {
      case 'xsolla':
        var validOf = 'https://secure.gaijin.net/paystation2/';
        break;

      default:
        var validOf = 'http';
        break;
    }

    var validUrl = payUrl.indexOf(validOf);

    if (validUrl !== 0)
      return false;
  }
  else
  {
    payUrl = '';
  }

  screenTitleText = windTitle;

  $('#pay-frame').remove();

  $('<iframe />')
    .attr({
      id : 'pay-frame',
      name : 'pay-frame',
      frameborder : 'no',
      src : payUrl
    })
    .css({
        width: pay_width,
        height: pay_height
    })
    .prependTo('#rmodal .popup__body');

  setScreentTitle();
  showPopup();

  centerHorizontal(pay_width);
  centerVertical(pay_height + 71);
}

function showRowDetail(path)
{
  window.location.href = path;
}

function loadPayWind(payUrl, info0, info1, info3, info4, info5)
{
  if (!info3)
  {
    window.location.href = info0;
    return;
  }

  $.ajax({
    url: payUrl,
    data: {getFrameUrl: 1},
    dataType: "json",
    success: function(resp)
    {
      if (resp.xs_token)
      {
        var options = {
          access_token: resp.xs_token,
          host: 'secure.gaijin.net',
          lightbox: {
            contentBackground: "rgba(0,0,0, 0.1)",
            height: "640px"
          }
        };

        var s = document.createElement('script');
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://static.xsolla.com/embed/paystation/1.0.6/widget.min.js";
        s.addEventListener('load', function (e) {
          XPayStationWidget.init(options);
          XPayStationWidget.open();
        }, false);
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(s);

        // require.js compatibility hack
        (function(document, navigator){
          var requirejs,require,define;
          function scripts() {
            return self.document.getElementsByTagName('script');
          }
          this.requirejs = this.require = require;
          this.define = define;
        }.call( parent.window, parent.document, parent.navigator ));
      }
      else if (resp.url)
      {
        showPayWind(resp.url, info1, '', (info5 ? info5 : 675), (info4 ? info4 : 670));
      }
      else {
        window.location.href = info0;
      }
    },
    error: function()
    {
      window.location.href = info0;
    }
  });
}

function paymentFrameListener(event)
{
  if (event.origin == 'https://gaijin.platbox.com')
  {
    var data = JSON.parse(event.data);
    if (data)
    {
      if (data.status == 'successful' || data.status == 'paySuccess' || data.action == 'paySuccess')
        window.location = 'https://store.gaijin.net/success_payment.php';
    }
  }
}

window.addEventListener("message", paymentFrameListener);

/* Voting */
var mnmString = new Array ();
var mnmPrevColor = new Array ();

function menealo (user, id, htmlid, md5, value)
{
  var target1 = document.getElementById('mnms-' + htmlid);
  mnmPrevColor[htmlid] = target1.style.backgroundColor;

  if (user == '0')
    window.location="/login.php?return="+location.href;
  else
  {
    $.ajax({
      type: "POST",
      url: "/menealo.php",
      data: {
        "id": id,
        "user": user,
        "md5": md5,
        "value": value
      },
      success: function(data)
      {
        errormatch = new RegExp("^ERROR:");
        mnmString[htmlid] = data;
        if (mnmString[htmlid].match(errormatch))
          mnmString[htmlid] = mnmString[htmlid].substring(6, mnmString[htmlid].length);
        var mySplitResult = mnmString[htmlid].split('~');
        target3 = document.getElementById ('mnmlink-' + htmlid);
        target3.style.width = mySplitResult[0] + 'px';
        target4 = document.getElementById ('mnma-' + htmlid);
        target4.innerHTML = mySplitResult[1];
        target5 = document.getElementById ('mnmb-' + htmlid);
        target5.innerHTML = mySplitResult[2];
        target7 = document.getElementById ('mnms-' + htmlid);
        target7.className = 'star-rating-noh';
      }
    });
  }
}

function getUrlParameter(sParam)
{
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

  for (i = 0; i < sURLVariables.length; i++)
  {
    sParameterName = sURLVariables[i].split('=');

    if (sParameterName[0] === sParam)
      return sParameterName[1] === undefined ? true : sParameterName[1];
  }
};

// as soon as the image uploaded
document.addEventListener("DOMContentLoaded", function()
{
  // Button "Top"
  var top_show = 200; // position of the scroll bar to display the "Top"
  var delay = 1000; // scroll delay

  function proverka()
  {
    if ($(this).scrollTop() > top_show)
      $('.js-to-top').fadeIn();
    else
      $('.js-to-top').fadeOut();
  }

  proverka();

  $(window).scroll(function ()
  {
    // Scroll callback
    // Depending on the position of the scroll bar, and the top_show value, hide or show the "Top"
    proverka();
  });

  $('.js-to-top').click(function ()
  {
    // Clicking on the "Top" callback
    // Smooth scrolling upward

    $('body, html').animate({
      scrollTop: 0
    }, delay);
  });

  // Shop
  var shopItem = $('.js-shop-item');
  var shopCache = [];

  function toLeft(more){
      more.removeClass('shop__more--last');
      more.addClass('shop__more--first')
  }

  function toRight(more){
      more.removeClass('shop__more--first');
      more.addClass('shop__more--last')
  }

  function toMiddle(more){
      more.removeClass('shop__more--first');
      more.removeClass('shop__more--last');
  }

  function showItemDescriprion(item, response, loadCb)
  {
    if (!$('.js-shop-more').length)
      item.parent().after("<article class=\"shop__row shop__more js-shop-more\"></article>");

    var more = item.parent().siblings('.js-shop-more');

    // If currect item is already open
    if (item.hasClass('js-item-opened'))
    {
      more.slideUp();
      item.removeClass('js-item-opened');
      return true;
    }

    var isVisible = more.is(':visible');
    var itemEvents = [];
    var index = 0;

    itemEvents.push(function(callback)
    {
      // Remove old item
      if (isVisible)
      {
        realHeight = $('.js-shop-more').outerHeight();
        $('.js-shop-more').css('height', realHeight).prepend("<div class=\"shop__row-overall\"></div>");
        $('.shop__row-overall').fadeIn(200, function(){
          $(this).nextAll().remove();
          callback(null);
        });
      }
      else
      {
        $('.js-shop-more').prepend("<div class=\"shop__row-overall\"></div>");
        $('.shop__row-overall').fadeIn(200, function(){
          $(this).nextAll().remove();
          callback(null);
        });
      }
    });

    itemEvents.push(function(callback){
      // Create new item
      item.parent().after($('.js-shop-more'));
      $('.js-shop-more').append(response);
      more = item.parent().siblings('.js-shop-more');
      index = item.index() + 1;
      switch (index)
      {
        case 1: toLeft(more); break;
        case 3: toRight(more); break;
        default: toMiddle(more); break;
      }
      callback(null);
    });

    if (!isVisible)
    {
      // If any item is not open
      itemEvents.push(function(callback){
        more.slideDown(200);
        callback(null);
      });
    }
    else
    {
      // Click to another item
      itemEvents.push(function(callback){
        shopItem.removeClass('js-item-opened');
        callback(null);
      });
    }

    itemEvents.push(function(callback){
      var offsetTop = $('.js-shop-more').offset()['top'] - 200;
      $('html, body').animate({scrollTop: offsetTop}, "slow");
      callback(null);
    });

    itemEvents.push(function(callback){
      item.addClass('js-item-opened');
      $('.js-shop-more').css('height', 'auto');

      $('.shop__row-overall').fadeOut(200, function(){
        $(this).remove();

        loadCb(null);
        callback(null);
      });
    });

    // Run the event queue
    async.waterfall(itemEvents);
  }

  function showItemInner(response)
  {
    var img = $(response).find('img');
    var current = 0;
    var itemEvents = [];

    $(img).load(function () {
      current++;

      if (current==img.length)
      {
        itemEvents.push(function(callback){
          $('.js-shop-more').find('.shop__row-inner').fadeOut(200, function(){
            $(this).remove();
            callback(null);
          });
        });

        itemEvents.push(function(callback){
          $(response).hide().prependTo(".js-shop-more").fadeIn(200);
          new Slider($('.js-preview-slider'), false, false, false ,'slide', 10);

          $(".js-shop-row-close").click(function(){
            $(this).parent(".js-shop-more").slideUp();
            $('.js-item-opened').removeClass('js-item-opened');
          });

          callback(null);
        });

        async.waterfall(itemEvents);
      }
    });
  }

  shopItem.on('click', function(e){
      e.preventDefault();

      var offsetTop;
      var item = $(this);
      var itemId = item.attr("href").split("_")[1];
      var itemEvents = [];

      if ($('div .related-items').length > 0) {
        window.location.hash = "";
        window.open("/story.php?id="+itemId,'_blank');
        return false;
      }

      window.location.hash = "item_" + itemId;

      itemEvents.push(function(callback){
        showItemDescriprion(item, "<div class=\"shop__row-inner shop__row-preload\"></div>", callback);
      });

      itemEvents.push(function(callback){
        if (shopCache[itemId])
          showItemInner(shopCache[itemId]);
        else
        {
          $.get('story.php', {id: itemId, short: 1}, function(response)
          {
            showItemInner(response);
            console.log(response)
            shopCache[itemId] = response;
          });
        }

        callback(null);
      });

      async.waterfall(itemEvents);
  });

  // Show on middle-click
  $('.shop__item').on('mousedown', function(e){
    if (e.which == 2)
    {
      e.preventDefault();

      var href;

      if ($(this).attr("href"))
        href = 'story.php?id=' + $(this).attr("href").substr(6);
      else
        href = $(this).find('a.shop__open').attr('href')

      if (href)
        window.open(href, '_blank');
    }
  });

  // Autoopen item
  var locHash = window.location.hash;

  if(locHash)
  {
    var hashSplit = locHash.split("_");
    var hashItem = parseInt(hashSplit[1]);

    $('section[href="#item_'+hashItem+'"]').trigger('click');
  }
  // Autoopen item - END

  $('html').on('click', function(){
      $('.lang__list').fadeOut();
  });

  function showList(obj){
      obj.find('ul').fadeToggle();
  }

  // Accordion
  $('.shop, .shop__more').on("click", ".js-accordion-title", function(e){
    e.preventDefault();
    e.stopPropagation();

    $(this).siblings('.js-accordion-item-secondary').stop().slideToggle("300");
    $(this).hide(300, function(){$(this).remove()});
    /* ga('send', 'event', 'Link', 'Click', 'MorePaymentOptions'); */
  });

  $(document).on('click', '.js-plank-button', function(){
    $('.js-item-payment').slideToggle();
    /* ga('send', 'event', 'BuyButton', 'Click', 'BbClick'); */
  });

  function getSliderDiscount(frameWrapper, value)
  {
    var itemEvents = [];
    var sliderDiscount = frameWrapper.find('li').eq(value).find('.shop__time');
    var sliderCurrentDiscount = $('.js-shop__time_slider .shop__time');

    itemEvents.push(function(callback){
      if (sliderCurrentDiscount.length)
      {
        $('.js-shop__time_slider .shop__time').animate({opacity: 0}, 200, function(){
          $(this).remove();
          callback(null);
        });
      }
      else
        callback(null);
    });

    if (sliderDiscount.length)
    {
      itemEvents.push(function(callback){
        sliderDiscount.clone()
                      .appendTo('.js-shop__time_slider')
                      .css('opacity', 0)
                      .animate({opacity: 1}, 200, function(){
                        callback(null);
                      });
      });
    }

    async.waterfall(itemEvents);
  }

  var Slider = function(obj, autoplay, showBullets, infinite, slideAnimation, thumbs)
  {
    var Exemplar = this,
        curItem = obj,
        frameWrapperWidth,
        frameWidth,
        frameWrapper,
        Position = 0,
        backwardButton,
        forwardButton,
        navigateButtons,
        currentOrder,
        bullets,
        allSlides = curItem.find('.js-frame'),
        frameCounts;

    // Button "Back"
    backwardButton = $('.js-backward');

    // Button "Forward"
    forwardButton = $('.js-forward');

    // Counting the number of slides
    frameCounts = curItem.find('.js-frame').length;

    // Width of the first slide
    frameWidth = allSlides.eq(0).width();



    // Navigation buttons
    navigate = curItem.find($('.navigate'));
    navigateButtons = navigate.find('a');
    sliderButtons = $('.js-slider-button');

    // Parent container of slides
    var frameWrapper = curItem.find(".js-frame-wrapper");

    // Check discount
    getSliderDiscount(frameWrapper, Position);

    // Check buttons to the extreme values
    this.toggleDisable = function (btn, isDisable) {
      if (isDisable)
        btn.addClass("disabled");
      else
        btn.removeClass("disabled");
    };

    // if an extreme value, then return zero, otherwise simply add 1
    // it need for autoplay
    this.intervals = function (value) {
      return function () {
        if (value == frameCounts - 1)
          value = 0;
        else
          value = value + 1;

        Exemplar.animateSlide(value);
      }
    };

    // slide animation
    if(slideAnimation)
    {
      this.animateSlide = function (value) {
        // value - current position
        var itemEvents = [];

        itemEvents.push(function(callback){
          getSliderDiscount(frameWrapper, value);
          frameWrapper.animate({opacity: 0}, 200, function(){
            callback(null);
          });
        });

        itemEvents.push(function(callback){
          frameWrapper.css({left: -value * frameWidth + 'px'});
          callback(null);
        });

        itemEvents.push(function(callback){
          frameWrapper.animate({opacity: 1}, 200, function(){
            callback(null);
          });
        });

        async.waterfall(itemEvents);

        // Check buttons to the extreme values
        Exemplar.toggleDisable(forwardButton, value == frameCounts - 1);
        Exemplar.toggleDisable(backwardButton, value == 0);

        if (showBullets){
            bullets.removeClass("current");
            bullets.eq(value).addClass("current");
        }

        Position = value;
      };
    }

    // If use bullets
    if (showBullets)
    {
      navigateButtons.remove();
      for (var i = 0; i < frameCounts; i++)
      {
        if (i==0)
          navigate.append("<a href='#' class='bullet js-bullet current'></a>");
        else
          navigate.append("<a href='#' class='bullet js-bullet'></a>");
      }

      // Bullets
      bullets = curItem.find('.js-bullet');

      bullets.on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        clearInterval(interval);

        Position = $(this).index();

        bullets.removeClass("current");
        $(this).addClass("current");

        Exemplar.animateSlide(Position);
      });
    }

    // Set width of slides parent container
    frameWrapper.width(frameWidth * frameCounts);

    // Animate slides by click
    sliderButtons.on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      clearInterval(interval);

      // Default infinite slider (when scrolling reaches the end it turns the start and vice versa)
      if (($(this).hasClass("js-forward")) && (Position < frameCounts - 1))
      {
        $(this).removeClass('disabled');

        Position = Position + 1;
        Exemplar.animateSlide(Position);
      }
      else if (($(this).hasClass("js-forward")) && (Position == frameCounts - 1))
      {
        if(infinite)
        {
          Position = 0;
          Exemplar.animateSlide(Position);
        }
        else
          $(this).addClass('disabled');
      }

      if (($(this).hasClass("js-backward")) && (Position > 0))
      {
        $(this).removeClass('disabled');
        Position = Position - 1;
        Exemplar.animateSlide(Position);
      }

      else if (($(this).hasClass("js-backward")) && (Position == 0))
      {
        if(infinite)
        {
          Position = frameCounts - 1;
          Exemplar.animateSlide(Position);
        }
        else
          $(this).addClass('disabled');
      }
    });

    // If enabled autoplay
    var interval;
    if (autoplay)
    {
      // Stop sliders autplay on hover
      obj.hover(function () {
          clearInterval(interval);
      }, function () {
          clearInterval(interval);
          interval = setInterval(function(){
              Exemplar.intervals(Position)();
          }, 3000);
      });

      interval = setInterval(function(){
          Exemplar.intervals(Position)();
      }, 3000);
    }

    if (thumbs)
    {
      var thumbs = $('.js-thumb');
      var src, bigSrc;
      var mainImg = curItem.find('.js-main-img');
      var widthMainImg = mainImg.width();
      var heightMainImg = mainImg.height();

      // Set current thumbs count
      screensCount = thumbs.length;
      screenLink = $('.js-thumb');
      screenOrder = 0;

      thumbs.on('click', function(e){
        e.preventDefault();

        var item = $(this);
        var itemEvents = [];

        src = item.attr('thumb');
        bigSrc = item.attr('href');

        if (mainImg.attr('src') == src)
          return true;

        //screensCount = thumbs.length;
        //screenLink = $('.js-thumb');
        screenOrder = getOrder(item);

        itemEvents.push(function(callback){
          thumbs.removeClass('active');
          item.addClass('active');

          mainImg.animate({opacity: 0}, 200, function(){
            callback(null);
          });
        });

        itemEvents.push(function(callback){
          mainImg.attr('src', src);
          mainImg.parent().attr('href', bigSrc);
          callback(null);
        });

        itemEvents.push(function(callback){
          mainImg.animate({opacity: 1}, 200, function(){
            callback(null);
          });
        });

        async.waterfall(itemEvents);
      })
    }
  };

  new Slider($('#js-slider'), true, false, true, 'slide');

  $(document).on('click', '.js-screens-link, .js-main-link, .js-img-preview', function(e){
    e.preventDefault();
    e.stopPropagation();
    var eto = $(this);
    var src = getSrc(eto);

    if (!src || src == '#')
      return;

    if (!$('.js-thumb').length)
      screenOrder = getOrder(eto);

    screenTitleText = getTitle(eto);

    const isSimplePreview = eto.hasClass('js-img-preview');

    popupImg.attr('src', src);
    popupImg.on('load', function () {
      $('.popup__img').css('display', 'block');
      $('.screen__button').show();
      $('#pay-frame').remove();

      if (isSimplePreview)
        $('.screen__button').hide();
      else
        $('.screen__button').show();

      showPopup();
      popupAdaptating();
      setScreentTitle();
    });
  });

  $(document).on('keydown', function (e)
  {
    switch (e.keyCode)
    {
      // ESC
      case 27:
        if(popupScreen.is(':visible'))
          hidePopup();
      break;

      default: break;
    }
  });

  popupScreen && popupScreen.on('click', function(e){
      hidePopup();
  });

  $('.popup__inner').on('click', function(e){
      e.stopPropagation();
  });

  $('.js-close').on('click', function(e){
      e.preventDefault();
      e.stopPropagation();

      // var target = $(this).data('target');
      // hideSomthn( $('.'+target) );
      hidePopup();
  });

  screensButton && screensButton.on('click', function(e){
      e.preventDefault();
  });

  $('.js-screens-forward').on('click', function(){
    if(screenOrder < screensCount - 1)
    {
      screenOrder++;
      changeImg(findNewImg(screenOrder));
    }
    else if(screenOrder == screensCount - 1)
    {
      screenOrder = 0;
      changeImg(findNewImg(screenOrder));
    }
  });

  $('.js-screens-backward').on('click', function(){
    if(screenOrder > 0)
    {
      screenOrder--;
      changeImg(findNewImg(screenOrder));
    }
    else if(screenOrder == 0)
    {
      screenOrder = screensCount - 1;
      changeImg(findNewImg(screenOrder));
    }
  });
}); //onimgload

