window.addEventListener("load", () => {
    /*-----------------  Page Loader ----------------*/
    document.querySelector(".page-loader").classList.add("slide-out-right");

    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none";
    }, 1000);
});





/*======================= Bg Animation Effect ===========*/
function bgAnimationItems() {
    const rows = 7,
        cols = 10;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j+1}`;
            document.querySelector(".bg-animation-effect").appendChild(div);
        }
    }
}
bgAnimationItems();



/*================= Toggle Navbar ================*/
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open");
    toggleOverlayEffect();
    toggleBodyScrolling();
}

// Hide And Show Profile Img Full Width
let profileImg = document.querySelector(".preview_full-img");
let previewBtn = document.querySelector(".preview_img");
let btnCloseen = document.querySelector(".close_profile");

previewBtn.addEventListener("click", () => {
    profileImg.classList.add("show");
    toggleBodyScrolling();
});
btnCloseen.addEventListener("click", () => {
    profileImg.classList.remove("show");
    toggleBodyScrolling();
});



/*===============  Hide  & show Section  ==================*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        const hash = e.target.hash;
        if (e.target.classList.contains("nav-item")) {
            activeSection(hash);
            toggleNavbar();
        } else {
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector(".nav-toggler").classList.add("toggle-hide");
            setTimeout(() => {
                activeSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav-toggler").classList.remove("toggle-hide");
            }, 950);
        }
    }
});

function activeSection(sectionId) {
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    window.scrollTo(0, 0);
}


/* ============= Toggle Overlay Effect =======================*/
function toggleOverlayEffect() {
    document.querySelector(".overlay-effect").classList.toggle("active");
}


/* ============= Toggle Body Scrolling =======================*/
function toggleBodyScrolling() {
    document.body.classList.toggle("hide-scrolling");
}

/* ============= Filter Portfolio Items =======================*/
const filterBtnsContainer = document.querySelector(".portfolio-filter");
let portfolioItems;

filterBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio-filter-btn") && !e.target.classList.contains("active")) {
        filterBtnsContainer.querySelector(".active").classList.remove("active")
        e.target.classList.add("active");
        toggleBodyScrolling();
        document.querySelector(".filter-status").classList.add("active");
        document.querySelector(".filter-status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> works`;
        setTimeout(() => {
            filterItems(e.target);
        }, 400);
        setTimeout(() => {
            document.querySelector(".filter-status").classList.remove("active");
            toggleBodyScrolling();
        }, 800);
    }
})


/*=============== Filter Items when click category Buttons =================*/
function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter");
    document.querySelectorAll(".portfolio-item").forEach((item) => {
        const category = item.getAttribute("data-category").split(",");
        if (category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        } else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio-item.show");
}


// filter active category Portfolio Items
filterItems(document.querySelector(".portfolio-filter-btn.active"));


/* ============= Portfolio Item Details Popup ====================*/
let portfolioItemIndex;

document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item")) {
        const currentItem = e.target.closest(".portfolio-item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemDetails();
        updateNextPrevItem();
    }
});

/*============= Open and Close Portfolio Popup =============*/
function togglePopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp-close-btn").addEventListener("click", togglePopup);


/*===============  Add details when click in one of items ===================*/

function portfolioItemDetails() {

    document.querySelector(".pp-thumbnail img").src = portfolioItems[portfolioItemIndex].querySelector("img").src;
    document.querySelector(".pp-header h3").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-title").innerHTML;
    document.querySelector(".pp-body").innerHTML = portfolioItems[portfolioItemIndex].querySelector(".portfolio-item-details").innerHTML;
    document.querySelector(".pp-counter").innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio-filter-btn.active").innerHTML}</span>)`;
}



function updateNextPrevItem() {
    if (portfolioItemIndex !== 0) {
        document.querySelector(".pp-footer-left").classList.remove("hidden");
        document.querySelector(".pp-footer-left h3").innerHTML = portfolioItems[portfolioItemIndex - 1].querySelector("h3").innerHTML;
        document.querySelector(".pp-footer-left img").src = portfolioItems[portfolioItemIndex - 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-left").classList.add("hidden");
    }


    if (portfolioItemIndex !== portfolioItems.length - 1) {
        document.querySelector(".pp-footer-right").classList.remove("hidden");
        document.querySelector(".pp-footer-right h3").innerHTML = portfolioItems[portfolioItemIndex + 1].querySelector("h3").innerHTML;
        document.querySelector(".pp-footer-right img").src = portfolioItems[portfolioItemIndex + 1].querySelector("img").src;
    } else {
        document.querySelector(".pp-footer-right").classList.add("hidden");
    }
}

// when click in prev and next Buttons
document.querySelector(".pp-prev-btn").addEventListener("click", () => {
    changePortfolioItem("prev");
});
document.querySelector(".pp-next-btn").addEventListener("click", () => {
    changePortfolioItem("next");
});



function changePortfolioItem(direction) {
    if (direction == "prev") {
        portfolioItemIndex--;
    } else {
        portfolioItemIndex++;
    }

    document.querySelector(".pp-overlay").classList.add(direction);

    setTimeout(() => {
        document.querySelector(".pp-inner").scrollTo(0, 0);
        portfolioItemDetails();
        updateNextPrevItem();
    }, 400);
    setTimeout(() => {
        document.querySelector(".pp-overlay").classList.remove(direction);
    }, 1000);
}


/*=============== Toggle Contact Form ===================*/

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-contact-form-btn")) {
        document.querySelector(".contact-form").classList.toggle("open");
        toggleBodyScrolling();
    }
});



/*======================= Cursor Effect ===========*/
let cursor1 = document.querySelector(".cursor1");
let cursor2 = document.querySelector(".cursor2");

document.addEventListener("mousemove", function(e) {
    let mainCursor = document.querySelector(".cursor_parent");
    mainCursor.style.display = "block";

    cursor1.style.cssText = cursor2.style.cssText = "left: " + e.clientX + "px; top: " + e.clientY + "px";
})



/* ===========================================================
Color Switcher
==========================================================*/
let btns = document.querySelectorAll('.theme-buttons');
let root = document.querySelector(':root');
// Show the switcher color div
document.querySelector('.switcher-btn').onclick = () => {
    document.querySelector('.color-switcher').classList.toggle('active');
};
btns.forEach((item) => {
    item.addEventListener('click', (e) => {
        // remove All active class
        btns.forEach((item) => {
            item.classList.remove("active");
        });
        // Add Active Class To current Element
        e.currentTarget.classList.add("active");
        // Add color to Local Storage
        window.localStorage.setItem("color", e.currentTarget.dataset.color);
        // change main color
        root.style.setProperty('--main-color', e.currentTarget.dataset.color);
    });
});
/*=============== Check Local Storage ===============*/
if (window.localStorage.getItem("color")) {
    // [1] Add Main color to page
    root.style.setProperty('--main-color', window.localStorage.getItem("color"));
    // [2] Remove active class From All items
    btns.forEach((item) => {
        item.classList.remove("active");
    });
    // [3] Add active class to current color
    document.querySelector(`[data-color="${window.localStorage.getItem("color")}"]`).classList.add("active");
}



//======================= contact ====================

const FormAlert = document.querySelector("#form_alerts");


const scriptURL = 'https://script.google.com/macros/s/AKfycbyv8uwiCSIybRiBtD2CnkZP6HlHxBbmu5Yd1OwzaMFNDjEY-9Ztey5HYVSdm1VU0R9N/exec'
const form = document.forms['google-sheet']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            FormAlert.innerHTML = `<div class="alert alert-success">Message Send Successfully</div>`;
            document.querySelector(".alert").style.top = "15px";
        })
        .catch(error => {
            FormAlert.innerHTML = `<div class="alert alert-danger">Message Not Sent</div>`
            document.querySelector(".alert").style.top = "15px";
        });
});