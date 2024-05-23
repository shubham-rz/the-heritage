$(function(){
    aosInt();
    /* Carousel Starts */
    var carouselHeroBanner = $('.carouselHeroBanner');
    carouselHeroBanner.owlCarousel({
        loop:false,
        nav:true,
        dots:true,
        autoplay:true,
        items:1,
        animateIn: 'fadeIn'
    });
    var carouselSocialFeed = $('.social-feeds-wrap');
    carouselSocialFeed.owlCarousel({
        center:true,
        margin: 10,
        loop: true,
        //autoWidth: true,
        items: 2,
        dots:false,
        responsive:{
            600:{
                items: 2,
            },
            768:{
                margin:10,
                items: 4,
            }
        }
    });
    var carouselSingleCard = $('.carouselSingleCard');
    carouselSingleCard.owlCarousel({
        loop:true,
        nav:true,
        autoplay:true,
        //items:1,
        animateIn: 'fadeIn',
        dots:false,
        responsive:{
            0:{
                items: 1,
            },
            1024:{
                items: 1,
                stagePadding: 60
            },
            1400:{
                items: 1,
                stagePadding: 100
            }
        }
    });
    var artcarousel = $('.art-carousel');
    artcarousel.owlCarousel({
        loop:true,
        //nav:true,
        autoplay:true,
        items:1,
        animateIn: 'fadeIn',
        dots:false,
        stagePadding: 30,
        margin: 10,
        responsive:{
            768:{
                items:2
            },
            1024:{
                items:2.8
            }
        }
    });

    $('.owl-carousel').each(function(getOwlIndex) {
        $(this).find('.owl-dot').each(function(index) {
            $(this).attr('aria-label', 'owl'+ getOwlIndex +'-'+ index);
        });
    });
    /* Carousel Ends */
    $('.tab-container .tabsWrap ul li').click(function(){
        var self = $(this);
        var scrollArea = $('.tab-container .tabsWrap');
        //console.log(scrollArea)
        var leftOffset = self.offset().left - scrollArea.offset().left + scrollArea.scrollLeft() - 20;            
        scrollArea.animate({ scrollLeft: leftOffset });

        var index = $(this).index();
        //console.log(index)
        $(this).addClass('active').siblings().removeClass('active');
        $(this).closest('.tab-container').find('.tabContentWrap .tabContent').eq(index).fadeIn().siblings().hide();
    }).eq(0).click();
    $('.navbar-toggler').click(function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.navWrap').fadeOut();
            $('body').removeClass('overflow-hidden');
            event.stopPropagation(); 
        }
        else {
            $(this).addClass('active');
            $('.navWrap').fadeIn();
            $('body').addClass('overflow-hidden');
            event.stopPropagation();
        }
	});
    $('.nav-item.has-subnav a').click(function(event){
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $(this).next('.subnav').slideUp();
            event.stopPropagation();
        }
        else {
            $('.nav-item.has-subnav a').removeClass('active');
            $(this).addClass('active');
            $('.subnav').slideUp();
            $(this).next('.subnav').slideDown();
            event.stopPropagation(); 
        }
	});
    $('.modal-trigger').click(function(event){
		$('#videoPopup').fadeIn('slow');
        $('.modal-content').css({'transform':'translateY(50px)'});
        $('body').addClass('overflow-hidden');
		event.stopPropagation(); 
	});
	$('#modalClose').click(function(){
		hideModal();
	});
    $('.modal-content').click(function(event){
       event.stopPropagation(); 
    });
    $(document).on("click", function () {
        hideModal();
        $('header .navWrap li .nav-link').removeClass('active');
        $('header .navWrap li .nav-link').next('.subnav').slideUp();
    });
    $('.video-thumbnail').click(function(){
        var youtubeurl = $(this).attr('data-url');
        $('#videoPopup').find('iframe').attr('src',youtubeurl);
    });
    $('.bottom-top-link').click(function(){
        $('html, body').animate({
          scrollTop: 0
        },3000);
    });
    /* Contact form Function Start */
    $('.name').each(function() {
        $(this).on('blur', function() {
            if ($(this).val() == "") {
                $(this).closest('.form-group').find('.errorMsg').show();
            }
            else if ($(this).val() != "") {
                $(this).closest('.form-group').find('.errorMsg').hide();
            }
        });
    });
    $('.mobileno').each(function() {
        $(this).on('blur', function() {
            var mobileno=/^[6-9][0-9]{9}$/;
            //$(this).on('blur', function() {
            if ($(this).val() == "") {
                $(this).closest('.form-group').find('.errorMsg').text('Please Enter Mobile number').show()
            } else if ((!($(this).val().length) === 10) || (!mobileno.test($(this).val()))) {
                $(this).closest('.form-group').find('.errorMsg').show().text('Please enter valid Mobile number').show()
            }
            else{
                $(this).closest('.form-group').find('.errorMsg').hide();
            }
        });
    });

    $(document).on('keypress keyup', ".alfaOnlyInput", function (e) {
        var thisVal = $(this).val();
        var regOne = new RegExp("^[a-zA-Z]+$");
        var regex = new RegExp("^[a-zA-Z'. ,-]+$");
        var kCd = e.keyCode || e.which;
        if ($(window).width() < 1280) {
            if (kCd == 0 || kCd == 229) {
                kCd = getKeyCode($(this).val());
                if (thisVal.length == 1) {
                    if (!(regOne.test(kCd))) {
                        $(this).val('');
                        return false;
                    }
                }
                if (!regex.test(kCd)) {
                    $(this).val($(this).val().substr(0, $(this).val().length - 1));
                    return false;
                }
            }
        }
        var key = String.fromCharCode(!e.charCode ? e.which : e.charCode);
        if (thisVal.length == 0) {
            if (!(regOne.test(key))) {
                return false;
            }
        }
        if(kCd != 13) {
            if (!(regex.test(key) || (e.charCode == 0))) {
                return false;
            }
        }
    });
    $(".alfaOnlyInput").on("input", function () {
        var regexp = /[^a-zA-Z'. ,-]/g;
        if ($(this).val().match(regexp)) {
            $(this).val($(this).val().replace(regexp, ''));
        }
    });
    $(document).on('keydown', ".noOnlyInput", function(e) {
        // Allow: backspace, delete, tab, escape, enter and .
    
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
    if($('html').hasClass('device')){
        $('input[type="text"].noOnlyInput').attr('type', 'number')
    }
    $('.email').each(function() {
        $(this).on('blur', function() {
            var sEmail = $(this).val();
            if ($(this).val() == "") {
                $(this).closest('.form-group').find('.errorMsg').text('Please enter E-mail ID').show()
            } else if (!validateEmail(sEmail)) {
                $(this).closest('.form-group').find('.errorMsg').show().text('Please enter valid E-mail ID').show()
            }
            else{
                $(this).closest('.form-group').find('.errorMsg').hide();
            }
        });
    });
    var contactflag = false;
    $(document).on("click",".btn-submit-contact",function() {
        let firstname = $("#firstname");
        let lastname = $("#lastname");
        let email = $(".form-control.email");
        let mobileno = $(".form-control.mobileno");
        //textAreaInput
        
        if (firstname.val() == "") {
            $(firstname).closest('.form-group').find('.errorMsg').show();
            contactflag = false;
        }
        if (lastname.val() == "") {
            $(lastname).closest('.form-group').find('.errorMsg').show();
            contactflag = false;
        }
        if (email.val() == "") {
            $(email).closest('.form-group').find('.errorMsg').show();
            contactflag = false;
        }
        if (mobileno.val() == "") {
            $(mobileno).closest('.form-group').find('.errorMsg').show();
            contactflag = false;
        }
        if ($(this).closest(".contact-form").find(".errorMsg").is(':visible')) {
            contactflag = false;
            return false;
        }
        else {
            $('.thankYouMsg').fadeIn();
            setTimeout(function(){
                $('.thankYouMsg').hide();
            },5000);
        }
    });
    /* Contact form Function Ends */

});
function aosInt() {
    if($(window).width() >= 768){
        AOS.init();
        window.addEventListener('load', AOS.refresh);
    }
}
function validateEmail(sEmail) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(sEmail)) {
        return true;
    } else {
        return false;
    }
}
function hideModal(){
	$('#videoPopup').fadeOut('fast');
    $('.modal-content').css({ 'transform':'translateY(0px)' });
    $('body').removeClass('overflow-hidden');
}
$(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
        $('header').addClass('fixed-header');
    }
    else {
        $('header').removeClass('fixed-header');
    }
});

