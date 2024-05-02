$(document).ready(function(){

$(function() {
    $('.tabs-nav a').click(function() {
  
      // Check for active
      $('.tabs-nav li').removeClass('active');
      $(this).parent().addClass('active');
  
      // Display active tab
      let currentTab = $(this).attr('href');
      $('.tabs-content .tab-item').hide();
      $(currentTab).show();
  
      return false;
    });
  });


  

function fixDiv() {
  var $div = $(".tabs-nav");
  if ($(window).scrollTop() > $div.data("top")) {
      $('.tabs-nav').addClass('stickyelement'); 
  }
  else {
      $('.tabs-nav').removeClass('stickyelement'); 
  }
}


$(".tabs-nav").data("top", $(".tabs-nav").offset().top); // set original position on load
$(window).scroll(fixDiv);







  $(document).ready(function(){
    $('.tabcontent-slider').slick({
      speed: 600,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      dots:false,
      autoplaySpeed: 5000,
      centerMode:true,
      nextArrow: false,
      prevArrow: false,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // centerMode: true,
  
        }
  
      }, {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 6000,
        }
      },  {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 6000,
        }
      }]
    });
  });
});



$(".filter_search").click(function(){
  $("#searchfield").slideToggle();
});