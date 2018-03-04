<h1 align='center'>react-inject2</h1>


>Dependency Injection for React

>The usage is very simple


Install
---
    
        npm install react-inject2 --save






Exmple:
===

- **`index.js`**
- 
```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';
    import {zProvider} from 'react-inject2';
    const mainService={
        name:'ztw',
        age:20,
        addAge:function(){
            this.age++;
        }
    }
    
    zProvider(
        {
            _myMain:mainService
        }
    )
    
    
    ReactDOM.render(
        <App/>,
        document.getElementById('root')
    )


``` 

- **`Child.js`**
- 
```js
...
import {zInject} from 'react-inject2';

const child=props=>(
    <div>
        <p>{props._myMain.age}</p>
        <button onClick={()=>props._myMain.age++}>addAge</button>
        <button onClick={()=>props._myMain.addAge()}>AddAge</button>
    </div>
)
export default zInject(['_myMain'])(child);

```
 
- **`App.js`**
- 


```js
...
import Child from './Child.js';
export default class extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <Child/>
                <Child/>
                <Child/>
            </div>
        )
    }
}


```
** You don't have to use `setState`.**

`react-reject2` will automatic detection of changes，and call `setState`;

<h1 align='center'>Multipe service:</h1>


> Inject multiple service

### Example:
 
- `provider.js`
- 

```js
const 
mainService={
    name:1
},
httpService={
    result:null,
    get:function(url){fetch(...).then(r=>this.result=v)}
},
userService={
    userName:null,
    getUserName:function(){}
};

zProvider({
    _main:mainService,
    _http:httpService,
    _user:userService
})

```
import `provider.js` in `index.js`:

- `index.js`
- 


```js
    ...
        import './provider.js'
    ...
```

> OK..Now we can use it as follow.


- `App.js`
- 
```js
...
import {zInject} from 'react-inject2';
const Child=zInject(['_main','_user'])(props=>{
    return (
        <div>
            {this.props._main.name}
            {this.props._user.userName}
            <button onClick={()=>this.props._main.name++}>add</button>
        </div>
    )
    
})

class app extends React.Component{
    constructor(){
        super();
    }
    render(){
        return (
            <div>
                <p>{this.props._main.name}</p>
                <p>{this.props._user.userName}</p>
                <p>
                {this.props._http.result}
                <button onClick={()=>this.props._http.get('myUrl')}>sendHttp</button>
                </p>
                <Child/>
            </div>
        )
    }
}

export default zInject(['_main','_http','_user'])(app)


```

Switch Inject:
---

```js    
    export default zInject(['_main'])(app);
```

Only `_main` be injected;

Alias Inject:
---
 
- **`app.js`**
- 
```js
    ...
    
    class app ...{
        render(){
            return (
                <div>
                    {this.props.myMain.name}
                    {this.props.myUser.userName}
                </div>
            )
        }
    }
    ...
    
    export default zInject({
        myMain:'_main',
        myUser:'_user'
    })(app)
```
    
