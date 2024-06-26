var animationSectionNumber = 0;
var GLOBLE_ANIMATION_DURATION = 0.7;
var isAnimating = false;
var ANIMATION_TIMEOUT_MS = 1000;
var diffHeight = 0;
var halfBottom = 400;
var whatsNewBottomFormatted = `-${halfBottom}px`;
var arrowHeight = 80;

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

function swipedetect(el, callback) {
  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) {};

  touchsurface.addEventListener(
    "touchstart",
    function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = "none";
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      // e.preventDefault();
    },
    false
  );

  touchsurface.addEventListener(
    "touchmove",
    function (e) {
      // e.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  touchsurface.addEventListener(
    "touchend",
    function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? "down" : "up"; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);
      // e.preventDefault();
    },
    false
  );
}

$(document).ready(function () {
  var window_height = $(window).height();
  var window_innerHeight = $(window).innerHeight();
  var window_outerHeight = $(window).outerHeight();
  var document_height = $(document).height();
  var document_innerHeight = $(document).innerHeight();
  var document_outerHeight = $(document).outerHeight();
  diffHeight = document_height - window_height;
  halfBottom = (document_innerHeight - diffHeight) / 2;
  whatsNewBottomFormatted = `-${halfBottom}px`;

  var EXPAND_ICON = "./assets/images/expand_btn.svg";
  var COLLAPSE_ICON = "./assets/images/eva_collapse-fill.svg";

  var EXPAND_ICON_HALF = "./assets/images/halfexpand_btn.svg";
  var COLLAPSE_ICON_HALF = "./assets/images/lucide_chevron-down.svg";

  $(".nsm_mobile_arrow_img").click(function () {
    initAnimation("down");
  });

  $(".nsm_whats_new_strip").css({
    bottom: whatsNewBottomFormatted,
  });

  // $(".nsm_whats_new_strip").css({
  //   height: `calc( 100vh + ${diffHeight/2}px)`,
  // });

  $(".nsm_mobile_arrow").css({
    top: `${halfBottom - arrowHeight}px`,
  });

  $(".expand_icon").click(function () {
    var bottom = $(".nsm_whats_new_strip").css("bottom");
    bottom = Math.abs(parseInt(bottom));
    console.log(
      "expand_icon document height,innerHeight,bottom,outerHeight==>",
      {
        bottom,
        window_height,
        window_innerHeight,
        window_outerHeight,
        document_height,
        document_innerHeight,
        document_outerHeight,
      }
    );

    var __duration = GLOBLE_ANIMATION_DURATION;
    // position logo

    if (bottom == 0) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // bottom: "90%",
        },
        {
          bottom: whatsNewBottomFormatted,
          duration: __duration,
        }
      );
      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
      $(".whats-new-scrolling-wrapper").css({ height: "unset" });
      $(".nsm_whats_new_strip").css({
        height: `calc( 100vh )`,
      });
      $(".scrolling-wrapper-title").hide();
    } else {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // bottom: "90%",
        },
        {
          bottom: "0px",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", COLLAPSE_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
      $(".whats-new-scrolling-wrapper").css({
        height: `calc( 80vh - ${diffHeight}px)`,
      });
      $(".nsm_whats_new_strip").css({
        height: `calc( 100vh )`,
      });
      $(".scrolling-wrapper-title").show();
    }
  });

  $(".halfexpand_icon").click(function () {
    var bottom = $(".nsm_whats_new_strip").css("bottom");
    bottom = Math.abs(parseInt(bottom));

    console.log(
      "halfexpand_icon document height,innerHeight,bottom,outerHeight==>",
      {
        bottom,
        window_height,
        window_innerHeight,
        window_outerHeight,
        document_height,
        document_innerHeight,
        document_outerHeight,
      }
    );

    var __duration = GLOBLE_ANIMATION_DURATION;
    var diffHeight = document_height - window_height;

    // When whats new section opened in full
    if (bottom == 0) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // bottom: "90%",
        },
        {
          bottom: "-92%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        EXPAND_ICON_HALF
      );
      $(".whats-new-scrolling-wrapper").css({ height: "unset" });
      $(".nsm_whats_new_strip").css({
        height: `calc( 100vh + ${diffHeight}px)`,
      });
      $(".scrolling-wrapper-title").hide();
    } else if (bottom > 200 && bottom < 500) {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // bottom: "90%",
        },
        {
          bottom: "-92%",
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        EXPAND_ICON_HALF
      );
      $(".whats-new-scrolling-wrapper").css({ height: "unset" });
      $(".nsm_whats_new_strip").css({
        height: `calc( 100vh + ${diffHeight}px)`,
      });
      $(".scrolling-wrapper-title").hide();
    } else {
      gsap.fromTo(
        ".nsm_whats_new_strip",
        {
          // bottom: "90%",
        },
        {
          bottom: whatsNewBottomFormatted,
          duration: __duration,
        }
      );

      $(".nsm_whats_new_strip .expand_icon img").attr("src", EXPAND_ICON);
      $(".nsm_whats_new_strip .halfexpand_icon img").attr(
        "src",
        COLLAPSE_ICON_HALF
      );
      $(".whats-new-scrolling-wrapper").css({ height: "unset" });
      $(".nsm_whats_new_strip").css({
        height: `calc( 100vh )`,
      });
      $(".scrolling-wrapper-title").hide();
    }
  });

  var el = document.getElementById("body");
  swipedetect(el, function (swipedir) {
    console.log("You just swiped " + swipedir);
    var top = $(".nsm_whats_new_strip").css("top");
    if (parseInt(top) > 500) {
      initAnimation(swipedir);
    }
  });

  $("#fullpage").bind("mousewheel wheel", function (event) {
    var top = $(".nsm_whats_new_strip").css("top");
    const { deltaX, deltaY, wheelDelta, detail } = event.originalEvent;
    const __isTrackPad = isTrackPad(event.originalEvent);

    // console.log("event.originalEvent", {
    //   deltaX,
    //   deltaY,
    //   wheelDelta,
    //   detail,
    //   __isTrackPad,
    //   isAnimating,
    //   ANIMATION_TIMEOUT_MS,
    //   top
    // });

    // check if aleady animating
    if (isAnimating) return false;

    if (parseInt(top) > 500) {
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
  } else if (type == "up") {
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
      top: `${halfBottom - arrowHeight}px`,
    },
    {
      top: `${(halfBottom - arrowHeight) * 2}px`,
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
      top: "-30%",
      // ease: "power3.out",
      duration: __duration,
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

  // nsm_whats_new_strip from bottom
  gsap.fromTo(
    ".nsm_whats_new_strip",
    {
      opacity: 0,
      // top: "100%",
    },
    {
      opacity: 1,
      bottom: "-92%",
      duration: __duration,
    }
  );

  $(".nsm_whats_new_strip").css({
    height: `calc( 100vh + ${diffHeight}px)`,
  });

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

  $(".nsm_whats_new_strip").css({
    height: `calc( 100vh )`,
  });
  
  gsap.fromTo(
    ".nsm_whats_new_strip",
    {
      // bottom: "90%",
    },
    {
      bottom: whatsNewBottomFormatted,
      duration: __duration,
    }
  );

  // position scroll button
  gsap.fromTo(
    ".nsm_mobile_arrow",
    {
      top: `${(halfBottom - arrowHeight) * 2}px`,
    },
    {
      top: `${halfBottom - arrowHeight}px`,
      duration: 1,
    }
  );

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
      top: "-30%",
    },
    {
      top: "20%",
      // ease: "power3.out",
      duration: __duration,
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
