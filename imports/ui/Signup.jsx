import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';
import {Accounts} from 'meteor/accounts-base';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = ReactDOM.findDOMNode(this.refs.email).value.trim();
        let password = ReactDOM.findDOMNode(this.refs.password).value;
        if(password.length<9)
        {
            return  this.setState({
                error: 'Password must be more than 8 characters long.'
            });
        }
        Accounts.createUser({email, password}, (err) => {
            if(err){
                this.setState({
                    error: err.reason
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
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Create account</button>
                    </form>


                    <Link to="/login">Have an account?</Link>
                </div>
            </div>
        );
    }
}
