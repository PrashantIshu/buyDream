const loginForm = document.querySelector('.form-login');

const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });

        if(res.data.status === 'success') {
            window.setTimeout( () => {
                location.assign('/');
            }, 1200);
        }
    } catch(err) {
        alert(err);
    }
};

if(loginForm) {
    // alert("Hellow");
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('email-field').value;
        const password = document.getElementById('pass-field').value;
        login(email, password);
    });
}
