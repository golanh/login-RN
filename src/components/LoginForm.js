import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Card, CardSection, Button, InputField, Spinner } from './common';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: false,
        };
        this.onButtonPressed = this.onButtonPressed.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
    }

    onButtonPressed() {
        const { email, password } = this.state;

        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess)
            .catch(() => {
                console.log('failed to login');
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess)
                    .catch(() => {
                        console.log('failed to create');
                        this.setState({ error: 'failed to log in', loading: false });
                    });
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '', password: '', loading: false, error: ''
        });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <InputField
                        label="email"
                        placeholder="user@example.com"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                </CardSection>

                <CardSection>
                    <InputField
                        label="password"
                        placeholder="password"
                        value={this.state.password}
                        onChangeText={text => this.setState({ password: text })}
                        secureTextEntry
                    />
                </CardSection>

                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.state.loading ?
                        <Spinner /> :
                        <Button onPress={this.onButtonPressed}>
                            Log In
                        </Button>
                    }
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;
