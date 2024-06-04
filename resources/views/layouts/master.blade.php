<!doctype html>
<html class="no-js" lang="zxx">


<!-- Mirrored from template.hasthemes.com/streamo/streamo/movie.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 07 Mar 2022 12:27:21 GMT -->
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Play Spot</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Favicon -->
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('public/assets/images/custom/playspot.png') }}">
    
    <!-- CSS 
    ========================= -->

    <!-- Boxicons CSS -->
    <link flex href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
   
    <!-- Bootstrap CSS -->
    {{-- <link rel="stylesheet" href="{{ asset('public/assets/css/bootstrap.min.css') }}"> --}}

     <!-- Bootstrap CSS -->
     <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    
    <!-- Fonts CSS -->
    <link rel="stylesheet" href="{{ asset('public/assets/css/material-design-iconic-font.min.css') }}">
    
    <!-- Plugins CSS -->
    <link rel="stylesheet" href="{{ asset('public/assets/css/plugins.css') }}">
    
    <!-- Main Style CSS -->
    <link rel="stylesheet" href="{{ asset('public/assets/css/style.css') }}">

    <!-- Custom Scripts JS -->
    <script src="{{ asset('public/assets/js/script.js') }}" defer></script>

    <!-- Bootstrap jQuery -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js" integrity="sha384-+sLIOodYLS7CIrQpBjl+C7nPvqq+FbNUBDunl/OZv93DB7Ln/533i8e/mZXLi/P+" crossorigin="anonymous"></script>
    
    <!-- Modernizer JS -->
    <script src="{{ asset('public/assets/js/vendor/modernizr-3.6.0.min.js') }}"></script>

    <!-- Modernizer JS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- Google Tag Manager -->

<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NQRBNB5');</script>
    <!-- End Google Tag Manager -->
    <style>
            .no-js #loader { display: none;  }
            .js #loader { display: block; position: absolute; left: 100px; top: 0; }
            .se-pre-con {
                position: fixed;
                left: 0px;
                top: 0px;
                width: 100%;
                height: 100%;
                z-index: 9999;
                background: url({{asset('public/loader.gif')}}) center no-repeat rgba(0, 0, 0, 1);
            }
            body{
                background: #0C0D14 !important;             
            }      
            dl, ol, ul {
            margin-top: 0;
            margin-bottom: 0rem !important;
        }  
        .se-pre-conss {
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            z-index: 9999999999;
            background: center no-repeat #0C0D14;
        }
        .loader {
            display: flex;
            align-items: center;
            justify-content: center;
            border: 15px solid #fff;
            border-top: 15px solid #6842ff;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            animation: spinloader 2s linear infinite;
        }
  
        .loader img {
            height: auto;
            width: 80%;
            animation: spinlogo 5s linear infinite;
            animation-iteration-count: infinite;
            animation-duration: 2s; 
        }

        @keyframes spinloader {
            0% {
                transform: rotate(0deg);
            }
  
            100% {
                transform: rotate(360deg);
            }
        }
  
        @keyframes spinlogo {
            0% {
                transform: rotate(360deg);
                /* transform-origin: 100%; */
            }
  
            100% {
                transform: rotate(0deg);
                /* transform-origin: 100%; */
            }
        }

        .footer-logo{
            height: 35px;
        }
        #messenger{
            position: relative;
            left: 90vw;
            /* top: 90%; */
            height: 44px;
            /* margin-bottom: 10rem; */
            bottom: 10rem;
        }
        #login-text{
            color: white;font-weight:bolder;
        }
        #login-text:hover{
            color: #ffc511;
        }

        @media (max-width: 576px){
            #messenger{
            left: 40vw;
        }
        }
        .main-content {
            display: block;
            width: 100%;
            padding-left: 5rem;
            margin-top: 5rem;
        }
        @media (max-width:768px) {
            .main-content {
                margin-top: 5rem;
                padding-left: 0rem;
            }
        }

    </style>
    @yield('head')
</head>

<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQRBNB5"
    height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
{{-- <div class="se-pre-con"></div> --}}
<div class="se-pre-conss">
    <div class="loader">
        <img src="{{ asset('public/assets/images/custom/playspot.png') }}" alt="logo">
    </div>
</div>
<!-- Main Wrapper Start -->
<div class="main-wrapper">
    <!-- header area start -->
    @include('layouts.partials.header')
    <div class="main-content">
        @yield('content')
    </div>
    {{-- @include('layouts.partials.footer') --}}
    <!-- Modal -->
    {{-- @include('layouts.partials.modal') --}}
</div>
<!-- Main Wrapper End -->

<!-- JS
============================================ -->

<!-- jquery -->		
<script src="{{ asset('public/assets/js/vendor/jquery-3.5.1.min.js') }}"></script>
<script src="{{ asset('public/assets/js/vendor/jquery-migrate-3.3.0.min.js') }}"></script>
<!-- Popper JS -->
<script src="{{ asset('public/assets/js/popper.min.js') }}"></script>
<!-- Bootstrap JS -->
<script src="{{ asset('public/assets/js/bootstrap.min.js') }}"></script>
<!-- Plugins JS -->
<script src="{{ asset('public/assets/js/plugins.js') }}"></script>
<!-- Ajax Mail -->
<script src="{{ asset('public/assets/js/ajax-mail.js') }}"></script>
<!-- Main JS -->
<script src="{{ asset('public/assets/js/main.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.lazyload/1.9.1/jquery.lazyload.min.js" integrity="sha512-jNDtFf7qgU0eH/+Z42FG4fw3w7DM/9zbgNPe3wfJlCylVDTT3IgKW5r92Vy9IHa6U50vyMz5gRByIu4YIXFtaQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<script>
    $(window).on('load', function(){
        $(".se-pre-con").fadeOut("slow");
        // $('img').lazyload();
        $("img")
         .lazyload({
             event: "lazyload",
             effect: "fadeIn",
             effectspeed: 2000
           })
         .trigger("lazyload");

        // $('.lazy').Lazy();

    });
</script>
<script>
    $(window).on('load', function(){
        $(".loader").fadeOut("slow");
    });
    $(window).on('load', function(){
        $(".se-pre-conss").fadeOut("slow");
    });
</script>
<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
  $('.carousel').mouseenter(function() {
  $('.carousel-control-prev, .carousel-control-next').show();
  }).mouseleave(function() {
    $('.carousel-control-prev, .carousel-control-next').hide();
  });
</script>
<!-- Initialize Swiper -->
{{-- <script>
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 5,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
</script> --}}
@yield('js')

</body>



</html>