const reviewForm = document.querySelector("#reviewContainer");


const postReview = async (review, rating, buildingId) => {
    try {
        const res = await axios({
            method: "POST",
            url: `/api/v1/buildings/${buildingId}/reviews`,
            data: {
                review,
                rating
            }
        });

        if (res.data.status === 'success') {
            alert("success");
            window.setTimeout(() => {
              location.reload();
            }, 1200);
        }
    } catch (err) {
        alert(err);
    }
};
// console.log("Hello");
if(reviewForm) {

    reviewForm.addEventListener('submit', event => {
        event.preventDefault();
        const review = document.getElementById('review').value;
        const rating = document.getElementById('rating').value;
        const buildingId = document.getElementById('id').value;
        postReview(review, rating, buildingId);
    });
}

function countStars(star) {
    const elements = document.getElementsByClassName('your-rate');
    for(var i=0; i<elements.length; i++) {
        elements[i].setAttribute("style", "fill: #bbb;");
    } 
    for(var i=0; i<star; i++) {
        elements[i].setAttribute("style", "fill: grey;");
        console.log(elements[i]);
    } 
    const element = document.getElementById('rating');
    element.value = star;
}

/////////// Remove Review /////////////////
