import React from 'react';
import { ProductCard, SearchInput } from '../components';
import productImg from '../assets/product.png';
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../styles';
import { useState } from 'react';

const products = [
    {
        id: 1,
        name: "Smartphone",
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
    const [search, setSearch] = useState("");

    const data = search.length > 0 ?
        products.filter(product => product.name.toLowerCase().includes(search.toLowerCase())) : products;

    return (
        <ScrollView contentContainerStyle={theme.scrollContainer}>
            <SearchInput
                placeholder="Nome do produto"
                search={search}
                setSearch={setSearch}
            />
            {data.map((product) => (
                <ProductCard {...product} key={product.id} />
            ))}
        </ScrollView>
    );
}

export default Catalog;