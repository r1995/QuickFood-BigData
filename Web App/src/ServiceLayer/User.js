import axios from 'axios';


const logIn = (userLoginDetails) => {
    //console.log("User.js :" + userLoginDetails);
    return new Promise((resolve, reject) => {
        const { userLoginEmail, userLoginPassword } = userLoginDetails;
        //console.log(userLoginDetails);

        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/login',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: {
                "userEmail": userLoginEmail,
                "userPassword": userLoginPassword
            }
        };

        axios(options)
            .then(response => {
                //console.log(response.data.token);
                localStorage.setItem('securityToken', response.data.token);
                var serviceUrl = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/me';
                axios.get(serviceUrl, { headers: { "Authorization": `Bearer ${response.data.token}` } })
                    .then(response => {
                        //console.log(response.data.data);
                        console.log("Is Restaurant =>>", response.data.data.isRestaurant);
                        //const UserData = response.data.data;
                        if (response.data.data.isRestaurant) {
                            userLoginDetails.propsHistory.push("/order-requests");
                            resolve(response);
                        } else {
                            userLoginDetails.propsHistory.push("/");
                            resolve(response);
                        }
                        // dispatch({
                        //     type: 'SET_USER',
                        //     user: { UserData, isLogin: true }
                        // })
                    }, error => {
                        console.log(error);
                        var errorMessage = error.message;
                        reject(errorMessage)
                    });
            })
            .catch(error => {
                console.log(error);
                var errorMessage = error.message;
                reject(errorMessage)
            });
    });
};


const signUp = (userDetails) => {
    return new Promise((resolve, reject) => {
        const { userName, userEmail, userPassword, userCity, userCountry, userGender, userAge, userProfileImage, isRestaurant, typeOfFood } = userDetails;
        const serviceUrl = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/images';
        const formData = new FormData();
        formData.append('image', userProfileImage);
        const config = {
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data'
            }
        };
        axios.post(serviceUrl, formData, config)
            .then((response) => {
                //console.log(response.data.data.url);
                var ImageURL = response.data.data.url;
                const userDetailsForDb = {
                    userName: userName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                    userCity: userCity,
                    userCountry: userCountry,
                    userGender: userGender,
                    userAge: userAge,
                    isRestaurant: isRestaurant,
                    userProfileImageUrl: ImageURL,
                    typeOfFood: typeOfFood,
                }
                const RegisterUser = {
                    url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/register',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: userDetailsForDb
                };
                axios(RegisterUser)
                    .then(result => {
                        //console.log(result.data.token);
                        var token = result.data.token;
                        localStorage.setItem('securityToken', token);
                        var serviceURL = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/me';
                        axios.get(serviceURL, { headers: { "Authorization": `Bearer ${token}` } })
                            .then(res => {
                                //console.log(res.data.data);
                                console.log("Is Restaurant =>>", res.data.data.isRestaurant);
                                if (res.data.data.isRestaurant) {
                                    userDetails.propsHistory.push("/order-requests");
                                    resolve(userDetailsForDb);
                                } else {
                                    userDetails.propsHistory.push("/");
                                    resolve(userDetailsForDb);
                                }
                            }, error => {
                                console.log(error);
                                var errorMessage = error.message;
                                reject(errorMessage)
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        var errorMessage = error.message;
                        reject(errorMessage)
                    })
            }).catch((error) => {
                console.log("Error adding document: ", error);
                var errorMessage = error.message;
                reject(errorMessage)
            });
    })
}

const update_user = () => {
    return (dispatch) => {
        var UserData = null;
        if (localStorage["securityToken"]) {
            var token = localStorage.getItem('securityToken');
            var serviceURL = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/me';
            axios.get(serviceURL, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    //console.log(response.data.data);
                    UserData = response.data.data;
                    dispatch({
                        type: 'SET_USER',
                        user: { ...response.data.data, isLogin: true }
                    })
                }, error => {
                    console.log(error);
                });
        }
    }
}

const remove_user = () => {
    return (dispatch) => {
        var token = localStorage.getItem('securityToken');
        localStorage.removeItem('securityToken');
        var serviceURL = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/logout';
        axios.get(serviceURL, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                localStorage.removeItem('securityToken');
                console.log("Logged Out =>>", response.data.status);
                dispatch({
                    type: 'REMOVE_USER',
                    user: { isLogin: false }
                })
            }, error => {
                console.log(error);
            });

    }
}


export {
    logIn,
    signUp,
    update_user,
    remove_user
}