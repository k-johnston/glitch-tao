// global variables
const contentArea = document.getElementById("content");
const contentAreaChild = document.getElementsByTagName("section");
const aboutSection = document.getElementById("about");

const randomTextButton = document.getElementById("random");
const allTextButton = document.getElementById("all");

// randomly choose a passage
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function nextText() {
  let numberForId = getRandomInt(81) + 1;
  let concatIdName = "tao" + numberForId;
  let sectionIdName = document.getElementById(concatIdName);
  sectionIdName.classList.add("section-display");
}

function removeAbout() {
  let ornamental = document.getElementById("ornamental");
  ornamental.style.display = "block";

  aboutSection.style.display = "none";
}

// read all sections
randomTextButton.addEventListener("click", function() {
  if (contentArea.classList.contains("content-display")) {
    for (let i = 0; i < contentAreaChild.length; i++) {
      contentAreaChild[i].classList.remove("section-display");
    }
  }

  contentArea.classList.add("content-display");

  removeAbout();
  nextText();
  setTimeout(fadeFocus(), 500);
});

allTextButton.addEventListener("click", function() {
  for (let i = 0; i < contentAreaChild.length; i++) {
    contentAreaChild[i].classList.add("section-display");
  }

  removeAbout();
  setTimeout(fadeFocus(), 500);
  adaptAllButton();
});

// if on mobile, update about text for mobile context
document.addEventListener("DOMContentLoaded", function() {
  console.log(
    window.innerWidth +
      " vw"
  );
  let mobileWidth = window.innerWidth;

  if (mobileWidth >= 1024) {
    console.log("no text change / biggest screen");
  } else {
    let mobileIOS = navigator.userAgent.includes("iP"); // iPad, iPhone, iPod but not Mac desktop computers

    function wordChange() {
      let mobileText = document.getElementById("text-change");

      if (mobileWidth <= 1023 && mobileIOS == true) {
        console.log("tilt screen iOS");
        mobileText.innerHTML = "tilt your device to find your way";
      } else {
        console.log("non-iOS mobile");
        mobileText.innerHTML = "find your way below";
      }
    }
    wordChange();
  }
});

// todo
// mobile interactivity
// https://developer.mozilla.org/en-US/docs/Web/API/Window/devicemotion_event
// https://css-tricks.com/how-to-make-a-smartphone-controlled-3d-web-game/
// https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation      with polyfill
window.addEventListener("devicemotion", function tiltedTao(event) {
  let tiltObj = {alpha: null, beta: null, gamma: null}; // speed of moving?
  let tiltMotion = event.acceleration.x;
  // i want beta - x axis
  // initial false state of no moving
  // when device is moving down
  // how long fast? - when device is coming back up
    // call nextText();
  // what if wrong movement?
  // back to state of no moving
  
  // rotationRate degrees per second

  
  if (tiltMotion > 10) {
    contentArea.style.border = "3px solid blue";
  } else if (tiltMotion < -10) {
    contentArea.style.border = "3px solid red";
  } else if (tiltMotion == "double") {
    contentArea.style.border = "3px solid yellow";
  }
});



function handleMotionEvent(event) {

    var x = event.accelerationIncludingGravity.x;
    var y = event.accelerationIncludingGravity.y;
    var z = event.accelerationIncludingGravity.z;

    // Do something awesome.
}
window.addEventListener("devicemotion", handleMotionEvent, true);

// todo
// intersection observer in "all"
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
// use case 3 https://css-tricks.com/a-few-functional-uses-for-intersection-observer-to-know-when-an-element-is-in-view/
function adaptAllButton() {
  let scrollOptions = {
    root: contentArea,
    rootMargin: "0px",
    threshold: 0.1
  };

  let scrollTarget = document.getElementById("tao10");
  let scrollObserver = new IntersectionObserver(scrollCallback, scrollOptions);
  let scrollCallback = (entries, scrollObserver) => {
    entries.forEach(entry => {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      console.log("success");
      // add ^ top in inner html of all button when scrolled down far enough
      // button is disabled when on all text before ^ is added - might need to reenable again with random
    });
  };

  scrollObserver.observe(scrollTarget);
  // will need to unobserve?
}

// bug fix - focus was sticky, this removes it after .5s when called
function fadeFocus() {
  if (
    document.activeElement == randomTextButton ||
    document.activeElement == allTextButton
  ) {
    console.log("blur");
    document.activeElement.blur();
  }
}

// todo
// bug fix - scroll in objects bigger than vh of contentArea
//if you scroll down in next text, then go to random, and if random is bigger than the overflow-y, then start at the top
//sectionIdName.scrollIntoView({block: "start", behavior: "auto"});

// todo
// bug fix - when on all text page - have to double click random button twice to go to a passage sometimes - expects once

/*
todo

1. todos in text - can remove event listeners - is this helpful?
adaptAllButton() intersection observer
tiltedTao() mobile interactivity
bug fix scroll height
bug fix doubleclick random double click button

2. test across device and cross-browser - what tests do i need to do?
test on tunnelbear for non-german ip to see gutenberg link, test on iphone, ipads, samsung, browsers
test accelerometer on data and browsers on phones

3. anything else after testing across devices?
do i want error messaging / encouragement for the tilt if it isn't deep/fast enough
background on button on mobile does not fade - do i really want a blurred effect, maybe i want a push in effect instead? or fix with js? - css animation fade out?????????
scroll on phone
how to minimize the url and bottom nav to get full 100%

4. remove console logs

5. blog post of what i learned
more about JavaScript and structuring it - good sense of when multiple options, something won't work

*/