const axios = require('axios');

( async () => {
    const { data } =  await axios.post('http://localhost:3000/auth/register', {
        username: 'username',
        password : 'password',
    });

    console.log(data);
})();