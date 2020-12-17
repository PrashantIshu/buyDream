const updateUserForm = document.querySelector('#update-form');
const updatePasswordForm = document.querySelector('#password-form');

const saveSettings = async (data, type) => {
    try {
        const url = type === 'password'
                    ?'/api/v1/users/updatePassword'
                    :'/api/v1/users/updateMe';

        const res = await axios({
            method: 'PATCH',
            url,
            data
        });

        if(res.data.status === 'success') {
            window.setTimeout(  () => {
                location.reload();
            }, 1200);
            alert('User Settings Update Successfull');
        }
    } catch(err) {
        alert(err);
    }
};

if(updateUserForm) {
    updateUserForm.addEventListener('submit', async event => {
        event.preventDefault();

        const form = new FormData();
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0]);
        
        await saveSettings(form, 'data');
    });
}

if(updatePasswordForm) {
    updatePasswordForm.addEventListener('submit', async event => {
        event.preventDefault();
        const currentPassword = document.getElementById('current-password').value;
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        await saveSettings({
            currentPassword,
            password,
            confirmPassword
        }, 'password');
    });
}