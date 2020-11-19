const postWishlistForm = document.querySelector('#wishlist-container');


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
    alert("Hello");
    postWishlistForm.addEventListener('submit', event=> {
        event.preventDefault();
        alert("Hello from Prashant");
        const elements = document.getElementsByClassName(`${wishlist}`);
        // console.log(elements[0].value);
        id = elements[0].value;
        // alert(id);
        postWish(id);
    });
}

