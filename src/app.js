import React, { Component } from 'react';
import { View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';

import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = { loggedIn: null };
        this.renderContent = this.renderContent.bind(this);
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyD77ndeJqocwHPoDNhy4kAMQXTBPBuV-a0',
            authDomain: 'login-auth-8c87a.firebaseapp.com',
            databaseURL: 'https://login-auth-8c87a.firebaseio.com',
            projectId: 'login-auth-8c87a',
            storageBucket: 'login-auth-8c87a.appspot.com',
            messagingSenderId: '797888061614'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                );

            case false:
                return <LoginForm />;

            default:
                return <Spinner />;

        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View>
                    <Header headerText="login" />
                    {this.renderContent()}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default App;
