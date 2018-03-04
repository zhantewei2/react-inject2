export const mainName='$ztwStore';
export const constructorStore=(originObj)=>{
    let obj={},value;
    for(let i in originObj){
        value=originObj[i];
        obj[i]=(typeof value==='function')?value.bind(originObj):value;
    }
    return obj;
}