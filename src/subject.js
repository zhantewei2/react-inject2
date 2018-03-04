export default class{
    constructor(){
        this.store=[];
        this.index=0;
    }
    next(val){
        this.store.forEach(v=>v.cb(val));
    }
    subscribe(cb){
        const orderIndex=++this.index;
        this.store.push({index:orderIndex,cb:cb});
        return {
            unsubscribe:()=>this.store.splice(this.store.findIndex(item=>item.index===orderIndex),1)
        }
    }
}