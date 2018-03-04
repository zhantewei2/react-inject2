import {mainName} from './common';
import createService from './service';
//params

export default function Provider(params){
    const obj={};
    let value;
    for(let i in params){
        value=params[i];
        obj[i]={
            content:value,
            subs:createService(value)
        }
    }
    window[mainName]=obj;
}