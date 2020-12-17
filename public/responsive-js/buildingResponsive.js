/////////////////////// JS for Sticky Navbar ////////////////////////////////
if(document.getElementById('nav-container')) {
  window.onscroll = function() {
    const getNav = document.getElementById('nav-container');
    const getNavUL = document.getElementById('navbar');
    const sticky = getNav.offsetTop;
    if(window.pageYOffset > sticky) {
        getNav.classList.add('sticky');
    } else {
        getNav.classList.remove('sticky');
    }

    if(window.pageYOffset > 160) {
      var housesColumn = document.getElementsByClassName('column');
      for(var i = 0; i < housesColumn.length; i++) {
        housesColumn[i].classList.add('animateScrollHouse');
        housesColumn[i].classList.add('animateHouseFadeInBottom');
      }
    }

    if(window.pageYOffset > 1100) {
      var mapColumn = document.getElementsByClassName('map-container');
      for(var i = 0; i < mapColumn.length; i++) {
        mapColumn[i].classList.add('animateScrollMap');
        mapColumn[i].classList.add('animateMapFadeInLeft');
      }
  
      var locationAdvColumn = document.getElementsByClassName('location-advantage-container');
      for(var i = 0; i < locationAdvColumn.length; i++) {
        locationAdvColumn[i].classList.add('animateScrollMap');
        locationAdvColumn[i].classList.add('animateMapFadeInRight');
      }
    }

    var img_2 = document.getElementsByClassName('picture-box__img--1');
    if(window.pageYOffset > 1500) {
      var img_1 = document.getElementsByClassName('picture-box');
      img_1[0].classList.add('animateScrollMap');
      img_1[0].classList.add('animateMapFadeInLeft');
      img_1[1].classList.add('animateScrollImg');
      img_1[1].classList.add('animateImgFadeInBottom');
      img_1[2].classList.add('animateScrollMap');
      img_1[2].classList.add('animateMapFadeInRight');
    }

    if(window.pageYOffset > 2000) {
      var reviewColumns = document.getElementsByClassName('reviews');
      for(var i = 0; i < reviewColumns.length; i++) {
        reviewColumns[i].classList.add('animateScrollApt');
        reviewColumns[i].classList.add('animateAptFadeInBottom');
      }
    }
  }
}

/////////////////// JS for Amenety //////////////////////
var setInvisible = function(elem) {
    elem.css('visibility', 'hidden');
};
var setVisible = function(elem) {
    elem.css('visibility', 'visible');
};

// var outer = $("#overview-container");

function rightClickAmenety() {
    var leftPos = $("#ameneties").scrollLeft();
    $("#ameneties").animate({
      scrollLeft: leftPos - 300
    }, 400, function() {
      /* debugger */;
      if ($('#ameneties').scrollLeft() <= 0) {
        setInvisible($('#right-button-amenety'));
      }
    });
};

function leftClickAmenety() {
    setVisible($('#right-button-amenety'));
    var leftPos = $("#ameneties").scrollLeft();
    $("#ameneties").animate({
      scrollLeft: leftPos + 300
    }, 400);
};

///////////////// Open MailBox /////////////////
function mailbox() {
  $("#mailbox").slideToggle(200);
  document.querySelector('body').style.background = "background: rgba(247, 244, 244, 0.6);"
  document.getElementById('closeMail').style.display = "block";
}

function mailboxAgent() {
  $("#mailboxAgent").slideToggle(200);
  document.querySelector('body').style.background = "background: rgba(247, 244, 244, 0.6);"
  document.getElementById('closeMailAgent').style.display = "block";
}

function closeMailBox () {
  $("#mailbox").slideToggle(200);
  document.getElementById('closeMail').style.display = "none";
}

function closeMailBoxAgent () {
  $("#mailboxAgent").slideToggle(200);
  document.getElementById('closeMailAgent').style.display = "none";
}

/////////// Toggle About Builder //////////
function closeAboutBuilderBox () {
  var builderContent = $("#rightSideAboutBuilder");
  builderContent.slideToggle(200);
  builderContent.css("display", "grid");
  builderContent.css("grid-template-columns", "40% 60%");
  // document.getElementById('closeMailAgent').style.display = "none";
}

/////////////////////// JS for Houses ////////////////////////////////
function showHouse(name) {
  var elements = document.getElementsByClassName("column");
  for (var i = 0; i < elements.length; i++) {
    // elements[i].setAttribute("style", "position: relative; visibility: hidden;");
    elements[i].style.display = "none";
  }
          
  var element = document.getElementsByClassName(name);
    // element[0].setAttribute("style", "position: absolute; visibility: visible; left:194px; top: 0;");
    element[0].style.display = "block";
    // element[0].style.position="absolute";         
}

function showBtn(x) {
  var elements = document.getElementsByClassName(`flatTypeBtn${x}`);


  var totalFlatTypes = document.getElementsByClassName("flatType");
  for (var i = 0; i < totalFlatTypes.length; i++) {
      totalFlatTypes[i].setAttribute("style", "display: none;");
  }

  var sqftBtnElements = document.getElementsByClassName(`${x}`);
  // console.log(sqftBtnElements);
  for (var i = 0; i < sqftBtnElements.length; i++) {
      sqftBtnElements[i].setAttribute("style", "visibility: visible;");
  }

}

//////////////////// Overview Animation On Scroll //////////////////////
var overviewApartments = document.getElementById('apartments');
var overviewResidentialVillas = document.getElementById('residentialVillas');
if(overviewApartments && overviewResidentialVillas) {
  window.onscroll = function() {
    if(window.pageYOffset > 160) {
      var cards = document.getElementsByClassName('card');
      for(var i = 0; i < cards.length; i++) {
        cards[i].classList.add('animateScrollApt');
        cards[i].classList.add('animateAptFadeInBottom');
      }
    }
    if(window.pageYOffset > 800) {
      var cardsIH = document.getElementsByClassName('residentialHouseCard');
      for(var i = 0; i < cardsIH.length; i++) {
        cardsIH[i].classList.add('animateScrollAptIH');
        cardsIH[i].classList.add('animateAptFadeInBottomIH');
      }
    }
  }
}

//////////////////// Houses Animation On Scroll //////////////////////
// var animateHouse = document.getElementById('remove-house');
// if(animateHouse) {
  // window.onscroll = function() {
  //   if(window.pageYOffset > 160) {
  //     var housesColumn = document.getElementsByClassName('column');
  //     for(var i = 0; i < housesColumn.length; i++) {
  //       housesColumn[i].classList.add('animateScrollHouse');
  //       housesColumn[i].classList.add('animateHouseFadeInBottom');
  //     }
  //   }
  // }
// }

//////////////////// Location Animation On Scroll //////////////////////
// var animateLocation = document.getElementById('location');
// if(animateLocation) {
//   window.onscroll = function() {
    // if(window.pageYOffset > 1100) {
    //   var mapColumn = document.getElementsByClassName('map-container');
    //   for(var i = 0; i < mapColumn.length; i++) {
    //     mapColumn[i].classList.add('animateScrollMap');
    //     mapColumn[i].classList.add('animateMapFadeInLeft');
    //   }

    //   var locationAdvColumn = document.getElementsByClassName('location-advantage-container');
    //   for(var i = 0; i < locationAdvColumn.length; i++) {
    //     locationAdvColumn[i].classList.add('animateScrollMap');
    //     locationAdvColumn[i].classList.add('animateMapFadeInRight');
    //   }
    // }
  // }
// }

///////////////// Posting House ///////////////////
if(document.getElementById('post-house')) {
  document.getElementById('post-house').onclick = function() {
    document.getElementById('post-house').innerText = "Posting . . ."
  }
}

//////////////// Building Photos Slide Show On Btn Click /////////////////
function leftClickPics() {
  var dist = window.innerWidth + 10;
    setVisible($('#right-button-pics'));
    var leftPos = $("#photos").scrollLeft();
    $("#photos").animate({
      scrollLeft: leftPos + dist
    }, dist);
};

function rightClickPics() {
  var dist = window.innerWidth + 10;
  var leftPos = $("#photos").scrollLeft();
  $("#photos").animate({
    scrollLeft: leftPos - dist
  }, dist, function() {
    if ($('#photos').scrollLeft() <= 0) {
      setInvisible($('#right-button-pics'));
    }
  });
};
