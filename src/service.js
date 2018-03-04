import Subject from './subject';

const createServer=obj=>{
    const defineObj={};
    const subObj={};
    Object.keys(obj).forEach(key=>{
        let value=obj[key];
        let selfSub=subObj[key]=new Subject();
        if(typeof value==='function')return;
       defineObj[key]={
           set:val=>{
               if(val===value)return;
               selfSub.next(val);
               value=val;
           },
           get:()=>value
       }
    });
  Object.defineProperties(obj,defineObj);
    return subObj;
};

export default createServer;