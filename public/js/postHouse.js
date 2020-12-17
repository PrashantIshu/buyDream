const postHouseForm = document.querySelector('#post-house-ameneties');
const houseForm = document.querySelector('#remove-house');
const removeReviewForm = document.querySelector("#reviewHatao");

const postHouse = async (data, buildingName) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/houses',
            data
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.assign(`/houses/${buildingName}`);
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert(err);
    }     
};

if(postHouseForm) {
    postHouseForm.addEventListener('submit', async event=> {
        event.preventDefault();
        const priceUnit = document.querySelector("input[name=priceUnit]:checked").value;
        const formHouse = new FormData();
        formHouse.append('flatType', document.getElementById('flat-type').value);
        formHouse.append('price', document.getElementById('price').value);
        formHouse.append('priceUnit', priceUnit);
        formHouse.append('sqftArea', document.getElementById('sqft-area').value);
        formHouse.append('bathrooms', document.getElementById('bathrooms').value);
        formHouse.append('balconies', document.getElementById('balconies').value);
        formHouse.append('status', document.getElementById('status').value);
        formHouse.append('usp', document.getElementById('usp').value);
        formHouse.append('image', document.getElementById('house-print').files[0]);
        formHouse.append('building', document.getElementById('building').value);
        
        const buildingName = document.getElementById('building-name').value;
        
        await postHouse(formHouse, buildingName);
    });
}



const remove = async (houseId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/houses/${houseId}`
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert(err);
    }     
};

function deleteHouse(house) {
    houseForm.addEventListener('submit', event => {
        event.preventDefault();
        console.log(house);
        remove(house);
    });
}


const removeReview = async (reviewId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/reviews/${reviewId}`
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert(err);
    }     
};

function deleteReview(review) {
    // if(removeReviewForm) {
        removeReviewForm.addEventListener('submit', event => {
            event.preventDefault();
            console.log(review);
            removeReview(review);
        });
}