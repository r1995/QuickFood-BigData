import axios from 'axios';


const order_notification = () => {
    return (dispatch) => {
        var notification = null;
        if (localStorage["securityToken"]) {
            var token = localStorage.getItem('securityToken');
            var serviceURL = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/auth/get_Notification';
            axios.get(serviceURL, { headers: { "Authorization": `Bearer ${token}` } })
                .then(response => {
                    //console.log(response.data.data);
                    notification = response.data.data;
                    dispatch({
                        type: 'ORDER_NOTIFICATION',
                        notification: { notification, isLogin: true }
                    })
                }, error => {
                    console.log(error);
                });
        }
    }
}

/*
const order_notification = () => {
    return (dispatch) => {
        var notification = null;
        var token = localStorage.getItem('securityToken');
        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/kafkaConsumer',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": `Bearer ${token}`
            }
        };
        axios(options)
            .then(response => {
                
                notification = response.data.data;                
                dispatch({
                    type: 'ORDER_NOTIFICATION',
                    notification: notification
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
};
*/


const order_request = () => {
    return (dispatch) => {
        var orderRequest = [];
        var token = localStorage.getItem('securityToken');
        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/orders',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": `Bearer ${token}`
            }
        };
        axios(options)
            .then(response => {
                //console.log(response.data.data);
                orderRequest = response.data.data;
                orderRequest.forEach(doc => {
                    doc.id = doc._id;
                })
                dispatch({
                    type: 'ORDER_REQUEST',
                    orderRequest: orderRequest
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
};

const my_order = () => {
    return (dispatch) => {
        var myOrder = [];
        var token = localStorage.getItem('securityToken');
        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/orders',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": `Bearer ${token}`
            }
        };
        axios(options)
            .then(response => {
                //console.log(response.data.data);
                myOrder = response.data.data;
                myOrder.forEach(doc => {
                    doc.id = doc._id;
                })
                dispatch({
                    type: 'MY_ORDER',
                    myOrder: myOrder
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
};

const orderNow = (cartItemsList, totalPrice, resDetails, userDetails, history) => {
    var token = localStorage.getItem('securityToken');
    return new Promise((resolve, reject) => {
        // let user = firebase.auth().currentUser;
        // var uid;
        // if (user != null) {
        //     uid = user.uid;
        // };

        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/orders/' + resDetails.id,
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
                "Authorization": `Bearer ${token}`
            },
            data: {
                "totalPrice": totalPrice,
                "itemList": cartItemsList
            }
        }
        axios(options)
            .then(response => {
                //console.log(response.status);
                resolve('Successfully ordered');
            })
            .catch(error => {
                console.log(error);
                reject(error.message);
            });
    })
};


export {
    order_request,
    my_order,
    orderNow,
    order_notification
}