function openMenu() {
    $("#nav").slideToggle(200);
  
    if( $(".menu-icon").hasClass("ion-navicon-round")) {
        $(".menu-icon").removeAttr("name");
        $(".menu-icon").attr("name", "close");
        $(".menu-icon").removeClass("ion-navicon-round");
        // alert("Heloo");
    } else {
        $(".menu-icon").removeAttr("name");
        $(".menu-icon").attr("name", "menu");
        $(".menu-icon").addClass("ion-navicon-round");
        // alert("Hello");
    }
    
}



var setInvisible = function(elem) {
    elem.css('visibility', 'hidden');
};
  var setVisible = function(elem) {
    elem.css('visibility', 'visible');
};

// var outer = $("#overview-container");

function rightClick() {
    // alert("Hello");
    var leftPos = $("#body").scrollLeft();
    // alert(leftPos);
    $("#body").animate({
      scrollLeft: leftPos - 800
    }, 800, function() {
      /* debugger */;
      if ($('#body').scrollLeft() <= 0) {
        setInvisible($('#right-button'));
      }
    });
};

function leftClick() {
    // alert("Hello");
    setVisible($('#right-button'));
    var leftPos = $("#body").scrollLeft();
    // alert(leftPos);
    $("#body").animate({
      scrollLeft: leftPos + 800
    }, 800);
};

