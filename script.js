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

// desktop event listeners
randomTextButton.addEventListener("click", function() {
  if (contentArea.classList.contains("content-display")) {
    for (let i = 0; i < contentAreaChild.length; i++) {
      contentAreaChild[i].classList.remove("section-display");
    }
  }

  contentArea.classList.add("content-display");
  
  removeAbout();
  nextText();
});

allTextButton.addEventListener("click", function() {
  for (let i = 0; i < contentAreaChild.length; i++) {
    contentAreaChild[i].classList.add("section-display");
  }
  
  removeAbout();
});

// mobile event listeners




// if on mobile, update about text for mobile context
document.addEventListener("click", function() {
  let mobileWidth = window.matchMedia("(max-width: 1023px)");
  if (mobileWidth.matches) {
    function newStr() {      
      let aboutText = aboutSection.textContent;

      aboutText.replace(str, "");
    };

    let str = "click below";
    let iphoneStr = "please rotate your phone or find your way below"; //https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
    let mobileOtherStr = "find your way below"; //if not ios 4.2 or greater, different string - can test on android
    newStr();
    console.log("attempt");
  }
});


function tiltedTao() {
  // todo mobile interactivity / deeply moving the phone
}

/*

todo HTML 
image stack like from the video for a more modern approach
get the glitch icon to show up desktop and mobile
make buttons actual button tags

todo CSS
UI - how to add interactivity and animations, make it look modern, smooth it out
class="scroll" pretty loading

todo JS
mobile about text context depending on phone
mobile UX with phone interactivity
buttons moving +1 background-position so it is flowing - but only on about? or what?

bug - 
if you scroll down in next text, then go to random, and if random is bigger than the overflow-y, then start at the top
  sectionIdName.scrollIntoView({block: "start", behavior: "auto"});


*/
