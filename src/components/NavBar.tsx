import React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import menu from '../assets/menu.png';
import { nav, text } from '../styles';
import { doLogout, isAuthenticated } from '../services/auth';

const NavBar: React.FC = () => {
    const [show, setShow] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();

    async function logged() {
        const result = await isAuthenticated();

        result ? setAuthenticated(true) : setAuthenticated(false);
    }

    useEffect(() => {
        logged();
    }, [logged])

    function navigate(path: any) {
        if (path) {
            setShow(false);
            navigation.navigate(path);
        }
        setShow(false);
    }

    function logout() {
        doLogout();
        navigation.navigate("Login");
    }

    return (
        <>
            {
                authenticated ? (
                    <TouchableOpacity
                        onPress={() => logout()}
                        style={nav.logoutBtn}
                    >
                        <Text style={text.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={nav.drawer}
                        onPress={() => setShow(!show)}
                    >
                        <Image source={menu} />
                        {
                            show ? (<View style={nav.options}>
                                <TouchableOpacity
                                    style={nav.option}
                                    onPress={() => navigate("Home")}
                                >
                                    <Text
                                        style={[
                                            nav.textOption,
                                            route.name === "Home" ? nav.textActive : null]}
                                    >
                                        Home
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={nav.option}
                                    onPress={() => navigate("Catalog")}
                                >
                                    <Text
                                        style={[
                                            nav.textOption,
                                            route.name === "Catalog" ? nav.textActive : null]}
                                    >
                                        Catálogo
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={nav.option}
                                    onPress={() => navigate("Login")}
                                >
                                    <Text
                                        style={[
                                            nav.textOption,
                                            route.name === "Login" ? nav.textActive : null]}
                                    >
                                        ADM
                                    </Text>
                                </TouchableOpacity>
                            </View>) : null
                        }
                    </TouchableOpacity>
                )
            }
        </>

    );
}

export default NavBar;