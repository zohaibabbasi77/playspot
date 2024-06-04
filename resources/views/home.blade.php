@extends('layouts.master')
@section('head')
<link href="https://vjs.zencdn.net/7.18.1/video-js.css" rel="stylesheet" />
{{-- <link rel="stylesheet" href="{{ asset('public/assets/css/welcome.css') }}"> --}}
<link rel="stylesheet" href="{{ asset('public/assets/css/custom-style.css') }}">
<!-- Link Swiper's CSS -->
{{-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" /> --}}
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.css" />

@endsection
@section('content')
<div class="container-fluid">
    {{-- @include('includes.welcome.boxydesignslider') --}}
    @include('includes.welcome.boxslider')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.slider')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.oneliner')
    @include('includes.welcome.twocoldesignslider') 
    @include('includes.welcome.oneliner')
    @include('includes.welcome.oneliner')
    
    {{-- <x-channels heading="Pakistani Dramas" :movies="$pakistanidramas"/> --}}
@section('js')
<!-- Swiper JS -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<script>
  $(document).ready(function() {

    $('.carousel').mouseenter(function() {
      $('.carousel-control-prev, .carousel-control-next').show();
    }).mouseleave(function() {
      $('.carousel-control-prev, .carousel-control-next').hide();
    });

    $('.swiper-button-prev, .swiper-button-next').hide();

    $('.swiper').mouseenter(function() {
      $('.swiper-button-prev, .swiper-button-next').show();  
    }).mouseleave(function() {
      $('.swiper-button-prev, .swiper-button-next').hide();
    });

  }); 
</script>
<!-- Initialize Swiper -->
<script>
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 6,
    spaceBetween: 1,
    breakpoints: {
        300: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 1,
        },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 6,
    spaceBetween: 2,
    autoplay: true,
    breakpoints: {
        300: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 1,
        },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  var swiper3 = new Swiper(".mySwiper3", {
    slidesPerView: 3,
    spaceBetween: 2,
    slidesPerGroup: 3,  // This line ensures 3 slides move at a time
    autoplay: true,
    breakpoints: {
        300: {
          slidesPerView: 2,
          slidesPerGroup: 1,
          spaceBetween: 1,
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 3,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 1,
        },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
  });
</script>
@endsection
@endsection
