/////////////////////// JS for Sticky Navbar ////////////////////////////////
window.onscroll = function() {
    // alert("hello");
    const getNav = document.getElementById('nav-container');
    const getNavUL = document.getElementById('navbar');
    const sticky = getNav.offsetTop;
    if(window.pageYOffset > sticky) {
        getNav.classList.add('sticky');
        // getNav.classList.remove('nav-container');
        // getNavUL.setAttribute("style", "backgound-color: white; color: black;");
    } else {
        getNav.classList.remove('sticky');
        // getNav.classList.add('nav-container');
        // getNavUL.classList.remove('scrollSticky');
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
    // alert("Hello");
    var leftPos = $("#ameneties").scrollLeft();
    // alert(leftPos);
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
    // alert("Hello");
    setVisible($('#right-button-amenety'));
    var leftPos = $("#ameneties").scrollLeft();
    // alert(leftPos);
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
  // console.log(y[0]);
  // alert(elements[0].value);

  var elements = document.getElementsByClassName(`flatTypeBtn${x}`);
  // console.log(elements);

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