import React, {Component} from 'react';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import './home.css';


class Home extends Component<{},{keyWord:string}>{
  constructor(){
    super({});
    this.state={
        keyWord:""
    }
  }

submitSearch=(searchKeyWord:string)=>{
    this.setState({keyWord:searchKeyWord})   
}

removeSearchKeyWord=()=>{
  this.setState({keyWord:""});
}

  render(){
    return (
      <div className="home">
          <SearchBar submitSearch={this.submitSearch} keyWord={this.state.keyWord}/>
          <SearchResults keyWord={this.state.keyWord} removeSearchKeyWord={this.removeSearchKeyWord}/>       
      </div>
    );
  } 
}
export default Home;
