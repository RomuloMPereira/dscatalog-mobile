import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { api } from '../services';
import { theme, text, colors } from '../styles';
import arrow from '../assets/arrow-blue.png';

const ProductDetails: React.FC = ({
    route: { params: { id }, },
}) => {
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
        <View>
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) :
                (<View>
                    <TouchableOpacity>
                        <Image source={arrow} />
                        <Text>Voltar</Text>
                    </TouchableOpacity>
                    <View>
                        <Image source={{ uri: product.imgUrl }} style={{ width: 270, height: 270 }} />
                        <Text>{product.name}</Text>
                        <View>
                            <Text>R$</Text>
                            <Text>{product.price}</Text>
                        </View>
                        <ScrollView>
                            <Text>{product.description}</Text>
                        </ScrollView>
                    </View>
                </View>)
            }
        </View>
    );
}

export default ProductDetails;