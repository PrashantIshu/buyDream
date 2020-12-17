const loginForm = document.querySelector('.form-login');
const forgotPasswordForm = document.querySelector('.form-forgot-pass');
const resetPasswordForm = document.querySelector('.form-reset-pass');

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
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('email-field').value;
        const password = document.getElementById('pass-field').value;
        login(email, password);
    });
}


////////////////// Forgot Password //////////////////////
const forgotPassword = async (email) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/forgotPassword',
            data: { email }
        });

        if(res.data.status === 'success') {
            alert("Resent Token Sent to Your Mail");
            window.setTimeout( () => {
                location.reload();
            }, 1200);
        }
    } catch(err) {
        alert(err);
    }
};

function forgotPass() {
    forgotPasswordForm.addEventListener('submit', event => {
        event.preventDefault();
        const email = document.getElementById('email-field').value;
        forgotPassword(email);
    });
}


////////////////// Reset Password //////////////////////
const resetPassword = async (password, confirmPassword, token) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `/api/v1/users/resetPassword/${token}`,
            data: { 
                password,
                confirmPassword 
            }
        });

        if(res.data.status === 'success') {
            alert("Password Reset Successfull");
            window.setTimeout( () => {
                location.assign('/');
            }, 1200);
        }
    } catch(err) {
        alert(err);
    }
};

function resetPass(token) {

    resetPasswordForm.addEventListener('submit', event => {
        event.preventDefault();

        const password = document.getElementById('pass-field').value;
        const confirmPassword = document.getElementById('passConfirm-field').value;
        resetPassword(password, confirmPassword, token);
    });
}