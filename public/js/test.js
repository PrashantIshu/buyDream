
/////////////////////// JS for Houses ////////////////////////////////

function showHouse(name) {
alert(name);

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



// if(removeHouseForm) {
//     removeHouseForm.addEventListener('submit', event => {
//         event.preventDefault();
//     });
// }
/////////////////////// JS for Ameneties ////////////////////////////////

var next = document.getElementById('next');
var prev = document.getElementById('prev');

next.onclick = function() {
    // alert("Hello");
    document.getElementById('ameneties-container').scrollLeft += 300;
    next.setAttribute('style', 'visibility: hidden');
    prev.setAttribute('style', 'visibility: visible');
}


prev.onclick = function() {
    // alert("Hello");
    document.getElementById('ameneties-container').scrollLeft -= 300;
    next.setAttribute('style', 'visibility: visible');
    prev.setAttribute('style', 'visibility: hidden');
}

const arrowBtn = document.getElementsByClassName('content');
if(arrowBtn.length < 5 ) {
    next.setAttribute('style', 'visibility: hidden');
    prev.setAttribute('style', 'visibility: hidden');
}

//////////// Animation On Scroll ///////////
const el = document.getElementById('apartments');
alert("Hello");
alert(el);














// /////////////////////// JS for Sticky Navbar ////////////////////////////////
// if(document.getElementById('nav-container')) {
//     window.onscroll = function() {
//       // alert("hello");
//       const getNav = document.getElementById('nav-container');
//       const getNavUL = document.getElementById('navbar');
//       const sticky = getNav.offsetTop;
//       if(window.pageYOffset > sticky) {
//           getNav.classList.add('sticky');
//           // getNav.classList.remove('nav-container');
//           // getNavUL.setAttribute("style", "backgound-color: white; color: black;");
//       } else {
//           getNav.classList.remove('sticky');
//           // getNav.classList.add('nav-container');
//           // getNavUL.classList.remove('scrollSticky');
//       }
  
//       if(window.pageYOffset > 160) {
//         var housesColumn = document.getElementsByClassName('column');
//         for(var i = 0; i < housesColumn.length; i++) {
//           housesColumn[i].classList.add('animateScrollHouse');
//           housesColumn[i].classList.add('animateHouseFadeInBottom');
//         }
//       }
  
//       if(window.pageYOffset > 1100) {
//         var mapColumn = document.getElementsByClassName('map-container');
//         for(var i = 0; i < mapColumn.length; i++) {
//           mapColumn[i].classList.add('animateScrollMap');
//           mapColumn[i].classList.add('animateMapFadeInLeft');
//         }
    
//         var locationAdvColumn = document.getElementsByClassName('location-advantage-container');
//         for(var i = 0; i < locationAdvColumn.length; i++) {
//           locationAdvColumn[i].classList.add('animateScrollMap');
//           locationAdvColumn[i].classList.add('animateMapFadeInRight');
//         }
//       }
  
//       var img_2 = document.getElementsByClassName('picture-box__img--1');
//       if(window.pageYOffset > 1500) {
//         var img_1 = document.getElementsByClassName('picture-box');
//         img_1[0].classList.add('animateScrollMap');
//         img_1[0].classList.add('animateMapFadeInLeft');
//         img_1[1].classList.add('animateScrollImg');
//         img_1[1].classList.add('animateImgFadeInBottom');
//         img_1[2].classList.add('animateScrollMap');
//         img_1[2].classList.add('animateMapFadeInRight');
//       }
  
//       if(window.pageYOffset > 2000) {
//         var reviewColumns = document.getElementsByClassName('reviews');
//         for(var i = 0; i < reviewColumns.length; i++) {
//           reviewColumns[i].classList.add('animateScrollApt');
//           reviewColumns[i].classList.add('animateAptFadeInBottom');
//         }
//       }
//     }
//   }
  
//   /////////////////// JS for Amenety //////////////////////
//   var setInvisible = function(elem) {
//       elem.css('visibility', 'hidden');
//   };
//   var setVisible = function(elem) {
//       elem.css('visibility', 'visible');
//   };
  
//   // var outer = $("#overview-container");
  
//   function rightClickAmenety() {
//       // alert("Hello");
//       var leftPos = $("#ameneties").scrollLeft();
//       // alert(leftPos);
//       $("#ameneties").animate({
//         scrollLeft: leftPos - 300
//       }, 400, function() {
//         /* debugger */;
//         if ($('#ameneties').scrollLeft() <= 0) {
//           setInvisible($('#right-button-amenety'));
//         }
//       });
//   };
  
//   function leftClickAmenety() {
//       // alert("Hello");
//       setVisible($('#right-button-amenety'));
//       var leftPos = $("#ameneties").scrollLeft();
//       // alert(leftPos);
//       $("#ameneties").animate({
//         scrollLeft: leftPos + 300
//       }, 400);
//   };
  
//   ///////////////// Open MailBox /////////////////
//   function mailbox() {
//     $("#mailbox").slideToggle(200);
//     document.querySelector('body').style.background = "background: rgba(247, 244, 244, 0.6);"
//     document.getElementById('closeMail').style.display = "block";
//   }
  
//   function mailboxAgent() {
//     $("#mailboxAgent").slideToggle(200);
//     document.querySelector('body').style.background = "background: rgba(247, 244, 244, 0.6);"
//     document.getElementById('closeMailAgent').style.display = "block";
//   }
  
//   function closeMailBox () {
//     $("#mailbox").slideToggle(200);
//     document.getElementById('closeMail').style.display = "none";
//   }
  
//   function closeMailBoxAgent () {
//     $("#mailboxAgent").slideToggle(200);
//     document.getElementById('closeMailAgent').style.display = "none";
//   }
  
//   /////////// Toggle About Builder //////////
//   function closeAboutBuilderBox () {
//     var builderContent = $("#rightSideAboutBuilder");
//     builderContent.slideToggle(200);
//     builderContent.css("display", "grid");
//     builderContent.css("grid-template-columns", "40% 60%");
//     // document.getElementById('closeMailAgent').style.display = "none";
//   }
  
//   /////////////////////// JS for Houses ////////////////////////////////
//   // if(document.getElementsById('myBtnContainer')) {
//     var firstHouse = document.getElementById('firstHouseCol').value;
//     var allCols = document.getElementsByClassName(`${firstHouse}`);
//     allCols[0].style.display = "block";
//   // }
  
//   var cols = document.getElementsByClassName('column');
//   alert(cols.length);
//   console.log(cols.length);
//   if(cols.length !== 0) {
//     document.getElementById('myBtnContainer').style.border = "1px solid red";
//   } else {
//     document.getElementById('myBtnContainer').style.border = "1px solid blue";
//   }
  
//   function showHouse(name) {
//     var elements = document.getElementsByClassName("column");
//     for (var i = 0; i < elements.length; i++) {
//       // elements[i].setAttribute("style", "position: relative; visibility: hidden;");
//       elements[i].style.display = "none";
//   }
            
//     var element = document.getElementsByClassName(name);
//       // element[0].setAttribute("style", "position: absolute; visibility: visible; left:194px; top: 0;");
//       element[0].style.display = "block";
//       // element[0].style.position="absolute";         
//   }
  
//   function showBtn(x) {
//     // console.log(y[0]);
//     // alert(elements[0].value);
  
//     var elements = document.getElementsByClassName(`flatTypeBtn${x}`);
//     // console.log(elements);
  
//     var totalFlatTypes = document.getElementsByClassName("flatType");
//     for (var i = 0; i < totalFlatTypes.length; i++) {
//         totalFlatTypes[i].setAttribute("style", "display: none;");
//     }
  
//     var sqftBtnElements = document.getElementsByClassName(`${x}`);
//     // console.log(sqftBtnElements);
//     for (var i = 0; i < sqftBtnElements.length; i++) {
//         sqftBtnElements[i].setAttribute("style", "display: inline-block;");
//     }
  
//   }
  
//   //////////////////// Overview Animation On Scroll //////////////////////
//   var overviewApartments = document.getElementById('apartments');
//   if(overviewApartments) {
//     // alert("Overview");
//     window.onscroll = function() {
//       if(window.pageYOffset > 160) {
//         // console.log(window.pageYOffset, overviewApartments.offsetTop);
//         // alert(window.pageYOffset);
//         // alert(overviewApartments.offsetTop);
//         var cards = document.getElementsByClassName('card');
//         for(var i = 0; i < cards.length; i++) {
//           cards[i].classList.add('animateScrollApt');
//           cards[i].classList.add('animateAptFadeInBottom');
//           // console.log(cards[i]);
//         }
//       }
//     }
//   }
  
//   //////////////////// Houses Animation On Scroll //////////////////////
//   // var animateHouse = document.getElementById('remove-house');
//   // if(animateHouse) {
//     // window.onscroll = function() {
//     //   if(window.pageYOffset > 160) {
//     //     var housesColumn = document.getElementsByClassName('column');
//     //     for(var i = 0; i < housesColumn.length; i++) {
//     //       housesColumn[i].classList.add('animateScrollHouse');
//     //       housesColumn[i].classList.add('animateHouseFadeInBottom');
//     //     }
//     //   }
//     // }
//   // }
  
//   //////////////////// Location Animation On Scroll //////////////////////
//   // var animateLocation = document.getElementById('location');
//   // if(animateLocation) {
//   //   window.onscroll = function() {
//       // if(window.pageYOffset > 1100) {
//       //   var mapColumn = document.getElementsByClassName('map-container');
//       //   for(var i = 0; i < mapColumn.length; i++) {
//       //     mapColumn[i].classList.add('animateScrollMap');
//       //     mapColumn[i].classList.add('animateMapFadeInLeft');
//       //   }
  
//       //   var locationAdvColumn = document.getElementsByClassName('location-advantage-container');
//       //   for(var i = 0; i < locationAdvColumn.length; i++) {
//       //     locationAdvColumn[i].classList.add('animateScrollMap');
//       //     locationAdvColumn[i].classList.add('animateMapFadeInRight');
//       //   }
//       // }
//     // }
//   // }
  
  