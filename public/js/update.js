const updateBuildingForm = document.querySelector('#update-property');
const updateHouseForm = document.querySelector('#update-house');

const updateProperty = async (data, id, slug) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/buildings/${id}`,
            data
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.assign(`/houses/${slug}`);
            }, 1200);
            alert("success");
        }
    } catch(err) {
        alert(err);
    }
};

const updateGhar = async (data, id, slug) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/houses/${id}`,
            data
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.assign(`/houses/${slug}`);
            }, 1200);
            alert("success");
        }
    } catch(err) {
        alert(err);
    }
};

function updateBuilding(id) {
    updateBuildingForm.addEventListener('submit', async event => {
        alert("heloo prashant");
        event.preventDefault();

        let imageOne = document.getElementById('coverPhoto').files[0];
        let imageTwo = document.getElementById('building-1Photo').files[0];
        let imageThree = document.getElementById('building-2Photo').files[0];
        let imageFour = document.getElementById('building-3Photo').files[0];

        if(!imageOne) {
            imageOne = document.getElementById('first-image').value;
        }
        if(!imageTwo) {
            imageTwo = document.getElementById('second-image').value;
        } 
        if(!imageThree) {
            imageThree = document.getElementById('third-image').value;
        } 
        if(!imageFour) {
            imageFour = document.getElementById('fourth-image').value;
        }  
        // console.log(imageOne);
        // console.log(imageTwo);
        // console.log(imageThree);
        // console.log(imageFour);
        const slug = document.getElementById('slug').value;
        alert(slug);
        const form = new FormData();
        form.append('name', document.getElementById('propertyName').value);
        form.append('address', document.getElementById('addresss').value);
        form.append('imageCover', imageOne);
        form.append('images', imageTwo);
        form.append('images', imageThree);
        form.append('images', imageFour);
        form.append('locationAdvantages', document.getElementById('locationAdvantageOneUpdate').value);
        form.append('locationAdvantages', document.getElementById('locationAdvantageTwoUpdate').value);
        form.append('locationAdvantages', document.getElementById('locationAdvantageThreeUpdate').value);
        form.append('locationAdvantages', document.getElementById('locationAdvantageFourUpdate').value);
        form.append('locationAdvantages', document.getElementById('locationAdvantageFiveUpdate').value);

        await updateProperty(form, id, slug);
    });
}

function updateHouse(id) {
    alert("Hellow");
    updateHouseForm.addEventListener('submit', async event => {
        alert("heloo prashant");
        event.preventDefault();

        let image = document.getElementById('house-print').files[0];

        if(!image) {
            image = document.getElementById('house-blueprint-img').value;
        }

        console.log(image);
        const formHouse = new FormData();
        formHouse.append('flatType', document.getElementById('flat-type').value);
        formHouse.append('price', document.getElementById('price').value);
        formHouse.append('sqftArea', document.getElementById('sqft-areas').value);
        formHouse.append('bathrooms', document.getElementById('bathrooms').value);
        formHouse.append('balconies', document.getElementById('balconies').value);
        formHouse.append('status', document.getElementById('status').value);
        formHouse.append('usp', document.getElementById('usp').value);
        formHouse.append('image', image);
        formHouse.append('building', document.getElementById('building').value);
        
        const slug = document.getElementById('building-name').value;
        alert(slug);
        await updateGhar(formHouse, id, slug);
    });
}