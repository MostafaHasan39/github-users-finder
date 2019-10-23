import React, { Component } from 'react';
import Repo from '../../interfaces/Repo.interface';
import Spinner from '../loading/loading';
import Error from '../error/error';

class Repos extends Component<{
  login: string
}, {
  errorState: boolean,
  errorCode: number | null,
  errorMsg:string | null,
  loading: boolean
  repos: Repo[]
}>{

  state = {
    errorState: false,
    errorCode: null,
    errorMsg:null,
    loading: true,
    repos: []
  }

  componentWillMount() {
    this.fetchRepos();
  }

  fetchRepos = () => {
    fetch(`https://api.github.com/users/${this.props.login}/repos?sort=created&direction=desc&page=1&per_page=5`)
      .then(response => {
        switch(response.status){
          case 200:{
            response.json().then(repos => {
              this.setState({
                loading: false,
                repos
              })
            })
              break;
          }
          // maximum rate for requests is reached
          case 403:{
              this.setState({ errorState: true,
                               errorCode: response.status,
                               errorMsg:"Maximum number of reuqests per minute is reached..Please try again within a minute..",
                               loading: false });
              break;
          }
          // reuest for records over 1,000
          case 422:{
              this.setState({ errorState: true,
                  errorCode: response.status,
                  errorMsg:"GitHub only allows first 1,000 record..",
                  loading: false });
          }
          default:{
              this.setState({ errorState: true, errorCode: response.status, loading: false });
              
          }
      }
      }).catch(err => {
        this.setState({ errorState: true, loading: false });
      })
  }


  ListRepos = () => {
    if(this.state.repos.length){
      return (
        <ul className="repo-list">
          {this.state.repos.map((repo: Repo) => {
            return <li key={repo.id} className="repo-item">
              <div className="repo-name-div">
                <p>{repo.name}</p>
              </div>
              <div className="repo-link-div">
                <a className="repo-link" href={repo.html_url}>Visit</a>
              </div>
            </li>
          })}
        </ul>
      )
    }else{
      return(
        <div className="no-results-div">
          No Repos for this user..
        </div>
      )
    }
  }

  displayError = () => {
    return <Error errorCode={this.state.errorCode} errorMsg={this.state.errorMsg}  />
  }

  render() {
    if (!this.state.loading) {
      return (
        <div className="repo-div">
          <p className="repo-div-title">User repos</p>

          {this.state.errorState ? this.displayError() : this.ListRepos()}
        </div>

      )
    }
    else return (<Spinner />)
  }
}
export default Repos;
