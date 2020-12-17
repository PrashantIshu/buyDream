function openMenu() {
    $("#nav").slideToggle(200);
  
    if( $(".menu-icon").hasClass("ion-navicon-round")) {
        $(".menu-icon").removeAttr("name");
        $(".menu-icon").attr("name", "close");
        $(".menu-icon").removeClass("ion-navicon-round");
    } else {
        $(".menu-icon").removeAttr("name");
        $(".menu-icon").attr("name", "menu");
        $(".menu-icon").addClass("ion-navicon-round");
    }
    
}



var setInvisible = function(elem) {
    elem.css('visibility', 'hidden');
};
  var setVisible = function(elem) {
    elem.css('visibility', 'visible');
};


function rightClick() {
    var leftPos = $("#body").scrollLeft();
    $("#body").animate({
      scrollLeft: leftPos - 800
    }, 800, function() {
      if ($('#body').scrollLeft() <= 0) {
        setInvisible($('#right-button'));
      }
    });
};

function leftClick() {
  setVisible($('#right-button'));
  var leftPos = $("#body").scrollLeft();
  $("#body").animate({
    scrollLeft: leftPos + 800
  }, 800);
};

function residentialHouseRightClick() {
  var leftPos = $("#residentialHouseBody").scrollLeft();
  $("#residentialHouseBody").animate({
    scrollLeft: leftPos - 800
  }, 800, function() {
    if ($('#residentialHouseBody').scrollLeft() <= 0) {
      setInvisible($('#right-button-rh'));
    }
  });
};

function residentialHouseLeftClick() {
setVisible($('#right-button-rh'));
var leftPos = $("#residentialHouseBody").scrollLeft();
$("#residentialHouseBody").animate({
  scrollLeft: leftPos + 800
}, 800);
};

