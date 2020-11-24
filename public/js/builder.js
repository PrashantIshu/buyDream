const BuilderForm = document.querySelector('#builder-section');

////// Remove Builder ///////
const deleteBuilder = async (buildingId, name) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/buildings/${buildingId}/builders/${name}`
        });
        alert("from builder");
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

function removeBuilder(builderName) {
    alert("Hello");
    BuilderForm.addEventListener('submit', async event => {
        alert(builderName);
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        alert(buildingId);
        deleteBuilder(buildingId, builderName);
    });
}

///////// Update Builder //////////
const updatingBuilder = async (
    buildingId,
    id,
    data
) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/buildings/${buildingId}/builders/${id}`,
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
    alert("Hello");
    BuilderForm.addEventListener('submit', async event => {
        alert("Hello Prashant");
        event.preventDefault();

        const buildingId = document.getElementById('id').value;

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
            alert(logoPhoto);
        } else {
            logoPhoto = document.getElementById('builder-photo-logo').value;
            alert(logoPhoto);
        }
        formBuilder.append('logo', logoPhoto);

        alert(id);
        alert(buildingId);
        await updatingBuilder(
                buildingId,
                id,
                formBuilder
        );
    });
}

//////// ADD BUILDER ////////
const addBuilder = async (
        buildingId,
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
            const res = await axios({
            method: 'POST',
            url: `/api/v1/buildings/${buildingId}/builders`,
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


function addBuilderBuilding() {
    alert("Hello");
    BuilderForm.addEventListener('submit', async event => {
        alert("Hello Prashant");
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        const name = document.getElementById('nameBuilderBuilding').value;
        const contactEmail = document.getElementById('emailBuilderBuilding').value;
        const phone = document.getElementById('phoneBuilderBuilding').value;
        const experience = document.getElementById('experienceBuilding').value;
        const totalProjects = document.getElementById('totalProjectsBuilding').value;
        const projectsCompleted = document.getElementById('projectsCompletedBuilding').value;
        const operatingIn = document.getElementById('operatingInBuilding').value;
        const about = document.getElementById('textContentBuilderBuilding').value;

        alert(buildingId);
        await addBuilder(
                buildingId,
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

