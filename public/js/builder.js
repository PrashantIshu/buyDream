const BuilderForm = document.querySelector('#builder-section');
const BuilderFormIH = document.querySelector('#builderIH');

////// Remove Builder ///////
const deleteBuilder = async (type, Id, builderId) => {
    try {
        let url;
        if(type === 'residentialHouseId') {
            const residentialHouseId = Id;
            url = `/api/v1/residentialHouses/${residentialHouseId}/builders/${builderId}`;
        } else {
            const buildingId = Id;
            url = `/api/v1/buildings/${buildingId}/builders/${builderId}`;
        }
        const res = await axios({
            method: 'DELETE',
            url
            // url: `/api/v1/buildings/${buildingId}/builders/${name}`
        });
        // alert("from builder");
        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1000);
            alert("Builder Deletion Suucessfull");
        }
        } catch(err) {
            alert(err);
        }
}

function removeBuilder(type) {
    
    let formBuilder
    if(BuilderForm) {
        formBuilder = BuilderForm;
    }
    if(BuilderFormIH) {
        formBuilder = BuilderFormIH
    } 
    formBuilder.addEventListener('submit', async event => {
        event.preventDefault();

        const builderId = document.getElementById('removeBuilderId').value;
        const Id = document.getElementById('id').value;
        deleteBuilder(type, Id, builderId);
    });
}

///////// Update Builder //////////
const updatingBuilder = async (
    // buildingId,
    id,
    data
) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/builders/${id}`,
            data
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1000);
            alert("Builder Insertion Suucessfull");
        }
    } catch(err) {
        alert(err);
    }
};

function updateBuilder(id) {
    let formBuilders
    if(BuilderForm) {
        formBuilders = BuilderForm;
    }
    if(BuilderFormIH) {
        formBuilders = BuilderFormIH
    } 
    formBuilders.addEventListener('submit', async event => {
        event.preventDefault();

        // const buildingId = document.getElementById('id').value;

        const formBuilder = new FormData();
        formBuilder.append('name', document.getElementById('nameBuilderBuildingAdmin').value);
        formBuilder.append('contactEmail', document.getElementById('emailBuilderBuildingAdmin').value);
        formBuilder.append('phone', document.getElementById('phoneBuilderBuildingAdmin').value);
        formBuilder.append('experience', document.getElementById('experienceBuildingAdmin').value);
        formBuilder.append('totalProjects', document.getElementById('totalProjectsBuildingAdmin').value);
        formBuilder.append('projectsCompleted', document.getElementById('projectsCompletedBuildingAdmin').value);
        formBuilder.append('operatingIn', document.getElementById('operatingInBuildingAdmin').value);
        formBuilder.append('about', document.getElementById('textContentBuilderBuildingAdmin').value);
        var logoPhoto;
        if(document.getElementById('logo-builder').files[0]) {
            logoPhoto = document.getElementById('logo-builder').files[0];
        } else {
            logoPhoto = document.getElementById('builder-photo-logo').value;
        }
        formBuilder.append('logo', logoPhoto);

        await updatingBuilder(
                // buildingId,
                id,
                formBuilder
        );
    });
}

//////// ADD BUILDER ////////
const addBuilder = async (
        type,
        Id,
        name,
        contactEmail,
        phone,
        experience,
        totalProjects,
        projectsCompleted,
        operatingIn,
        about
    ) => {
        try {
            let url;
            if(type === 'residentialHouseId') {
                const residentialHouseId = Id;
                url = `/api/v1/residentialHouses/${residentialHouseId}/builders`;
            } else {
                const buildingId = Id;
                url = `/api/v1/buildings/${buildingId}/builders`;
            }
            const res = await axios({
            method: 'POST',
            url,
            // url: `/api/v1/buildings/${Id}/builders`,
            data: {
                    name,
                    contactEmail,
                    phone,
                    experience,
                    totalProjects,
                    projectsCompleted,
                    operatingIn,
                    about
                }
            });

            if(res.data.status === 'success') {
                window.setTimeout( () => {
                    location.reload();
                }, 1000);
                alert("Builder Insertion Suucessfull");
            }
        } catch(err) {
            alert(err);
        }
    };


function addBuilderBuilding(type) {
    let formBuilder
    if(BuilderForm) {
        formBuilder = BuilderForm;
    }
    if(BuilderFormIH) {
        formBuilder = BuilderFormIH
    } 
    formBuilder.addEventListener('submit', async event => {
        event.preventDefault();

        const Id = document.getElementById('id').value;
        const name = document.getElementById('nameBuilderBuilding').value;
        const contactEmail = document.getElementById('emailBuilderBuilding').value;
        const phone = document.getElementById('phoneBuilderBuilding').value;
        const experience = document.getElementById('experienceBuilding').value;
        const totalProjects = document.getElementById('totalProjectsBuilding').value;
        const projectsCompleted = document.getElementById('projectsCompletedBuilding').value;
        const operatingIn = document.getElementById('operatingInBuilding').value;
        const about = document.getElementById('textContentBuilderBuilding').value;

        await addBuilder(
                type,
                Id,
                name,
                contactEmail,
                phone,
                experience,
                totalProjects,
                projectsCompleted,
                operatingIn,
                about
        );
    });
}

