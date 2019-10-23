import React, { Component, Fragment } from 'react';
import User from '../../interfaces/User.interface';
import Spinner from '../loading/loading';
import './personaldata.css';

class UserPersonalData extends Component<{
  login: string
}, {
  loading: boolean,
  user: User
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      user: {
        login: "",
        avatar_url: "",
        followers: 0,
        location: ""
      }
    }
  }

  componentWillMount() {
    this.fetchUserProfile();
  }


  fetchUserProfile = () => {

    fetch(`https://api.github.com/users/${this.props.login}`)
      .then(response => {
        response.json().then(results => {
          this.setState({
            loading: false,
            user: results

          })
        })
      })
  }

  render() {
    if(!this.state.loading)
    return (
      <div className="personal-data-div">
        <img className="profile-avatar" src={this.state.user.avatar_url} />
        <div className="name-div">
          <p>{this.state.user.login}</p>
        </div>
        <div className="location-follower-container">
          <div className="location-div">
            {this.state.user.location && <p className="profile-content-p"> {this.state.user.location}</p>}
          </div>
          <div className="followers-div">
            <p className="profile-content-p">{this.state.user.followers} Followers</p>
          </div>
        </div>
      </div>
    )
    else return(<Spinner/>)
  }
}
export default UserPersonalData;
