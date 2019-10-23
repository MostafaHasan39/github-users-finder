import React, { Component } from 'react';
import StarredRepos from '../starredrepos/starredrepos';
import UserPersonalData from '../personaldata/personaldata';
import Repos from '../repos/repos';
import './profile.css';


class Profile extends Component<{
    location:{
        state:{
            user:{
                id:number|string
                login:string,
                avatr_url:string
            }
        }  
    },
}> {

  render() {
    return (
      <div className="profile-container">
        <UserPersonalData login={this.props.location.state.user.login} />
        <Repos login={this.props.location.state.user.login} />
        <StarredRepos login={this.props.location.state.user.login}/>
      </div>
    );
  }
}
export default Profile;
