import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { text, theme } from '../styles';
import eyesOpened from '../assets/eyes-opened.png';
import eyesClosed from '../assets/eyes-closed.png';
import arrow from '../assets/arrow.png';
import { login, isAuthenticated } from '../services/auth';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const [hidePassword, setHidePassword] = useState(true);
    const [userInfo, setUserInfo] = useState({
        username: "",
        password: ""
    });
    const [userFetchData, setUserFetchData] = useState({});

    async function handleLogin() {
        const data = await login(userInfo);
        setUserFetchData(userInfo);
        //console.warn(data);
        navigation.navigate("Dashboard");
    }

    return (
        <View style={theme.container}>
            <View style={theme.loginCard}>
                <Text style={text.loginTitle}>
                    Login
                </Text>
                <View style={theme.form}>
                    <TextInput
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={theme.textInput}
                        value={userInfo.username}
                        onChangeText={
                            (e) => {
                                const newUserInfo = { ...userInfo };
                                newUserInfo.username = e;
                                setUserInfo(newUserInfo);
                            }
                        }
                    />
                    <View style={theme.passwordContainer}>
                        <TextInput
                            placeholder="Senha"
                            autoCapitalize="none"
                            style={theme.textInput}
                            value={userInfo.password}
                            secureTextEntry={hidePassword}
                            onChangeText={
                                (e) => {
                                    const newUserInfo = { ...userInfo };
                                    newUserInfo.password = e;
                                    setUserInfo(newUserInfo);
                                }
                            }
                        />
                        <TouchableOpacity
                            onPress={() => setHidePassword(!hidePassword)}
                            style={theme.toggle}
                        >
                            <Image
                                source={hidePassword ? eyesClosed : eyesOpened}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={theme.primaryButton}
                        activeOpacity={0.8}
                        onPress={() => handleLogin()}
                    >
                        <View>
                            <Text style={text.primaryText}>Fazer login</Text>
                        </View>
                        <View style={theme.arrowContainer}>
                            <Image source={arrow} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default Login;