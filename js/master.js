//Add selectors
let icon = document.querySelector(".settings-box .icon-container");
let settingsBox = document.querySelector(".settings-box ");
let fontIcon = document.querySelector(".settings-box .icon-container .icon");
let lis = document.querySelectorAll(".settings-box .settings-container ul li");
let landing = document.querySelector(".landing");
let inputRadios = document.querySelectorAll(
  ".settings-box .settings-container form input[type='radio']"
);
let randomBackgSpanEle = document.querySelectorAll(
  ".settings-box .settings-container .option-box .random-backgrounds .options span"
);
let changingBakcgroundInterval;
let buttonToup = document.querySelector(".totop");

// Make the Main Color The Color That Stored
if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );

  lis.forEach((li) => {
    li.dataset.color == localStorage.getItem("color")
      ? li.classList.add("active")
      : li.classList.remove("active");
  });
}

let chageBackground = true;
// Make the Random Backgrounds Option That Stored
if (localStorage.getItem("random backgrounds")) {
  chageBackground = JSON.parse(localStorage.getItem("random backgrounds"));
  changeBackgrounds();
} else {
  changeBackgrounds();
}

//A variable To Manage The Changing Bckground Option

// What The User Would Like To Do About The Backgrounds Changing
randomBackgSpanEle.forEach((span) => {
  span.addEventListener("click", (event) => {
    event.target.dataset.background === "yes"
      ? (chageBackground = true)
      : (chageBackground = false);
    localStorage.setItem("random backgrounds", chageBackground);
    changeBackgrounds();
  });
});

//A Function to change The Background Depending on The setting option
function changeBackgrounds() {
  if (chageBackground) {
    let numOfImages = 7;
    let currImage = Math.floor(Math.random() * numOfImages);
    //Make The Background First Image (1)
    landing.style.backgroundImage = `url(images/landing${currImage}.jpg)`;
    // MAke The Background change every specifi Time
    changingBakcgroundInterval = setInterval((ele) => {
      currImage = Math.floor(Math.random() * numOfImages);
      landing.style.backgroundImage = `url(images/landing${currImage}.jpg)`;
    }, 10000);
  } else {
    clearInterval(changingBakcgroundInterval);
  }
}

//Start Settings Box
// Make The Action
icon.onclick = (e) => {
  //If Not Open Make it So via versa
  settingsBox.classList.toggle("open");

  //If Does not Moving Make If Move And Via Versa
  fontIcon.classList.toggle("fa-spin");
};

// Make The Color Change

lis.forEach((li) => {
  li.addEventListener("click", (e) => {
    handleActive(e.target);
    document.documentElement.style.setProperty(
      `--main-color`,
      e.target.dataset.color
    );
    yes.checked = false;
    no.checked = false;
    window.localStorage.removeItem("color");
  });
});

// Making The Color Default

inputRadios.forEach((input) => {
  input.addEventListener("change", (e) => {
    e.target.value == "yes"
      ? window.localStorage.setItem(
          "color",
          `${getComputedStyle(document.documentElement).getPropertyValue(
            "--main-color"
          )}`
        )
      : window.localStorage.removeItem("color");
  });
});

//Add And Remove Active For Random Backgrounds

randomBackgSpanEle.forEach((span) => {
  span.addEventListener("click", (event) => {
    handleActive(event.target);
  });
  if (chageBackground) {
    randomBackgSpanEle.forEach((ele) => {
      ele.classList.remove("active");
      if (ele.dataset.background === "yes") {
        ele.classList.add("active");
      }
    });
  } else {
    randomBackgSpanEle.forEach((ele) => {
      ele.classList.remove("active");
      if (ele.dataset.background === "no") {
        ele.classList.add("active");
      }
    });
  }
});

// Making The Skills Progress
let allProgresses = document.querySelectorAll(
  ".our-skills .container .skills .skill .skill-progress span"
);
let ourSkillsSection = document.querySelector(".our-skills");

window.onscroll = function () {
  let skillsOffSetTop = ourSkillsSection.offsetTop;

  let skillsOuterHeight = ourSkillsSection.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffSetTop + skillsOuterHeight - windowHeight) {
    // Make The Progress According to data-prog
    allProgresses.forEach((ele) => {
      ele.style.width = `${ele.dataset.prog}`;
    });

    let timer = setInterval((ev) => {
      document.documentElement.style.setProperty("--opaciti-for-psodu", `1`);
      clearInterval(timer);
    }, 800);
  }

  //To Top Button
  //Show And Hide The To Top Button
  if (+window.scrollY >= document.body.scrollHeight / 4) {
    buttonToup.classList.add("show-totop");
  } else {
    buttonToup.classList.remove("show-totop");
  }
};

// Top Button Functionality
buttonToup.onclick = function (e) {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

// Making The PopUp
let images = document.querySelectorAll(".gallary .container .image-box img");

images.forEach((image) => {
  image.addEventListener("click", function (e) {
    //Add The OverLay
    let overLayPopup = document.createElement("div");
    console.log(overLayPopup);
    overLayPopup.classList.add("popup-overlay");
    document.body.appendChild(overLayPopup);

    //Add The Popup-Box
    let popup = document.createElement("div");

    //Add Classes For Styling
    popup.className = "popup-box";

    //Add The Heading

    if (e.target.alt != null) {
      let heading = document.createElement("h2");
      let headingText = document.createTextNode(`${e.target.alt}`);
      heading.appendChild(headingText);
      console.log(heading);
      heading.className = "popup-heading";
      popup.appendChild(heading);
    }

    let indexOfCurrent = 0;
    //Looping through the Images To Know The Index Of Current
    for (let i = 0; i < images.length; i++) {
      if (e.target.src === images[i].src) {
        indexOfCurrent = i;
        break;
      }
    }
    // creat the left and right div

    let rigthArrow = document.createElement("div");
    rigthArrow.classList.add("right");
    let leftArrow = document.createElement("div");
    leftArrow.classList.add("left");

    //Add Container to the Image
    // Add The Arrows To PopUp
    popup.appendChild(rigthArrow);
    popup.appendChild(leftArrow);

    let imageContainer = document.createElement("div");
    popup.appendChild(imageContainer);

    //Creat The Imag
    let imgageForPopup = document.createElement("img");
    imgageForPopup.src = e.target.src;
    imageContainer.appendChild(imgageForPopup);
    document.body.appendChild(popup);

    //Add Event Listener for The Arrows
    rigthArrow.onclick = function (e) {
      document.querySelector(".popup-box img ").src =
        images[indexOfCurrent].src;
      console.log(document.querySelector(".popup-box img ").src);
    };

    // Creat The Exit Button
    let popupButton = document.createElement("span");
    let buttonText = document.createTextNode("X");
    popupButton.appendChild(buttonText);
    popupButton.className = "close-button";
    popup.appendChild(popupButton);
  });
});

//Close Popup
document.addEventListener("click", (event) => {
  if (event.target.className === "close-button") {
    event.target.parentElement.remove();

    document.querySelector(".popup-overlay").remove();
  } else if (event.target.className === "popup-overlay") {
    event.target.remove();

    document.querySelector(".popup-box").remove();
  }
});

//Making The Scrolling for Bullets
let bullets = document.querySelectorAll(".bullet");
scrolligToSection(bullets);

//Making The Scrolling for Links
let links = document.querySelectorAll(".list li:not(.active) a ");
scrolligToSection(links);

function scrolligToSection(group) {
  group.forEach((link) => {
    link.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
      e.preventDefault();
    });
  });
}

//Remove Active And Maky The Clicked Active
function handleActive(ev) {
  let evList = ev.parentElement.querySelectorAll(".active");
  //Remove Active From All
  evList.forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.classList.add("active");
}

//Making The Active For Bullets Option
let bulletOptions = document.querySelectorAll(".bullet-option .options span");
let bulletList = document.querySelector(".bullets");

//Check For Local Storage
if (localStorage.getItem("bullets-option")) {
  if (localStorage.getItem("bullets-option") === "yes") {
    showBullets();
    bulletOptions.forEach((opt) =>
      opt.dataset.ans === "yes"
        ? opt.classList.add("active")
        : opt.classList.remove("active")
    );
  } else {
    hideBullets();
    bulletOptions.forEach((opt) =>
      opt.dataset.ans === "no"
        ? opt.classList.add("active")
        : opt.classList.remove("active")
    );
  }
}

bulletOptions.forEach((opt) => {
  opt.addEventListener("click", (ev) => {
    handleActive(ev.target);
    if (ev.target.dataset.ans === "yes") {
      if (bulletList.classList.contains("hide-bullet")) {
        showBullets();
        localStorage.setItem("bullets-option", "yes");
      }
    } else if (ev.target.dataset.ans === "no") {
      if (!bulletList.classList.contains("hide-bullet")) {
        hideBullets();
        localStorage.setItem("bullets-option", "no");
      }
    }
  });
});

function showBullets() {
  bulletList.style.display = "block";
  let oneSec = setInterval(() => {
    bulletList.classList.remove("hide-bullet");
    clearInterval(oneSec);
  }, 0);
}

function hideBullets() {
  bulletList.classList.add("hide-bullet");
  let oneSec = setInterval(() => {
    bulletList.style.display = "none";
    clearInterval(oneSec);
  }, 550);
}

// Reset Option
let resetButton = document.querySelector(".settings-box .reset-option button ");

resetButton.onclick = function (e) {
  localStorage.clear();
  window.location.reload();
};

//Toggle Menue
let menueButton = document.querySelector(".landing .header-area .icon");
let iconBars = document.querySelector(".landing .header-area .icon i");
let tList = document.querySelector(".landing .header-area .list");

//Stop Propagation on the menu
tList.onclick = function (e) {
  e.stopPropagation();
};

menueButton.onclick = function (e) {
  e.stopPropagation();
  menueButton.classList.toggle("open-arrow");
  tList.classList.toggle("open");
};
document.documentElement.onclick = function (e) {
  if (e.target !== menueButton && e.target !== tList) {
    //Check if it is open or not
    if (tList.classList.contains("open")) {
      tList.classList.remove("open");
      menueButton.classList.remove("open-arrow");
    }
  }
};
