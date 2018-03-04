import React,{Component} from 'react';
import {mainName,constructorStore} from "./common";
export default  injectCollection=>InjectComponent=>{
    if(Array.isArray(injectCollection)){
        let obj={};
        injectCollection.forEach(v=>obj[v]=v);
        injectCollection=obj;
    }


    class ServiceComponent extends Component{
        constructor(){
            super();
            this.$zStore={};
            this.$orders=[];

            const handleSingleStore=(injectName,originObj,originSub)=>{
                const injectOne={
                    orders:[],
                    store:constructorStore(originObj)
                };
                console.log(injectOne.store);
                for(let i in originSub){
                    injectOne.orders.push(
                        originSub[i].subscribe(v=>{
                            this.setState({});
                            //const obj={};
                            // this.setState(preState=>{
                            //     preState[injectName][i]=v;
                            //     obj[injectName]=Object.assign({},preState[injectName]);
                            //     return obj;
                            // });
                        })
                    )
                }
                //this.state=originObj;
                //this._zStore=Object.assign({},originObj);
                const defineObj={};
                Object.keys(originObj).forEach(key=>{
                    //extract function value:
                    if(typeof originObj[key]==='function')return;
                    defineObj[key]={
                        get:()=>originObj[key],
                        set:val=>originObj[key]=val
                    }
                });
                Object.defineProperties(injectOne.store,defineObj);
                return injectOne;
            };

            let singleResult,singleService;

            for(let i in injectCollection){
                //i inject name
                //value inject real name

                singleService=window[mainName][injectCollection[i]];
                if(!singleService)continue;
                singleResult=handleSingleStore(i,singleService.content,singleService.subs);
                this.$zStore[i]=singleResult.store;
                this.$orders.push(singleResult.orders);
            }
            this.state=this.$zStore;
        }

        render(){

            return React.createElement(InjectComponent,this.$zStore,null);
        }
        componentWillUnmount(){
            // this.orders.forEach(order=>order.unsubscribe());
            this.$orders.forEach(orders=>
                orders.forEach(order=>order.unsubscribe())
            )
        }
    }
    return ServiceComponent;
};

