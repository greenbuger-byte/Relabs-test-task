const auth = {
    setAuth: function (data) {
        return new Promise((resolve => {
            localStorage.setItem('auth', data.email);
            setTimeout(() => {
                resolve({
                    id:1,
                    email: data.email
                })
            }, 2000);
        }))
    },
    getAuth: function () {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(localStorage.getItem('auth') || null);
            }, 0);
        });
    },
    removeAuth: function () {
        return new Promise(resolve => {
            setTimeout( () => {
                localStorage.removeItem('auth');
                resolve({
                    status: 200,
                })
            }, 0)
        })
    }
}

export default auth;