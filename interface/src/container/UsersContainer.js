import React, {Component} from 'react'; 
import {connect} from 'react-redux';
import {userRegister} from '../actions';
import { Route } from 'react-router-dom';
import Register from '../components/Register';

class UsersContainer extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
        }
    }

    inputHandler = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    onRegisterHandler = e => {
        e.preventDefault(); 
        this.props.userRegister(this.state)
        this.props.history.push('/users'); 
    }

    render(){
        return(
            <Route
                path="/register"
                render={props => (
                <Register
                    {...props}
                    inputHandler={this.inputHandler}
                    onRegisterHandler={this.onRegisterHandler}
                />
            )}
          />
        )
    }
}

const mapStatetoProps = state =>({
    users: state.users
});

export default connect(mapStatetoProps, {
    actions: userRegister
    })((UsersContainer));
