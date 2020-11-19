const signupForm = document.querySelector('.form-signup');

const signup = async(name, email, password, confirmPassword) => {
    try{
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            }
        });

        if (res.data.status === 'success') {
            window.setTimeout(() => {
              location.assign('/');
            }, 1200);
        }
    } catch (err) {
        alert(err);
    }
};

if(signupForm) {
    signupForm.addEventListener('submit', event => {
        event.preventDefault();
        const name = document.getElementById('name-field').value;
        const email = document.getElementById('email-field').value;
        const password = document.getElementById('pass-field').value;
        const confirmPassword = document.getElementById('passConfirm-field').value;

        signup(name, email, password, confirmPassword);
    });
}