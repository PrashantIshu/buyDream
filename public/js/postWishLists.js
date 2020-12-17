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
    postWishlistForm.addEventListener('submit', event=> {
        event.preventDefault();
        const elements = document.getElementsByClassName(`${wishlist}`);
        id = elements[0].value;
        postWish(id);
    });
}

