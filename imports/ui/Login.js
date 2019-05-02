import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const email = this.refs.email.value.trim();
        const password = this.refs.password.value.trim();

        Meteor.loginWithPassword({email}, password, (err) => {
            if (err) {
                this.setState({
                    error: err.reason
                });
            } else {
                this.setState({
                    error: ''
                })
            }
        })

    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}

                    <form
                        className="boxed-view__form"
                        onSubmit={this.onSubmit.bind(this)}>

                        <input ref="email" type="text" name="email" placeholder="E-Mail"/>
                        <input ref="password" type="password" name="password" placeholder="Password"/>

                        <button className="button" type="submit">Login</button>
                    </form>

                    <Link className="boxed-view__link" to="/signup">Need an account?</Link>
                </div>
            </div>
        )
    }
}