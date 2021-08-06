import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { api } from '../services';
import { theme, text, colors } from '../styles';
import arrow from '../assets/arrow-blue.png';

const ProductDetails: React.FC = ({
    route: { params: { id }, },
}) => {
    const navigation = useNavigation();
    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: [],
    });
    const [loading, setLoading] = useState(false);

    async function loadProductData() {
        setLoading(true);
        const result = await api.get(`/products/${id}`);
        setProduct(result.data);
        setLoading(false);
    }

    useEffect(() => {
        loadProductData();
    }, []);

    return (
        <View style={theme.detailsContainer}>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (<View style={theme.detailsCard}>
                    <TouchableOpacity
                        style={theme.goBackContainer}
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={arrow} />
                        <Text style={text.goBackText}>Voltar</Text>
                    </TouchableOpacity>
                    <ScrollView>
                        <View style={theme.productImageContainer}>
                            <Image source={{ uri: product.imgUrl }} style={theme.productImageDetails} />
                        </View>
                        <Text style={text.productDetailsName}>{product.name}</Text>
                        <View style={theme.priceContainer}>
                            <Text style={text.currency}>R$</Text>
                            <Text style={text.productPrice}>{product.price}</Text>
                        </View>
                        <View style={theme.scrollTextContainer}>
                            <Text style={text.productDescription}>{product.description}</Text>
                        </View>
                    </ScrollView>
                </View>)
            }
        </View>
    );
}

export default ProductDetails;