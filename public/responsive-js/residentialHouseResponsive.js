//////////////// JS for Sticky Navbar of RH /////////////////////
if(document.getElementById('navContainer')) {
    window.onscroll = function() {
      const getNav = document.getElementById('navContainer');
      const getContactSeller = document.getElementById('contactSecondHalf');
      const rightArrow = document.getElementsByClassName('pics-left-btn-ih');
      // const sticky = getNav.offsetTop;
      // if(window.pageYOffset >= 700) {
      //   var navItem = document.getElementById(firstLink);
      //   navItem.classList.add(scrolledNavItem);
      // } 

      if(window.pageYOffset >= 800) {
          getNav.classList.add('stick');
          getContactSeller.classList.add('contactSecondHalf');
          // rightArrow[0].style.top = "125rem";
      } else {
          getNav.classList.remove('stick');
          getContactSeller.classList.remove('contactSecondHalf');
          // rightArrow[0].style.top = "130rem";
      }
    }
  }
  
  function readAll() {
    const desc = document.getElementById('readDesc');
    const moreRead = document.getElementById('moreRead');
    if($("#readDesc").hasClass("hideDesc")) {
      desc.style.height = "initial";
      moreRead.textContent = "Collapse";
      desc.classList.remove("hideDesc");
    } else {
      desc.style.height = "3rem";
      moreRead.textContent = "Read More";
      desc.classList.add("hideDesc");
    }
  }

////// Show Loc Adv //////
function hideAdv() {
    document.getElementById('lacAd').classList.remove('lacAd');
    document.getElementById('locality').classList.add('lacAd');
    document.getElementById('advH').classList.remove('advH');
    document.getElementById('locH').classList.add('advH');
}
function showAdv() {
    document.getElementById('lacAd').classList.add('lacAd');
    document.getElementById('locality').classList.remove('lacAd');
    document.getElementById('advH').classList.add('advH');
    document.getElementById('locH').classList.remove('advH');
}

////// Slide Images /////////
var setInvisible = function(elem) {
  elem.css('visibility', 'hidden');
};
var setVisible = function(elem) {
  elem.css('visibility', 'visible');
};

function rightClickPicsIh() {
  var leftPos = $("#photosGallery").scrollLeft();
  $("#photosGallery").animate({
    scrollLeft: leftPos - 500
  }, 700, function() {
    /* debugger */;
    if ($('#photosGallery').scrollLeft() <= 0) {
      setInvisible($('#right-button-pics-ih'));
    }
  });
};

function leftClickPicsIh() {
    setVisible($('#right-button-pics-ih'));
    var leftPos = $("#photosGallery").scrollLeft();
    $("#photosGallery").animate({
      scrollLeft: leftPos + 500
    }, 700);
};

function showContactOwner() {
  $("#contactSecondHalfHide").slideToggle(200);
  document.getElementById('closeMailAgent').style.display = "block";
}

function closeMailBoxAgentIH() {
  $("#contactSecondHalfHide").slideToggle(200);
  document.getElementById('closeMailAgent').style.display = "none";
}