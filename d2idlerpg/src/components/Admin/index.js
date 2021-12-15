import React, { Component } from 'react';
import { getDatabase, off, onValue } from "firebase/database";

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';

import * as ROLES from '../../constants/roles';


class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAdmin: false,
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    onValue(this.props.firebase.usersRef(), (snapshot) => {
      if (snapshot.exists()) {
        const usersObject = snapshot.val();
        const usersList = Object.keys(usersObject).map(key => ({
          ...usersObject[key],
          uid: key,
        }));

        this.setState({
          users: usersList,
          loading: false,
        });

      } else {
        console.log('no users')
      }
    });
  }

  componentWillUnmount() {
    off(this.props.firebase.usersRef());
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}

        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
          <strong>ID: </strong> {user.uid} 
          <strong> E-Mail: </strong> {user.email} 
          <strong> Username: </strong> {user.username} 
      </li>
    ))}
  </ul>
);

const condition = authUser => authUser

export default compose(
  withFirebase,
  withAuthorization(condition),
)(AdminPage);