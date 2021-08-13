import React, { useState, useEffect } from 'react';
import { Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SearchInput, ProductCard } from '../../../components';
import { deleteProduct, getProducts } from '../../../services';
import { colors, admin, text } from '../../../styles';

interface ProductsProps {
    setScreen: Function;
    setProductId: Function;
}

const Products: React.FC<ProductsProps> = (props) => {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { setScreen, setProductId } = props;

    async function fillProducts() {
        setLoading(true);
        const result = await getProducts();
        setProducts(result.data.content);
        setLoading(false);
    }

    async function handleDelete(id: number) {
        setLoading(true);
        const response = await deleteProduct(id);
        fillProducts();
    }

    function handleEdit(id: number) {
        setProductId(id);
        setScreen("editProduct");
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
                data.map((product) => {
                    const { id } = product;
                    return (<ProductCard
                        {...product}
                        key={id}
                        role="admin"
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />)
                }))}
        </ScrollView>
    );
}

export default Products;