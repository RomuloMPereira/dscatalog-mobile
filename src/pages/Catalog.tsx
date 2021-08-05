import React from 'react';
import { ProductCard } from '../components';
import productImg from '../assets/product.png';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../styles';

const products = [
    {
        id: 1,
        name: "Computador Desktop - Intel Core i7",
        imgUrl: productImg,
        price: 2779.0,
    },
    {
        id: 2,
        name: "Computador Desktop - Intel Core i7",
        imgUrl: productImg,
        price: 2779.0,
    },
    {
        id: 3,
        name: "Computador Desktop - Intel Core i7",
        imgUrl: productImg,
        price: 2779.0,
    },
    {
        id: 4,
        name: "Computador Desktop - Intel Core i7",
        imgUrl: productImg,
        price: 2779.0,
    },
    {
        id: 5,
        name: "Computador Desktop - Intel Core i7",
        imgUrl: productImg,
        price: 2779.0,
    },
];

const Catalog: React.FC = () => {
    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            {products.map((product) => (
                <ProductCard {...product} key={product.id} />
            ))}
        </ScrollView>
    );
}

export default Catalog;