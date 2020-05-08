import { formatDate } from '@angular/common';

let date = new Date();
const initialState = {
    users: [
        {
            username: "shyclouds",
            cnname: "李连杰",
            enname: "Jack Li",
            password: "",
            role_id: 1,
            email: "shyclouds@shyclouds.com",
            telephone: "01022334441",
            mobile: "13122334455",
            fax: "01022334442",
            address: "北京市长安街128号",
            post: "10001",
            token: "xxxxx",
            expired: new Date(),
            status: 1,
            ip: "127.0.0.1",
        }
    ],
    loading: false,
    loaded: true,
}

export function userReducer(state = initialState, action){
    switch(action.type){
        case "LOAD_USERS":{
            return {
                ...state,
                loading: true,
                loaded: false,
            }
        }
        default: {
            return state;
        }
    }
}