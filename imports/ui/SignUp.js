import React from 'react';
import { Link } from "react-router";
import { Accounts } from 'meteor/accounts-base';

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const email = this.refs['email'].value.trim();
        const password = this.refs['password'].value;

        Accounts.createUser({
            email, password
        }, (err) => {
            if( err ) {
                this.setState({
                    error: err.reason
                })
            } else {
                this.setState({
                    error: ''
                })
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Join</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form className="boxed-view__form"
                          onSubmit={this.onSubmit.bind(this)}>
                        <input ref="email" type="text" name="email" placeholder="E-Mail"/>
                        <input ref="password" type="password" name="password" placeholder="Password"/>
                        <button className="button" type="submit">Create an account</button>
                    </form>

                    <Link className="boxed-view__link" to="/">Already have an account?</Link>
                </div>
            </div>
        )
    }
}