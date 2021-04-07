//=== Page navigation ============================================================================

//--- set prefix for paths to make all pages work equal on both localhost and gh-pages
let pathPrefix = "";

if (window.location.hostname === "localhost") {
  pathPrefix = "";
} else {
  pathPrefix = "gaspid-JSFE2021Q1/online-zoo";
}

//--- gets navigation parent and items (links)
const navPanel = document.querySelector(".header__nav-list");
const navLink = navPanel.querySelectorAll(".header__nav-link");

//--- loads default page after website closed
//---record current page into the memory (I made it to avoid making new headers for every page)
let loadPage = "/index.html";

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("load-page")) {
    loadPage = localStorage.getItem("load-page");
  }
  if (window.location.pathname == "/" || window.location.pathname == "/index.html") {
    loadPage = "/index.html";
    localStorage.removeItem("load-page");
  }
  setCurrentPage(loadPage);
});

function setCurrentPage(loadPage) {
  navLink.forEach(link => {
    if (link.getAttribute("href") == loadPage) {
      setActiveLink(link);
    }
  });
}

//--- sets active link
  function setActiveLink(link) {
    localStorage.setItem("load-page", link.getAttribute("href"));
    navLink.forEach(link => {
      link.parentElement.classList.remove("header__nav-item--active");
    });
    link.parentElement.classList.add("header__nav-item--active");
    }

//--- listens links for a click and sends to a target page
navLink.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    if (e.target.getAttribute("href") != "") {
      if (!e.target.getAttribute("href").includes("//")) {
        setActiveLink(e.target);
      }
      window.location.pathname = pathPrefix + e.target.getAttribute("href");
    }
  });
});

//=== Slider ============================================================================

//--- gets all existing sliders
const sliders = document.querySelectorAll(".slider");

//--- prepares two-digit-number for sliders' paginations
function setTwoDigits(num) {
  num = parseInt(num);
  return num.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
}

//--- following block for every slider on the page
sliders.forEach(slider => {
  const scrollBar = slider.querySelector(".slider__scroll-bar");
  const sliderContainer = slider.querySelector(".slider__container");
  const paginationNum = slider.querySelector(".slider__pagination-num");
  const paginationSum = slider.querySelector(".slider__pagination-sum");
  const sliderItems = slider.querySelectorAll(".slider__item");
  const sliderBtnRight = slider.querySelector(".slider__btn-right");
  const sliderBtnLeft = slider.querySelector(".slider__btn-left");
  const scrollThumb = slider.querySelector(".slider__scroll-thumb");
  const sliderSize = parseInt(getComputedStyle(sliderItems[0]).getPropertyValue("flex-basis"));
  const thumbWidth = Math.ceil(scrollBar.offsetWidth / sliderItems.length);
  let prevBarValue = 0;

  //--- sets width of hidden scroll bar thumb / made for firm scroll bar navigation when click on scroll bar
  slider.style.setProperty("--thumb-width", thumbWidth + "px");

  //--- moves slides with chosen step which is set as moveslides data-attribute
  function moveSlides() {
    scrollBar.setAttribute("step", slider.getAttribute("moveslides"));
    sliderContainer.style.left = (scrollBar.value - 1) * -1 * sliderSize + "%";
  }

  //--- sets scroll bar customized thumb position and width
  function setThumb(num) {
    scrollThumb.style.left = ((scrollBar.value - 1) / num) * 100 + "%";
    scrollThumb.style.right = 100 - (scrollBar.value / num) * 100 + "%";
    scrollBar.setAttribute("max", num);
  }

  //--- sets slider pagination (in particular changable part) in format '00/00'
  //--- ...and also sets way of the thumb transition
  function setPagination() {
    paginationNum.innerText = `${setTwoDigits(scrollBar.value)}/`;

    if (scrollBar.value > prevBarValue) {
      scrollThumb.style.transitionProperty = "left";
    } else {
      scrollThumb.style.transitionProperty = "right";
    }
    prevBarValue = scrollBar.value;
  }

  //--- sets slider left and right buttons
  function setSliderBtns() {
    if (!sliderBtnLeft || !sliderBtnRight) {
      return;
    }
    sliderBtnLeft.style.pointerEvents = "auto";
    sliderBtnRight.style.pointerEvents = "auto";
    if (scrollBar.value == 1) {
      sliderBtnLeft.style.pointerEvents = "none";
    }
    if (scrollBar.value == sliderItems.length) {
      sliderBtnRight.style.pointerEvents = "none";
    }
  }

  //--- sets slider pagination total slides number
  paginationSum.innerText = setTwoDigits(sliderItems.length);

  setThumb(sliderItems.length);
  setPagination();
  setSliderBtns();

   scrollBar.addEventListener("input", () => {
    moveSlides();

    setPagination();

    setThumb(sliderItems.length);
  });

  slider.addEventListener("click", e => {
    if (e.target.classList.contains("slider__btn-right")) {
      scrollBar.value = parseInt(scrollBar.value) + 1;
      setPagination();
      moveSlides(slider.getAttribute("moveslides"));
      setThumb(sliderItems.length);
      setSliderBtns();
    }
    if (e.target.classList.contains("slider__btn-left")) {
      scrollBar.value = parseInt(scrollBar.value) - 1;
      setPagination();
      moveSlides(slider.getAttribute("moveslides"));
      setThumb(sliderItems.length);
      setSliderBtns();
    }
  }); 
});

var checkBox = document.getElementById('cb');

var theme = window.localStorage.getItem('data-theme');
if(theme) document.documentElement.setAttribute('data-theme', theme);
checkBox.checked = theme == 'dark' ? true : false;

checkBox.addEventListener('change', function () {
  if(this.checked){
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('data-theme', 'light');
  }
});