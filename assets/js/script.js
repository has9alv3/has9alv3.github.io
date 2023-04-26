'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalTime = document.querySelector("[data-modal-time]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    /*
    switch (modalTitle.innerHTML){
      case "SW마이스터고 연합해커톤":
        modalTime.innerHTML = "Oct 5 ~ 7, 2022";
        break;
      case "STA+C 2022 생활정보부문":
        modalTime.innerHTML = "Sep 20 ~ Oct 29, 2022"
        break;
      case "제 20회 앱잼(APPJAM)":
        modalTime.innerHTML = "Dec 18 ~ 19, 2021"
        break;
    }
    */
    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// add event to submit button
formBtn.addEventListener("click", function (event) {
  event.preventDefault(); // prevent default form submission behavior
  const formData = new FormData(form);
  const fullName = formData.get("fullname"); // replace with your field id
  const email = formData.get("email"); // replace with your field id
  const message = formData.get("message"); // replace with your field id
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeILtZvWr_sYF686_MKoTHIUm9gAJk3UqlNz_BNvEeILy5jHQ/formResponse"; // replace with your form url

  const xhr = new XMLHttpRequest();
  xhr.open("POST", formUrl);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log("Form submitted successfully!");
      form.reset();
      formBtn.innerText = "Sent Successfully";
      formBtn.setAttribute("disabled", "");
    }
  };
  xhr.send(`entry.1726207689=${encodeURIComponent(fullName)}&entry.1436039049=${encodeURIComponent(email)}&entry.2060113445=${encodeURIComponent(message)}`);
});




// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}
const uls = document.querySelectorAll("nav ul");
const links = [...document.querySelectorAll("nav button")];
const light = document.querySelector("nav .tubelight");
const ray = document.querySelector(".light-ray");
let activeIndex = 0;
let currentIndex = 0;
let increment = 1;

function resizeTubelight() {
  const activeLink = document.querySelector('.navbar-link.active');
  if (activeLink) {
    light.style.width = `${activeLink.offsetWidth}px`;
    light.style.left = `${activeLink.offsetLeft + activeLink.offsetWidth / 2}px`;
    ray.style.width = `${activeLink.offsetWidth*1.6}px`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  resizeTubelight();
});

window.addEventListener("load", () => {
  resizeTubelight();
});

window.addEventListener('resize', resizeTubelight);

links.forEach((link, index) =>
{
  if (links[index].classList.contains("active"))
    {
    light.style.width = `${links[index].offsetWidth}px`;
    light.style.left = `${links[index].offsetLeft + links[index].offsetWidth/2}px`;
        ray.style.width = `${links[index].offsetWidth*1.6}px`;
    }
  link.addEventListener("click", (e) =>
    {
    activeIndex = index;
    let t = setInterval(() =>
        {
      if (activeIndex > currentIndex) increment = 1;
      else if (activeIndex < currentIndex) increment = -1;
      currentIndex += increment;

      links[currentIndex].classList.add("active");
      if (currentIndex != -1)
        links[currentIndex - increment].classList.remove("active");

      if (currentIndex == activeIndex)
            {
        e.target.classList.add("active");
        increment = 0;
        clearInterval(t);
      }
    }, 50);
    light.style.width = `${e.target.offsetWidth}px`;
    light.style.left = `${e.target.offsetLeft + e.target.offsetWidth/2}px`;
        ray.style.width = `${e.target.offsetWidth*1.6}px`;
  });
});















// CUstomized

// For up down of chevron icon
const btn = document.querySelector('.info_more-btn');

btn.addEventListener('click', function() {
  this.classList.toggle('up');
});

const button = document.getElementById("contact-btn");
const span = button.querySelector("span");

button.addEventListener("click", () => {
  if (span.innerText === "Show Contacts") {
    span.innerText = "Hide Contacts";
  } else {
    span.innerText = "Show Contacts";
  }
});



// For Instagram
function redirectToInstagram() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var instagramUrl = "https://www.instagram.com/has9alv3/";

  if (isMobile) {
    window.location.href = "instagram://user?username=has9alv3";
    setTimeout(function() {
      window.open(instagramUrl, '_blank');
    }, 1500);
  } else {
    window.open(instagramUrl, '_blank');
  }
}

// For Facebook
function redirectToFacebook() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var facebookUrl = "https://www.facebook.com/has9alv3";

  if (isMobile) {
    window.location.href = "fb://profile/100007540508074";
    setTimeout(function() {
      window.open(facebookUrl, '_blank');
    }, 1500);
  } else {
    window.open(facebookUrl, '_blank');
  }
}

// For Twitter
function redirectToTwitter() {
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  var twitterUrl = "https://twitter.com/has9alv3";

  if (isMobile) {
    window.location.href = "twitter://user?screen_name=has9alv3";
    setTimeout(function() {
      window.open(twitterUrl, '_blank');
    }, 1500);
  } else {
    window.open(twitterUrl, '_blank');
  }
}

// For Telegram
function redirectToTelegram() {
  var telegramUrl = "https://t.me/has9alv3"; // Replace with your Telegram username or profile URL
  window.open(telegramUrl, '_blank');
}


const listItems = document.querySelectorAll('.clients-item');

listItems.forEach(listItem => {
  const image = listItem.querySelector('img');
  listItem.addEventListener('click', function() {
    const popup = document.createElement('div');
    popup.classList.add('popup');

    const img = document.createElement('img');
    img.src = image.src;
    popup.appendChild(img);

    const close = document.createElement('span');
    close.innerHTML = '&times;';
    close.classList.add('popup-close');
    close.addEventListener('click', function() {
      document.body.removeChild(popup);
    });
    popup.appendChild(close);

    popup.addEventListener('click', function(event) {
      if (event.target === this) {
        document.body.removeChild(popup);
      }
    });

    document.body.appendChild(popup);
  });
});


