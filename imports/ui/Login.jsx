import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }
    componentDidMount(){
        ReactDOM.findDOMNode(this.refs.email).focus();
    }
    onSubmit(e) {
        e.preventDefault();
        let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        Meteor.loginWithPassword(email, password, (err,result) => {
            if(err){
                this.setState({
                    error: 'Unable to login.check email and password.'
                });
            }
            else {
                this.setState({
                    error: ''
                });
            }
        });

    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>
                    <Link to="/signup">Need an account?</Link>
                </div>
            </div>
        );
    }
}
