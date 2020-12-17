const postAmenetyForm = document.querySelector('#ameneties-container');
const removeHouseForm = document.querySelector('#house');

const postAmen = async (type, name, buildingId) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/buildings/${buildingId}/ameneties`,
            data: {
                type,
                name
            }
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                //location.assign('/');
                location.reload();
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert(err);
    }
};

const deleteAmenety = async(buildingId, name) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/buildings/${buildingId}/ameneties/${name}`
        });
    
        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1000);
            alert("Amenety Deletion Suucessfull");
        }
        } catch(err) {
            alert(err);
        }
}

function postAmenety(type) {
    postAmenetyForm.addEventListener('submit', event => {
        event.preventDefault();

        console.log("Prashant");
        let i=0;
        const buildingId = document.getElementById('id').value;
        let name = document.getElementsByClassName(`${type}`);
        for(i=0; i<name.length; i++) {
            if(i === name.length-1) {
                console.log(name[i].value);
            }    
        }
        name = name[i-1].value;
        
        console.log(type, name, buildingId);
        postAmen(type, name, buildingId);
    });
}

function removeAmenety(amenetyName) {
    postAmenetyForm.addEventListener('submit', async event => {
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        let name = document.getElementsByClassName(`${amenetyName}`);

        name = name[0].value;
        console.log(buildingId);
        console.log(name);

        deleteAmenety(buildingId, name);
    });
}

      
////////////// Remove House //////////////
function removeGhar(id) {
    removeHouseForm.addEventListener('submit', event => {
        event.preventDefault();
        var i=0;
        // console.log(typeof(id));
        // console.log(event.target.dataset);
        // let houseId = document.getElementsByClassName('getHouseId');
        // for(i=0; i<houseId.length; i++) {
        //         console.log(houseId[i].value); 
        // } 
        // houseId = houseId[].value;

        // console.log(houseId);
    });
}