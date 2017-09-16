import React from 'react';
import { TextInput, View, Text } from 'react-native';

const InputField = (props) => (
    
        <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
                {props.label}
            </Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                placeholder={props.placeholder}
                secureTextEntry={props.secureTextEntry}
                style={styles.inputStyle}
                autoCapitalize='none'
                autoCorrect={false}
                underlineColorAndroid='transparent'
            />
        </View>
    );


const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 20,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3,
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 10,
        flex: 1,
    },
    containerStyle: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    }
};

export { InputField };
