import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { admin, text, theme } from '../styles';

interface ProductProps {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
    role?: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price, role }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            style={theme.productCard}
            onPress={() => navigation.navigate("ProductDetails", { id })}
        >
            <Image source={{ uri: imgUrl }} style={theme.productImage} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={theme.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productPrice}>{price}</Text>
                </View>
            </View>
            {
                role === 'admin' && (
                    <View style={admin.buttonContainer}>
                        <TouchableOpacity style={admin.deleteButton}>
                            <Text style={text.deleteButtonText}>
                                Excluir
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={admin.editButton}>
                            <Text style={text.editButtonText}>
                                Editar
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </TouchableOpacity>
    );
}

export default ProductCard;