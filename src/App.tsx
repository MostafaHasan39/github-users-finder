import React,{Component} from 'react';
import './App.css';

import { BrowserRouter, Switch, Route} from 'react-router-dom';


import Navigation from './components/navbar/navbar';
import Home from './components/home/home';
import Profile from './components/profile/profile';

class App extends Component<{},{keyWord:string}>{
  constructor(props:any){
    super(props);
    this.state={
      keyWord:""
    }
  }
  
  changeSearchKeyWord=(newKeyWord:string)=>{
    this.setState({keyWord:newKeyWord});
  }
  render(){
    return (
      <div className="App">
        
        <BrowserRouter>
        <Navigation/>
        <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/profile' component={Profile} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  } 
}

export default App
