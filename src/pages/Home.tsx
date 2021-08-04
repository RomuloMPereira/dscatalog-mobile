import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const Home: React.FC = ({ navigation }) => {
    return (
        <View>
            <Text>
                Bem vindo ao App
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Catalog')}>
                <Text>Clique aqui</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Home;