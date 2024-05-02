var animationSectionNumber = 0;
var GLOBLE_ANIMATION_DURATION = 0.7;
var isAnimating = false;
var ANIMATION_TIMEOUT_MS = 1000;

function isTrackPad(e) {
  const { deltaY } = e;
  if (deltaY && !Number.isInteger(deltaY)) {
    ANIMATION_TIMEOUT_MS = 1000;
    return false;
  }
  ANIMATION_TIMEOUT_MS = 2000;
  return true;
}

function detectTrackPad(e) {
  var isTrackpad = false;
  if (e.wheelDeltaY) {
    if (e.wheelDeltaY === e.deltaY * -3) {
      isTrackpad = true;
    }
  } else if (e.deltaMode === 0) {
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
  } else if (e.deltaMode === 0) {
    isTrackpad = true;
  }
  console.log(isTrackpad ? "Trackpad detected" : "Mousewheel detected");
}

$(document).ready(function () {
  var EXPAND_ICON = "./assets/images/expand_btn.svg";
  var COLLAPSE_ICON = "./assets/images/eva_collapse-fill.svg";

  var EXPAND_ICON_HALF = "./assets/images/halfexpand_btn.svg";
  var COLLAPSE_ICON_HALF = "./assets/images/lucide_chevron-down.svg";

  $(".nsm_mobile_arrow_img").click(function () {
    initAnimation("down");
  });

  $(".expand_icon").click(function () {
    var top = $(".nsm_whats_new_strip").css("top");
    var height = $(window).height();
    // console.log("top", top);
    // console.log("window.height", $(window).height());

    var __duration = GLOBLE_ANIMATION_DURATION;
    // position logo

    if (parseInt(top) == 0) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // top: "90%",
        },
        {
          top: "50%",
          duration: __duration,
        }
      );
      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
    } else {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // top: "90%",
        },
        {
          top: "0%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", COLLAPSE_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
    }
  });

  $(".halfexpand_icon").click(function () {
    var top = $(".nsm_whats_new_strip").css("top");
    var height = $(window).height();
    // console.log("top", top);
    // console.log("window.height", $(window).height());

    var __duration = GLOBLE_ANIMATION_DURATION;

    // position logo
    if (parseInt(top) == 0) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // top: "90%",
        },
        {
          top: "84%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        EXPAND_ICON_HALF
      );
    } else if (parseInt(top) > 200 && parseInt(top) < 500) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // top: "90%",
        },
        {
          top: "84%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        EXPAND_ICON_HALF
      );
    } else {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // top: "90%",
        },
        {
          top: "50%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
    }
  });

  var touchstart;
  $(document).bind("touchstart", function (e) {
    touchstart = e.originalEvent.touches[0].clientY;
    console.log("touchstart", touchstart);
  });

  $(document).bind("touchend", function (e) {
    var touchend = e.originalEvent.changedTouches[0].clientY;
    var top = $(".nsm_whats_new_strip").css("top");

    console.log("touchstart touchend==>", { touchstart, touchend, top });

    if (parseInt(top) > 300) {
      if (touchstart > touchend + 5) {
        initAnimation("down");
      } else if (touchstart < touchend - 5) {
        initAnimation("up");
      }
    }
  });

  $("#fullpage").bind("mousewheel wheel", function (event) {
    var top = $(".nsm_whats_new_strip").css("top");
    const { deltaX, deltaY, wheelDelta, detail } = event.originalEvent;
    const __isTrackPad = isTrackPad(event.originalEvent);

    console.log("event.originalEvent", {
      deltaX,
      deltaY,
      wheelDelta,
      detail,
      __isTrackPad,
      isAnimating,
      ANIMATION_TIMEOUT_MS,
    });

    // check if aleady animating
    if (isAnimating) return false;

    if (parseInt(top) > 300) {
      if (deltaY === 0 && (wheelDelta > 0 || detail < 0)) {
        console.log("scrolling up !");
        initAnimation("up");
      } else if (deltaX === 0) {
        console.log("scrolling down !");
        initAnimation("down");
      }
    }
  });
});

function initAnimation(type = "down") {
  if (type == "down") {
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
  } else {
    if (animationSectionNumber == 1) {
      animateSectionReverse1();
    } else if (animationSectionNumber == 2) {
      animateSectionReverse2();
    } else if (animationSectionNumber == 3) {
      animateSectionReverse3();
    } else if (animationSectionNumber == 4) {
      animateSectionReverse4();
    } else if (animationSectionNumber == 5) {
      animateSectionReverse5();
    } else if (animationSectionNumber == 6) {
      animateSectionReverse6();
    } else if (animationSectionNumber == 7) {
      animateSectionReverse7();
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
    },
    {
      top: "0%",
      left: "-22%",
      // textAlign:"left",
      duration: __duration,
    }
  );

  // change logo color og to white
  gsap.fromTo(
    ".logo-div img",
    {
      filter: "unset",
    },
    {
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
      duration: 0,
    }
  );

  // position logo
  gsap.fromTo(
    ".header-container",
    {
      top: "-80",
    },
    {
      top: "0",
    }
  );

  // position scroll button
  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      top: "40%",
    },
    {
      top: "75%",
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
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
      duration: __duration,
    }
  );

  // position scroll button
  gsap.fromTo(
    ".driving-innovative-carousel",
    {
      top: "20%",
    },
    {
      top: "-100%",
      // ease: "power3.out",
      duration: 5,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".we-are-innovation-div",
    {
      top: "100%",
    },
    {
      top: "0%",
      // ease: "Bounce.easeOut",
      duration: __duration,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".brain-icon-div",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: __duration,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".nsm_whats_new_strip",
    {
      opacity: 0,
      top: "100%",
    },
    {
      opacity: 1,
      top: "84%",
      duration: __duration,
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
      top: "0%",
    },
    {
      top: "-50%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-div",
    {
      scale: 1,
      top: "60%",
      xPercent: 0,
    },
    {
      scale: 0.8,
      top: "-1%",
      xPercent: 45,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".thought-leadership-div",
    {
      opacity: 0,
      top: "40%",
      left: "40%",
    },
    {
      opacity: 1,
      top: "15%",
      left: "0%",
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
      top: "15%",
    },
    {
      top: "-100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-div",
    {
      scale: 0.8,
      top: "-1%",
      xPercent: 45,
    },
    {
      scale: 0.7,
      top: "-13%",
      xPercent: -35,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "-20%",
      top: "65%",
    },
    {
      left: "51%",
      top: "61%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-div",
    {
      left: "-70%",
      top: "100%",
    },
    {
      left: "0%",
      top: "25%",
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
    ".brain-icon-div",
    {
      scale: 0.7,
      top: "-10%",
      xPercent: -45,
    },
    {
      scale: 0.8,
      top: "-100%",
      xPercent: -45,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-div",
    {
      left: "0%",
      top: "10%",
    },
    {
      left: "-70%",
      top: "-50%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "50%",
      top: "50%",
    },
    {
      left: "35%",
      top: "0%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      opacity: 0,
      top: "40%",
      left: "100%",
    },
    {
      opacity: 1,
      top: "15%",
      left: "0%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      left: "-100%",
      top: "70%",
    },
    {
      left: "-10%",
      top: "55%",
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
      left: "40%",
      top: "0%",
    },
    {
      left: "40%",
      top: "-100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      top: "25%",
    },
    {
      top: "-100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      scale: 1,
      left: "-10%",
      top: "55%",
    },
    {
      scale: 1.2,
      left: "5%",
      top: "5%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".inclusive-growth-div",
    {
      opacity: 0,
      top: "40%",
      left: "100%",
    },
    {
      opacity: 1,
      top: "15%",
      left: "0%",
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
      top: "0%",
    },
    {
      top: "-100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_membership_slider_div",
    {
      top: "100%",
    },
    {
      top: "7%",
      duration: __duration,
    }
  );

  // change mobile arrow icon color og to white
  gsap.fromTo(
    ".nsm_mobile_arrow img",
    {
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
    },
    {
      filter: "unset",
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
      top: "100%",
    },
    {
      top: "0%",
      duration: __duration,
    }
  );
  gsap.fromTo(
    ".red-bg-container",
    {
      top: "-100%",
    },
    {
      top: "0%",
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

  // position logo
  gsap.fromTo(
    ".logo-div",
    {
      top: "0%",
      left: "-22%",
      // textAlign:"left",
      duration: __duration,
    },
    {
      top: "2vh",
      left: "0%",
      // textAlign:"center",
    }
  );

  // change logo color og to white
  gsap.fromTo(
    ".logo-div img",
    {
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
    },
    {
      filter: "unset",
      duration: 0,
    }
  );

  // position logo
  gsap.fromTo(
    ".header-container",
    {
      top: "0",
    },
    {
      top: "-80",
    }
  );

  // position scroll button
  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      top: "75%",
    },
    {
      top: "40%",
      duration: 1,
    }
  );

  // change mobile arrow icon color og to white
  gsap.fromTo(
    ".nsm_mobile_arrow img",
    {
      opacity: 0,
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
    },
    {
      filter: "unset",
      opacity: 1,
      duration: __duration,
    }
  );

  // position scroll button
  gsap.fromTo(
    ".driving-innovative-carousel",
    {
      top: "-100%",
    },
    {
      top: "20%",
      ease: "power3.out",
      duration: 2,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".we-are-innovation-div",
    {
      top: "0%",
    },
    {
      top: "100%",
      duration: __duration,
    }
  );

  // Show we-are-innovation-div from bottom
  gsap.fromTo(
    ".brain-icon-div",
    {
      opacity: 1,
    },
    {
      opacity: 0,
      duration: __duration,
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

  gsap.fromTo(
    ".we-are-innovation-container",
    {
      top: "-50%",
    },
    {
      top: "13%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-div",
    {
      scale: 0.8,
      top: "-1%",
      xPercent: 45,
    },
    {
      scale: 1,
      top: "60%",
      xPercent: 0,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".thought-leadership-div",
    {
      opacity: 1,
      top: "15%",
      left: "0%",
    },
    {
      opacity: 0,
      top: "40%",
      left: "40%",
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
      duration: __duration,
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

  gsap.fromTo(
    ".thought-leadership-div",
    {
      top: "-100%",
    },
    {
      top: "15%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".brain-icon-div",
    {
      scale: 0.8,
      top: "-10%",
      xPercent: -45,
    },
    {
      scale: 0.8,
      top: "-1%",
      xPercent: 45,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "51%",
      top: "61%",
    },
    {
      left: "-20%",
      top: "65%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-div",
    {
      left: "0%",
      top: "25%",
    },
    { left: "-70%", top: "100%", duration: __duration }
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

  gsap.fromTo(
    ".brain-icon-div",
    {
      scale: 0.8,
      top: "-100%",
      xPercent: -45,
    },
    {
      scale: 0.8,
      top: "-10%",
      xPercent: -45,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nasscom-members-div",
    { left: "-70%", top: "-50%" },
    {
      left: "0%",
      top: "25%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "35%",
      top: "0%",
    },
    { left: "51%", top: "61%", duration: __duration }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      opacity: 1,
      top: "15%",
      left: "0%",
    },
    {
      opacity: 0,
      top: "40%",
      left: "100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      left: "-10%",
      top: "55%",
    },
    {
      left: "-100%",
      top: "70%",
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

  gsap.fromTo(
    ".dollar-icon-container",
    {
      left: "40%",
      top: "-100%",
    },
    {
      left: "40%",
      top: "0%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".economic-rejuvenation-div",
    {
      top: "-100%",
    },
    {
      top: "25%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".trending-icon-container",
    {
      scale: 1.2,
      left: "5%",
      top: "5%",
    },
    {
      scale: 1,
      left: "-10%",
      top: "55%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".inclusive-growth-div",
    {
      opacity: 1,
      top: "15%",
      left: "0%",
    },
    {
      opacity: 0,
      top: "40%",
      left: "100%",
      duration: __duration,
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

  gsap.fromTo(
    ".main-home-screen",
    {
      top: "-100%",
    },
    {
      top: "0%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_membership_slider_div",
    {
      top: "7%",
    },
    {
      top: "100%",
      duration: __duration,
    }
  );

  // change mobile arrow icon color og to white
  gsap.fromTo(
    ".nsm_mobile_arrow img",
    {
      filter: "unset",
    },
    {
      filter:
        "invert(100%) sepia(0%) saturate(0%) hue-rotate(231deg) brightness(102%) contrast(1000%)",
      duration: 0,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 5;
  }, __duration * ANIMATION_TIMEOUT_MS);
}

function animateSectionReverse7() {
  // check if aleady animating
  if (isAnimating) return false;

  var __duration = 1;
  isAnimating = true;

  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".nsm_footer-area-dark",
    {
      top: "0%",
    },
    {
      top: "100%",
      duration: __duration,
    }
  );

  gsap.fromTo(
    ".red-bg-container",
    {
      top: "0%",
    },
    {
      top: "-100%",
      duration: __duration,
    }
  );

  setTimeout(() => {
    isAnimating = false;
    animationSectionNumber = 6;
  }, __duration * ANIMATION_TIMEOUT_MS);
}
