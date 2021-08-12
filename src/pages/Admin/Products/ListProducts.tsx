import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchInput, ProductCard } from '../../../components';
import { getProducts } from '../../../services';
import { colors, admin, text } from '../../../styles';

interface ProductProps {
    setScreen: Function;
}

const Products: React.FC<ProductProps> = (props) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setScreen } = props;

    async function fillProducts() {
        setLoading(true);
        const result = await getProducts();
        setProducts(result.data.content);
        setLoading(false);
    }

    useEffect(() => {
        fillProducts();
    }, []);

    const data = search.length > 0 ?
        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <ScrollView contentContainerStyle={admin.container}>
            <TouchableOpacity
                style={admin.addButton}
                onPress={() => setScreen("newProduct")}
            >
                <Text style={text.addButtonText}>
                    Adicionar
                </Text>
            </TouchableOpacity>
            <SearchInput
                placeholder="Nome do produto"
                search={search}
                setSearch={setSearch}
            />
            {loading ? (<ActivityIndicator size="large" color={colors.primary} />) : (
                data.map((product) => (
                    <ProductCard {...product} key={product.id} role="admin" />
                )))}
        </ScrollView>
    );
}

export default Products;