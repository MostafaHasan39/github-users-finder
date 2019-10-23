import React, {Component} from 'react';
import SearchBar from '../searchbar/searchbar';
import SearchResults from '../searchresults/searchresults';
import './home.css';


class Home extends Component<{},{keyWord:string}>{
  state={
    keyWord:""
  }

submitSearch=(searchKeyWord:string)=>{
    this.setState({keyWord:searchKeyWord})   
}

  render(){
    return (
      <div className="home">
          <SearchBar submitSearch={this.submitSearch}/>
          <SearchResults keyWord={this.state.keyWord}/>       
      </div>
    );
  } 
}
export default Home;
