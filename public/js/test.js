
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
    document.getElementById('ameneties-container').scrollLeft += 300;
    next.setAttribute('style', 'visibility: hidden');
    prev.setAttribute('style', 'visibility: visible');
}


prev.onclick = function() {
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













