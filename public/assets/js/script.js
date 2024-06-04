// Selecting the sidebar and buttons
const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  // If the sidebar is not locked
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
    // If the sidebar is currently closed, open it
    if (sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
    }
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
    // If the sidebar is currently open and unlocked, close it
    if (!sidebar.classList.contains("close")) {
      sidebar.classList.add("close");
    }
  }
};

// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable") && sidebar.classList.contains("locked")) {
    sidebar.classList.add("close");
  }
};

// Function to show the sidebar when the mouse enters
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    if (sidebar.classList.contains("locked") && sidebar.classList.contains("close")) {
      sidebar.classList.remove("close");
    }
  } else {
    // If the sidebar is not hoverable, ensure it's open
    sidebar.classList.remove("close");
  }
};

// Function to show and hide the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
};

// If the window width is less than 800px, close the sidebar and remove hoverability and lock
if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
}

function checkScreenSize() {
  const logoName = document.getElementById('LogoName');
  if (window.innerWidth < 768) {
      logoName.textContent = ''; // Clear the text
  } else {
      logoName.textContent = 'PlaySpot'; // Restore the text
  }
}

// Run the function on page load
checkScreenSize();

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);
// Run the function when the window is resized
window.addEventListener('resize', checkScreenSize);

$(document).ready(function(){
  // Hide carousel controls initially
  $('.carousel-control-prev, .carousel-control-next').hide();
  $('.swiper-button-prev, .swiper-button-next').hide();

  // Activate the carousel
  $('#myCarousel').carousel({
    interval: false, // Disable auto-sliding
    wrap: false // Disable wrapping at the end of the carousel items
  });

  // Make the carousel draggable
  var startX;
  var isDragging = false;

  $('.carousel-inner').on('mousedown', function(e) {
    isDragging = true;
    startX = e.clientX;
  });

  $(document).on('mouseup', function() {
    isDragging = false;
  });

  $('.carousel-inner').on('mousemove', function(e) {
    if (!isDragging) return;

    var deltaX = e.clientX - startX;
    if (deltaX > 50) {
      $('#myCarousel').carousel('prev');
      isDragging = false;
    } else if (deltaX < -50) {
      $('#myCarousel').carousel('next');
      isDragging = false;
    }
  });

  // Show carousel controls on hover
  $('.carousel').mouseenter(function() {
    $('.carousel-control-prev, .carousel-control-next').show();
    
  }).mouseleave(function() {
    $('.carousel-control-prev, .carousel-control-next').hide();
  });


  // Second Carousel

  const itemsToScroll = 3; // Number of items to scroll
  const itemWidth = $('.image').outerWidth(true); // Get width of one item including margin
  const scrollAmount = itemsToScroll * itemWidth; // Total scroll amount

  // Handle next button click
  $('#myCarousel2 .carousel-control-next').on('click', function() {
    const carouselInner = $(this).siblings('.carousel-inner').find('.flex-design');
    const newScrollLeft = carouselInner.scrollLeft() + scrollAmount;
    carouselInner.animate({ scrollLeft: newScrollLeft }, 600);
  });

  // Handle prev button click
  $('#myCarousel2 .carousel-control-prev').on('click', function() {
    const carouselInner = $(this).siblings('.carousel-inner').find('.flex-design');
    const newScrollLeft = carouselInner.scrollLeft() - scrollAmount;
    carouselInner.animate({ scrollLeft: newScrollLeft }, 600);
  });

  // Optionally, you can show/hide buttons based on scroll position
  const carouselInner = $('#myCarousel2 .carousel-inner .flex-design');
  carouselInner.on('scroll', function() {
  const maxScrollLeft = this.scrollWidth - this.clientWidth;
  const scrollLeft = $(this).scrollLeft();

  if (scrollLeft === 0) {
    $('#myCarousel2 .carousel-control-prev').fadeOut();
  } else {
    $('#myCarousel2 .carousel-control-prev').fadeIn();
  }

  if (scrollLeft >= maxScrollLeft) {
    $('#myCarousel2 .carousel-control-next').fadeOut();
  } else {
    $('#myCarousel2 .carousel-control-next').fadeIn();
  }
  });

  // Initial check
  carouselInner.trigger('scroll');

  
  const itemsToScroll2 = 3; // Number of items to scroll
  const scrollAmount2 = itemsToScroll2 * $('.carousel-item').outerHeight(true); // Total scroll amount
  const carouselInner2 = $('#myCarousel3 .carousel-inner');
  let autoplayInterval; // Variable to store autoplay interval

  // Function to start autoplay
  function startAutoplay() {
    autoplayInterval = setInterval(function() {
      const newScrollTop2 = carouselInner2.scrollTop() + scrollAmount2;
      carouselInner2.animate({ scrollTop: newScrollTop2 }, 600);
    }, 2000); // Adjust the interval as needed
  }

  // Function to stop autoplay
  function stopAutoplay() {
    clearInterval(autoplayInterval);
  }

  // Set the height of carousel items to match the first section
  function setCarouselItemHeight() {
    const firstSectionHeight2 = $('.first-section').outerHeight(true);
    $('.carousel-item').height(firstSectionHeight2);
  }

  // Initial setup
  setCarouselItemHeight();

  // Handle next button click
  $('#myCarousel3 .carousel-control-next').on('click', function() {
    stopAutoplay();
    const newScrollTop2 = carouselInner2.scrollTop() + scrollAmount2;
    carouselInner2.animate({ scrollTop: newScrollTop2 }, 600);
  });

  // Handle prev button click
  $('#myCarousel3 .carousel-control-prev').on('click', function() {
    stopAutoplay();
    const newScrollTop2 = carouselInner2.scrollTop() - scrollAmount2;
    carouselInner2.animate({ scrollTop: newScrollTop2 }, 600);
  });

  // Show/hide buttons based on scroll position
  carouselInner2.on('scroll', function() {
    const maxScrollTop2 = this.scrollHeight - this.clientHeight;
    const scrollTop2 = $(this).scrollTop();

    $('#myCarousel3 .carousel-control-prev').toggle(scrollTop2 !== 0);
    $('#myCarousel3 .carousel-control-next').toggle(scrollTop2 < maxScrollTop2);
  });


});


