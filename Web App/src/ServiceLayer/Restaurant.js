import axios from 'axios';

const restaurant_list = () => {
    return (dispatch) => {
        var restaurantList = [];
        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/elasticsearch/getallrestaurants',
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            }
        };
        axios(options)
            .then(response => {
                //console.log(response.data.data);
                restaurantList = response.data.data;
                restaurantList.forEach(doc => {
                    doc.id = doc._id;
                })
                dispatch({
                    type: 'RESTAURANT_LIST',
                    restaurantList: restaurantList
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
};

const my_foods = () => {
    return (dispatch) => {
        var myFoods = [];
        var token = localStorage.getItem('securityToken');
        const options = {
            url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/menuitems',
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
                myFoods = response.data.data;
                myFoods.forEach(doc => {
                    doc.id = doc._id;
                })
                dispatch({
                    type: 'MY_FOODS',
                    myFoods: myFoods
                })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function addItem(itemDetails) {
    const { itemTitle, itemIngredients, itemPrice, itemImage, chooseItemType, } = itemDetails;
    var token = localStorage.getItem('securityToken');
    return new Promise((resolve, reject) => {
        const url = process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/images/user';
        const formData = new FormData();
        formData.append('image', itemImage);
        const options = {
            headers: {
                'Accept': 'multipart/form-data',
                'Content-Type': 'multipart/form-data',
                "Authorization": `Bearer ${token}`
            }
        };
        axios.post(url, formData, options)
            .then((response) => {
                //console.log(response.data.data.url);
                var ImageURL = response.data.data.url;
                const itemDetailsForDb = {
                    itemTitle: itemTitle,
                    itemIngredients: itemIngredients,
                    itemPrice: itemPrice,
                    itemImageUrl: ImageURL,
                    chooseItemType: chooseItemType,
                }
                const AddItem = {
                    url: process.env.REACT_APP_NodeJS_ServiceURL + '/api/v1/menuitems',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                        "Authorization": `Bearer ${token}`
                    },
                    data: itemDetailsForDb
                };
                axios(AddItem)
                    .then(result => {
                        console.log("Item Added: ", result.status);
                        resolve("Successfully added food item");
                    })
                    .catch(error => {
                        console.log(error);
                        var errorMessage = error.message;
                        reject(errorMessage);
                    })
            }).catch((error) => {
                console.log("Error adding document: ", error);
                var errorMessage = error.message;
                reject(errorMessage);
            });
    })
}

const removeItem = (menuitemID) => {
    return new Promise((resolve, reject) => {

    })
}

export {
    restaurant_list,
    my_foods,
    addItem,
    removeItem
}