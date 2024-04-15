var animationSectionNumber = 0;
var GLOBLE_ANIMATION_DURATION = 0.6;
var isAnimating = false;
var ANIMATION_TIMEOUT_MS = 1000;

function isTrackPad(e) {
  const { deltaY } = e;
  if (deltaY && !Number.isInteger(deltaY)) {
    ANIMATION_TIMEOUT_MS = 1000;
    return false;
  }
  ANIMATION_TIMEOUT_MS = 3000;
  return true;
}

function detectTrackPad(e) {
  var isTrackpad = false;
  if (e.wheelDeltaY) {
    if (e.wheelDeltaY === (e.deltaY * -3)) {
      isTrackpad = true;
    }
  }
  else if (e.deltaMode === 0) {
    isTrackpad = true;
  }
  console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
}

function detectTrackPad2(e) {
  var isTrackpad = false;
  if (e.wheelDeltaY) {
    if (Math.abs(e.wheelDeltaY) !== 120) {
      isTrackpad = true;
    }
  }
  else if (e.deltaMode === 0) {
    isTrackpad = true;
  }
  console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
}

var start = {x:0, y:0};

function touchStart(event) {
  start.x = event.changedTouches[0].pageX;
  start.y = event.changedTouches[0].pageY;
}

function touchEnd(event) {
  offset = {};

  offset.x = start.x - event.changedTouches[0].pageX;
  offset.y = start.y - event.changedTouches[0].pageY;

  return offset;  
}

$(document).ready(function () {

  $(".nsm_mobile_arrow_img").click(function () {
    initAnimation('down');
  });

  $("#fullpage").bind("mousewheel wheel touchmove", function (event) {

    // console.log("event.originalEvent", event.originalEvent);
    // touchStart(event);
    // const { deltaX, deltaY, wheelDelta, detail} = touchEnd(event);

    const { deltaX, deltaY, wheelDelta, detail} = event.originalEvent;
    const __isTrackPad = isTrackPad(event.originalEvent);

    console.log("event.originalEvent", { deltaX, deltaY, wheelDelta, detail, __isTrackPad, isAnimating, ANIMATION_TIMEOUT_MS});

    // check if aleady animating
    if (isAnimating) return false;

    if (
      deltaY === 0 &&
      (wheelDelta > 0 || detail < 0)
    ) {
      console.log("scrolling up !");
      initAnimation('up');
      
    } else if (deltaX === 0 ) {

      console.log("scrolling down !");
      initAnimation('down');
    }
  });
});

function initAnimation(type = 'down') {
  if(type == 'up'){
    // if (animationSectionNumber == 1) {
    //   animateSectionReverse1();
    // } else if (animationSectionNumber == 2) {
    //   animateSectionReverse2();
    // } else if (animationSectionNumber == 3) {
    //   animateSectionReverse3();
    // } else if (animationSectionNumber == 4) {
    //   animateSectionReverse4();
    // } else if (animationSectionNumber == 5) {
    //   animateSectionReverse5();
    // } else if (animationSectionNumber == 6) {
    //   animateSectionReverse6();
    // }
  } else {
    if (animationSectionNumber == 0) {
      animateSection1();
    } else if (animationSectionNumber == 1) {
      animateSection2();
    } else if (animationSectionNumber == 2) {
      animateSection3();
    } else if (animationSectionNumber == 3) {
      animateSection4();
    } else if (animationSectionNumber == 4) {
      animateSection5();
    } else if (animationSectionNumber == 5) {
      animateSection6();
    } else if (animationSectionNumber == 6) {
      animateSection7();
    }
  }
}


// *************************************************
// *************************************************
// *************************************************
// ***********FORWARD/DOWNWORD ANIMATION************
// *************************************************
// *************************************************
// *************************************************

function animateSection1() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  // position logo
  gsap.fromTo(
    ".logo-div",
    {
      top: "2vh",
      left: "0%",
      // textAlign:"center",
      textShadow: "0 0 2px rgba(0,0,0,0.3)",
    },
    {
      top: "0%",
      left: "-22%",
      // textAlign:"left",
      textShadow: "0 0 2px rgba(0,0,0,0)",
      duration: __duration,
    }
  );

  // change logo color og to white
  gsap.fromTo(
    ".logo-div img",
    {
      // filter: 'invert(20%) sepia(73%) saturate(2432%) hue-rotate(345deg) brightness(109%) contrast(83%)'
    },
    {
      // filter: 'invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)'
      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)',
      duration: 0,
    }
  );

  // position logo
  gsap.fromTo(
    ".header-container",
    {
      top: "-50",
    },
    {
      top: "0",
    }
  );

  // position scroll button
  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      top:'40%'
    },
    {
      top:'unset',
      bottom:'20%',
      duration: 1,
    }
  );

  // change mobile arrow icon color og to white
  gsap.fromTo(
    ".nsm_mobile_arrow img",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)',
      duration: __duration,
    }
  );

  // position scroll button
  gsap.fromTo(
    ".driving-innovative-carousel",
    {
      top:'20%'
    },
    {
      top: '-100%',
      ease: "power3.out",
      duration: 5,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".we-are-innovation-div",
    {
      bottom: '-150%',
    },
    {
      bottom: '0%',
      duration: __duration,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".brain-icon-container",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 2,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 1;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection2() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".we-are-innovation-container",
    {
      top: '0%',
    },
    {
      top: '-50%',
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-container",
    {
      scale: 1,
      bottom: "0%",
      right: "0%",
    },
    {
      scale: 0.8,
      top: "-5%",
      right: "-50%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".thought-leadership-div",
    {
      bottom: "-150%",
    },
    {
      top: "5%",
      duration: __duration,
    }
  );

   gsap.fromTo(
    ".dollar-icon-container",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 2;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection3() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".thought-leadership-div",
    {
      top: '5%',
      bottom: '-150%',
    },
    {
      top: '-100%',
      bottom: '0%',
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-container",
    {
      scale: 0.8,
      top: "-5%",
      right: "-50%",
      left:'unset',
      textAlign: 'center'
    },
    {
      scale: 0.7,
      top: "-20%",
      right: "0%",
      left: "-40%",
      textAlign: 'left',
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "-20%",
      bottom: "0%",
    },
    {
      left: "50%",
      bottom: "8%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-container",
    {
      bottom: "-150%",
    },
    {
      bottom: "25%",
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 3;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection4() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".brain-icon-container",
    {
      scale: 0.7,
      top: "-20%",
      right: "0%",
      left: "-40%",
      textAlign: 'left',
    },
    {
      scale: 0.7,
      top: "-100%",
      right: "0%",
      left: "-40%",
      textAlign: 'left',
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-container",
    {
      bottom: "25%",
    },
    {
      bottom: "150%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "50%",
      bottom: "8%",
    },
    {
      left: "35%",
      bottom: "60%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      bottom: "-150%",
    },
    {
      top: "5%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      bottom: "-150%",
    },
    {
      bottom: "0%",
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 4;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection5() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "35%",
      bottom: "60%",
    },
    {
      left: "35%",
      bottom: "150%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      top: '5%',
      bottom: '-150%',
    },
    {
      top: '-100%',
      bottom: '0%',
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      bottom: "0%",
    },
    {
      bottom: "55%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".inclusive-growth-div",
    {
      bottom: "-150%",
    },
    {
      top: "5%",
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 5;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection6() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".main-home-screen",
    {
      top: '0%',
    },
    {
      top: '-150%',
      duration: __duration,
    }
  );

    gsap.fromTo(
    ".nsm_membership_slider_div",
    {
      bottom: '-150%',
    },
    {
      bottom: '-5%',
      duration: __duration,
    }
  );

  // change mobile arrow icon color og to white
  gsap.fromTo(
    ".nsm_mobile_arrow img",
    {
      filter: 'invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)',
    },
    {
      filter: 'unset',
      duration: 0,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 6;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSection7() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_footer-area-dark",
    {
      bottom: '-150%',
    },
    {
      bottom: '0%',
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 7;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

// *************************************************
// *************************************************
// *************************************************
// **************REVERSE ANIMATION******************
// *************************************************
// *************************************************
// *************************************************

function animateSectionReverse1() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  gsap.fromTo(
    ".logo-div",
    {
      top: "-3%",
      left: "-42%",
      scale: 0.27,
      textShadow: "0 0 2px rgba(0,0,0,0)",
    },
    {
      top: "80vh",
      left: "-14%",
      scale: 1,
      textShadow: "0 0 2px rgba(0,0,0,0.3)",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".driving-innovative-carousel",
    {
      xPercent: 0,
      yPercent: -400,
    },
    {
      xPercent: 0,
      yPercent: 0,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".we-are-innovation-div",
    {
      display: "none",
      xPercent: 0,
      yPercent: 0,
    },
    {
      xPercent: 0,
      yPercent: 200,
      display: "flex",
      duration: __duration,
    }
  );
  gsap.fromTo(
    ".thought-leadership-div",
    {
      yPercent: 0,
      display: "none",
    },
    {
      yPercent: 200,
      display: "flex",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_fix-nav",
    {
      xPercent: 2,
      opacity: 1,
      display: "flex",
    },
    {
      xPercent: -100,
      opacity: 0,
      display: "none",
      duration: 1,
      ease: "power3.out",
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 0;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse2() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  setTimeout(function () {
    $(".nsm_navbar").removeClass("nsm_navbar_white");
  }, 50);

  gsap.fromTo(
    ".we-are-innovation-div",
    {
      yPercent: -200,
      opacity: 1,
    },
    {
      opacity: 1,
      yPercent: -60,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".thought-leadership-div",
    {
      // top: 0,
      // left: 0,
      bottom: 0,
      right: 0,
      height: "100%",
      width: "100%",
      yPercent: 0,
      borderRadius: 0,
    },
    {
      // top: "unset",
      // left: "unset",
      bottom: "-18%",
      right: "5%",
      height: "60vh",
      width: "55vh",
      borderRadius: 20,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".thought-leadership-box",
    {
      xPercent: 70,
      yPercent: 20,
    },
    {
      xPercent: 0,
      yPercent: 0,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".red-bg-container",
    {
      opacity: 1,
      display: "flex",
    },
    {
      opacity: 0,
      display: "none",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-container",
    {
      opacity: 1,
      right: "2%",
      top: "2%",
    },
    {
      opacity: 0,
      right: "40%",
      top: "40%",

      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-container",
    {
      xPercent: 200,
      yPercent: -40,
    },
    {
      xPercent: 60,
      yPercent: 50,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: 3,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 1;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse3() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  setTimeout(function () {
    $(".nsm_navbar").addClass("nsm_navbar_white");
  }, 300);

  gsap.fromTo(
    ".thought-leadership-box",
    {
      xPercent: 80,
      yPercent: -200,
    },
    {
      xPercent: 70,
      yPercent: 20,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-container",
    {
      scale: 0.2,
      right: "2%",
      top: "-200%",
    },
    {
      scale: 1,
      right: "2%",
      top: "2%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-container",
    {
      xPercent: 60,
      yPercent: -160,
    },
    {
      xPercent: 200,
      yPercent: -40,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "30%",
      bottom: "2%",
    },
    {
      left: "20%",
      bottom: "-18%",
      duration: __duration,
    }
  );
  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      opacity: 1,
      right: "5%",
      top: "30%",
    },
    {
      opacity: 0,
      right: "30%",
      top: "100%",

      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 2;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse4() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  setTimeout(function () {
    $(".nsm_navbar").addClass("nsm_navbar_white");
  }, 300);

  gsap.fromTo(
    ".nasscom-members-container",
    {
      xPercent: 60,
      yPercent: -300,
    },
    {
      xPercent: 60,
      yPercent: -160,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      right: "5%",
      top: "-100%",
    },
    {
      right: "5%",
      top: "30%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "18%",
      bottom: "58%",
    },
    {
      left: "30%",
      bottom: "2%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".inclusive-growth-div",
    {
      opacity: 1,
      right: "18%",
      top: "22%",
    },
    {
      opacity: 0,
      right: "30%",
      top: "100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      opacity: 1,
      left: "35%",
      bottom: "-5%",
    },
    {
      opacity: 0,
      left: "50%",
      bottom: "-20%",
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 3;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse5() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = GLOBLE_ANIMATION_DURATION;
  isAnimating = true;

  setTimeout(function () {
    $(".nsm_navbar").addClass("nsm_navbar_white");
  }, 300);

  gsap.fromTo(
    ".dollar-icon-container",
    {
      opacity: 0,
      left: "10%",
      bottom: "100%",
    },
    {
      opacity: 1,
      left: "18%",
      bottom: "58%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".inclusive-growth-div",
    {
      opacity: 0,
      right: "18%",
      top: "-22%",
    },
    {
      opacity: 1,
      right: "18%",
      top: "22%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      opacity: 0,
      left: "20%",
      bottom: "30%",
    },
    {
      opacity: 1,
      left: "35%",
      bottom: "-5%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".main-home-screen",
    {
      opacity: 0,
      height: "0vh",
    },
    {
      opacity: 1,
      height: "100vh",
      duration: 1,
    }
  );

  gsap.fromTo(
    ".thought-leadership-div",
    {
      xPercent: 0,
      yPercent: -100,
    },
    {
      xPercent: 0,
      yPercent: 0,
      duration: 1,
    }
  );

  gsap.fromTo(
    ".nsm_membership_slider_div",
    {
      opacity: 1,
      height: "100vh",
    },
    {
      opacity: 0,
      height: "0vh",
      duration: 1,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 4;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse6() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = 1;
  isAnimating = true;

  setTimeout(function () {
    $(".nsm_navbar").removeClass("nsm_navbar_white");
  }, 300);

  gsap.fromTo(
    ".nsm_side-area",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: __duration,
    }
  );
  gsap.fromTo(
    ".know-more-about-memeber",
    {
      // opacity: 0,
      scale: 1.6,
      xPercent: 100,
      yPercent: -1000,
    },
    {
      // opacity: 1,
      scale: 1,
      xPercent: 0,
      yPercent: 0,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_membership_slider_div",
    {
      opacity: 0,
      height: "0vh",
      top: "-100%",
    },
    {
      opacity: 1,
      height: "100vh",
      top: "0%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_footer_div",
    {
      opacity: 1,
      top: "0%",
      height: "100vh",
    },
    {
      opacity: 0,
      top: "100%",
      height: "0vh",

      duration: __duration,
    }
  );

  gsap.fromTo(
    ".footer-text-div",
    {
      top: 0,
      left: 0,
    },
    {
      top: -100,
      left: -100,
      duration: 1,
    }
  );

  gsap.fromTo(
    ".main",
    {
      zIndex: 100,
    },
    {
      zIndex: 98,
      duration: 1,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 5;
  }, __duration * ANIMATION_TIMEOUT_MS);
}
