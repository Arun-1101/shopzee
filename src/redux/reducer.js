import React from "react";
import { LOGIN } from "./constants";
import { Store } from "./store";
export const Reducer=(initial_state=Store,action)=>{
    const {type,payload}=action
    switch(type){
        case LOGIN:
            return{
                ...initial_state,isLoggin:!payload
            }
    }
}