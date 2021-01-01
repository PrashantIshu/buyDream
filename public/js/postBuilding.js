const postBuildingForm = document.querySelector('#post-property');
const postIhForm = document.querySelector('#post-property-ih');
const buildingForm = document.querySelector('#wishlist-container');
const independentHouseForm = document.querySelector('#wishlist-residentialHouse-container');
const logoutBtn = document.querySelector('.qwerty');
const logoutBt = document.querySelector('.qwert');
const searchForm = document.querySelector('#search-box');
const WishlistForm = document.querySelector('#wishlist-container');
const mailForm = document.querySelector('#mailbox');
const mailAgentForm = document.querySelector('#mailboxAgent');
const mailAgentFormOnImg = document.querySelector('#mailboxAgentOnImg');
const mailOwnerForm = document.querySelector('#contactSellerForm');

const postBuilding = async (nameAgent, emailAgent, mobileAgent, name, contactEmail, phone, experience, totalProjects, projectsCompleted, operatingIn, about, dataProperty, agentOrOwner, role, dataHouse) => {
    try {        

        const ress = await axios({
            method: 'PATCH',
            url: `/api/v1/users/${agentOrOwner}`,
            data: {
                role,
                name: nameAgent,
                contactEmail: emailAgent,
                phone: mobileAgent,
            }
        });

        // const builder = resBuilder.data.data._id;
        // console.log(builder);
        // dataProperty.append('builder', builder);
        const resBuilding = await axios({
            method: 'POST',
            url: '/api/v1/buildings',
            data: dataProperty
            // data: {
            //     name,
            //     description,
            //     summary,
            //     agentOrOwner,
            //     address
            // }
        });

        const buildingId = resBuilding.data.data._id;
        const builderSlug = resBuilding.data.data.slug;
        console.log(builderSlug);
        // dataProperty.append('builder', builder);
        const resBuilder = await axios({
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

        const building = resBuilding.data.data._id;
        dataHouse.append('building', building);
        const resHouse = await axios({
            method: 'POST',
            url: '/api/v1/houses',
            data: dataHouse
            // {
            //     flatType,
            //     price,
            //     sqftArea,
            //     bathrooms,
            //     balconies,
            //     status,
            //     usp,
            //     building
            // }
        });
        
        if(resBuilder.data.status === "success" && resHouse.data.status === "success" && resBuilding.data.status === 'success' && ress.data.status ==='success') {
            window.setTimeout( () => {
                location.assign(`/houses/${builderSlug}`);
                // location.reload();
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert(err);
    }
};

const postIh = async (dataProperty, agentOrOwner, role) => {
    try {        

        const ress = await axios({
            method: 'PATCH',
            url: `/api/v1/users/${agentOrOwner}`,
            data: {
                role,
                // name: nameAgent,
                // contactEmail: emailAgent,
                // phone: mobileAgent,
            }
        });

        // const builder = resBuilder.data.data._id;
        // console.log(builder);
        // dataProperty.append('builder', builder);
        const resBuilding = await axios({
            method: 'POST',
            url: '/api/v1/residentialHouses',
            data: dataProperty
        });

        if(resBuilding.data.status === 'success' && ress.data.status ==='success') {
            window.setTimeout( () => {
                // location.assign(`/res/${builderSlug}`);
                location.reload();
            }, 1200);
            alert("Success");
        }
    } catch(err) {
        alert("err");
        alert(err);
    }
};


const deleteBuild = async (type, id) => {
    try {
        const res = await axios({
            method: 'Delete',
            url: `/api/v1/${type}/${id}`
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

const mail = async (builderOrAgentId, buildingId, name, email, phone, type) => {
    try {
        let x;
        if(type === 'buildings') {
            x = type;
        } else {
            x = type;
        }
        const res = await axios({
            method: 'POST',
            url: `/api/v1/${x}/sendmail/${builderOrAgentId}/${buildingId}`,
            data: {
                name, 
                email,
                phone
            }
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();
            }, 1000);
            alert("Mail Sent Suucessfull");
        }
        } catch(err) {
            alert(err);
        }
};

if(postBuildingForm) {
    postBuildingForm.addEventListener('submit', async event=> {
        event.preventDefault();
        // const name = document.getElementById('property-name').value;
        // const description = document.getElementById('property-description').value;
        // const summary = document.getElementById('property-summary').value;
        const agentOrOwner = document.getElementById('userId').value;
        const role = document.querySelector("input[name=role]:checked").value;
        const nameAgent = document.getElementById('nameAgent').value;
        const mobileAgent = document.getElementById('mobileAgent').value;
        const emailAgent = document.getElementById('emailAgent').value;
        const priceUnitPost = document.querySelector("input[name=priceUnitPost]:checked").value;
        // const address = document.getElementById("address").value;
        const formProperty = new FormData();
        formProperty.append('name', document.getElementById('property-name').value);
        formProperty.append('description', document.getElementById('property-description').value);
        formProperty.append('agentOrOwner', document.getElementById('userId').value);
        formProperty.append('address', document.getElementById('address').value);
        formProperty.append('imageCover', document.getElementById('cover-photo').files[0]);
        formProperty.append('images', document.getElementById('building-1-photo').files[0]);
        formProperty.append('images', document.getElementById('building-2-photo').files[0]);
        formProperty.append('images', document.getElementById('building-3-photo').files[0]);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageOne').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageTwo').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageThree').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageFour').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageFive').value);
        
        const formHouse = new FormData();
        formHouse.append('flatType', document.getElementById('flat-type').value);
        formHouse.append('price', document.getElementById('price').value);
        formHouse.append('priceUnit', priceUnitPost);
        formHouse.append('sqftArea', document.getElementById('sqft-areas').value);
        formHouse.append('agentOrOwner', document.getElementById('userId').value);
        formHouse.append('bathrooms', document.getElementById('bathrooms').value);
        formHouse.append('balconies', document.getElementById('balconies').value);
        formHouse.append('status', document.getElementById('status').value);
        formHouse.append('usp', document.getElementById('usp').value);
        formHouse.append('image', document.getElementById('house-blueprint').files[0]);
        
        // const building = document.getElementById('building').value;
        // const buildingName = document.getElementById('building-name').value;
        const name = document.getElementById('nameBuilder').value;
        const contactEmail = document.getElementById('emailBuilder').value;
        const phone = document.getElementById('phoneBuilder').value;
        const experience = document.getElementById('experience').value;
        const totalProjects = document.getElementById('totalProjects').value;
        const projectsCompleted = document.getElementById('projectsCompleted').value;
        const operatingIn = document.getElementById('operatingIn').value;
        const about = document.getElementById('textContentBuilder').value;

        await postBuilding(
            nameAgent, emailAgent, mobileAgent,
            name, contactEmail, phone, experience, totalProjects, projectsCompleted, operatingIn, about,
            formProperty,
            agentOrOwner, 
            role,
            formHouse
        );
    });
}


if(postIhForm) {
    postIhForm.addEventListener('submit', async event=> {
        event.preventDefault();
        const agentOrOwner = document.getElementById('userId').value;
        const role = document.querySelector("input[name=role]:checked").value;
        // const nameAgent = document.getElementById('nameAgent').value;
        // const mobileAgent = document.getElementById('mobileAgent').value;
        // const emailAgent = document.getElementById('emailAgent').value;
        // const priceUnitPost = document.querySelector("input[name=priceUnitPost]:checked").value;
        // const address = document.getElementById("address").value;
        const formProperty = new FormData();
        formProperty.append('name', document.getElementById('property-name').value);
        formProperty.append('description', document.getElementById('property-description').value);
        formProperty.append('agentOrOwner', document.getElementById('userId').value);
        formProperty.append('address', document.getElementById('address').value);
        formProperty.append('imageCover', document.getElementById('cover-photo').files[0]);
        formProperty.append('images', document.getElementById('building-1-photo').files[0]);
        formProperty.append('images', document.getElementById('building-2-photo').files[0]);
        formProperty.append('images', document.getElementById('building-3-photo').files[0]);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageOne').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageTwo').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageThree').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageFour').value);
        formProperty.append('locationAdvantages', document.getElementById('locationAdvantageFive').value);
        
        // const formHouse = new FormData();
        formProperty.append('flatType', document.getElementById('flat-type').value);
        formProperty.append('pricePerUnit', document.getElementById('price').value);
        // formProperty.append('priceUnit', priceUnitPost);
        formProperty.append('sqftArea', document.getElementById('sqft-areas').value);
        formProperty.append('agentOrOwner', document.getElementById('userId').value);
        formProperty.append('bedrooms', document.getElementById('bedrooms').value);
        formProperty.append('bathrooms', document.getElementById('bathrooms').value);
        formProperty.append('balconies', document.getElementById('balconies').value);
        // formProperty.append('status', document.getElementById('status').value);
        // formProperty.append('usp', document.getElementById('usp').value);
        // formProperty.append('image', document.getElementById('house-blueprint').files[0]);
        
        // const building = document.getElementById('building').value;
        // const buildingName = document.getElementById('building-name').value;

        // const name = document.getElementById('nameBuilder').value;
        // const contactEmail = document.getElementById('emailBuilder').value;
        // const phone = document.getElementById('phoneBuilder').value;
        // const experience = document.getElementById('experience').value;
        // const totalProjects = document.getElementById('totalProjects').value;
        // const projectsCompleted = document.getElementById('projectsCompleted').value;
        // const operatingIn = document.getElementById('operatingIn').value;
        // const about = document.getElementById('textContentBuilder').value;

        await postIh(
            // nameAgent, emailAgent, mobileAgent,
            // name, contactEmail, phone, experience, totalProjects, projectsCompleted, operatingIn, about,
            formProperty,
            agentOrOwner, 
            role,
            // formHouse
        );
    });
}

/////// Delete Building ///////
function deleteBuilding(id) {
    buildingForm.addEventListener('submit', event => {
        event.preventDefault();
        deleteBuild('buildings', id);
    });
};

/////// Delete Independent House ///////
function deleteIndependentHouse(id) {
    independentHouseForm.addEventListener('submit', event => {
        event.preventDefault();
        deleteBuild('residentialHouses', id);
    });
};

////////// Count Width of Grid Container ///////////
const overviewContainer = document.querySelector(".grid-container");
if(overviewContainer) {

    const len = document.getElementById('totalBuildings').value;

    const size = len*347;

    overviewContainer.style.width = `${size}px`; 
}

    function myFunction(x) {
      if (x.matches) { // If media query matches

        overviewContainer.classList.remove('grid-container');
      } else {
            overviewContainer.classList.add('grid-container');
        }
    }
    
if(overviewContainer) {
    var x = window.matchMedia("(max-width: 760px)");
    myFunction(x); 
    x.addListener(myFunction);
}

////////// Count Width of Residential House Grid Container ///////////
const residentialHouseContainer = document.querySelector(".residentialHouseGridContainer");
if(residentialHouseContainer) {

    const len = document.getElementById('totalResidentialHouses').value;

    const size = len*347;

    residentialHouseContainer.style.width = `${size}px`; 
}

    function myFunctions(x) {
      if (x.matches) { // If media query matches

        residentialHouseContainer.classList.remove('residentialHouseGridContainer');
      } else {
        residentialHouseContainer.classList.add('residentialHouseGridContainer');
        }
    }
    
if(residentialHouseContainer) {
    var x = window.matchMedia("(max-width: 760px)");
    myFunctions(x); 
    x.addListener(myFunction);
}
      

////////////// Search Buildings ///////////////
const search = async (string) => {
    try {
        window.setTimeout( () => {
            location.assign(`/buildings/${string}`);
        }, 1200);
        alert("Success");  
    } catch(err) {
        alert(err);
    }
};

function searchBtn() {
    searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const string = document.getElementById('search-field').value;
        search(string);
    });
}

/////////////////////// One-liners again and again at home page img //////////////////
if(document.getElementById('bg-home-img')) {
    var lines = ["“Owning a home is a keystone of wealth… both financial affluence and emotional security.”",
                "“The house you looked at today and wanted to think about until tomorrow may be the same house someone looked at yesterday and will buy today.”",
                "“Real estate cannot be lost or stolen, nor can it be carried away. Purchased with common sense, paid for in full, and managed with reasonable care, it is about the safest investment in the world.”",
                "“The problem with real estate is that it’s local. You have to understand the local market.”",
                "“I will forever believe that buying a home is a great investment. Why? Because you can’t live in a stock certificate. You can’t live in a mutual fund.”",
                "“I will forever believe that buying a home is a great investment. Why? Because you can’t live in a stock certificate. You can’t live in a mutual fund.”",
                "“Don’t wait to buy real estate. Buy real estate and wait.”",
                "“A man travels the world over in search of what he needs and returns home to find it.”",
                "“It’s not about the money, though that’s nice to have. At the end of the day, it’s really about matching the right buyer to the right seller. We’re matchmakers—real estate matchmakers.”",
                "“Real Estate provides the highest returns, the greatest values, and the least risk.”",
                "“Home is the nicest word there is.”"];
    var i=0;
    setInterval( function myTimer() {
        var slogan = document.getElementById("overview-slogan");
        // slogan.classList.add('cssanimation');
        // slogan.classList.add('fadeInBottom');
        slogan.innerHTML = `<h1 id="one-liner" class="cssanimation fadeInBottom" style="color: black;">${lines[i++]}</h1>`;
        if(i===lines.length) {
            i=0;
        }
    }, 5000);
}

//////// Contact Builder ///////////
function sendMailBuilderBtn(builderId) {
    mailForm.addEventListener('submit', async event => {
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        const name = document.getElementById('nameMail').value;
        const email = document.getElementById('emailMail').value;
        const phone = document.getElementById('phoneMail').value;
        await mail(builderId, buildingId, name, email, phone, 'buildings');
    });
}

function sendMailAgentBtn(agentId) {
    mailAgentForm.addEventListener('submit', async event => {
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        const name = document.getElementById('nameAgentMail').value;
        const email = document.getElementById('emailAgentMail').value;
        const phone = document.getElementById('phoneAgentMail').value;
        await mail(agentId, buildingId, name, email, phone, 'buildings');
    });
}

function sendMailKnowMoreBtn(agentId) {
    mailAgentFormOnImg.addEventListener('submit', async event => {
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        const name = document.getElementById('nameAgentMailOnImg').value;
        const email = document.getElementById('emailAgentMailOnImg').value;
        const phone = document.getElementById('phoneAgentMailOnImg').value;
        await mail(agentId, buildingId, name, email, phone, 'buildings');
    });
}

function sendMailOwnerBtn(ownerId) {
    mailOwnerForm.addEventListener('submit', async event => {
        event.preventDefault();

        const buildingId = document.getElementById('id').value;
        const name = document.getElementById('nameOwnerMail').value;
        const email = document.getElementById('emailOwnerMail').value;
        const phone = document.getElementById('phoneOwnerMail').value;
        await mail(ownerId, buildingId, name, email, phone, 'residentialHouses');
    });
}

//////////////////////////////// WISHLISTS ////////////////////////////////////
/////////////// Add Building To My Wishlists /////////////
const postWish = async id => {
    try {
        const res = await axios({
            method: 'POST',
            url: `/api/v1/wishlists/my-wishlists/${id}`
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

function addWishlist(wishlist) {
    WishlistForm.addEventListener('submit', event=> {
        event.preventDefault();
        const elements = document.getElementsByClassName(`${wishlist}`);
        id = elements[0].value;
        console.log(id);
        postWish(id);
    });
}
function addWishlistIH(id) {
    independentHouseForm.addEventListener('submit', event=> {
        event.preventDefault();
        console.log(id);
        postWish(id);
    });
}

/////////////// Remove Building From My Wishlists////////////////
const deleteWish = async id => {
    try {
        const res = await axios({
            method: 'Delete',
            url: `/api/v1/wishlists/my-wishlists/${id}`
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

function deleteWishlist(id) {
    WishlistForm.addEventListener('submit', event=> {
        event.preventDefault();
        deleteWish(id);
    });
}
function deleteWishlistIH(id) {
    independentHouseForm.addEventListener('submit', event=> {
        event.preventDefault();
        // const elements = document.getElementsByClassName(`${wishlist}`);
        // id = elements[0].value;
        // alert(id);
        deleteWish(id);
    });
}

/////// logout //////
const LoggedOut = async () => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/logout'
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.reload();   
            }, 1200);
            alert("Logged Out Successfull");
        }
    } catch(err) {
        alert(err);
    }
};

if(logoutBtn || logoutBt) {
    document.querySelector('#logout').addEventListener('click', event => {
        LoggedOut();
    });
}

