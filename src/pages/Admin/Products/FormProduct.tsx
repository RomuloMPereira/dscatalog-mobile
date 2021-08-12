import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator } from 'react-native';
import arrow from '../../../assets/arrow-blue.png';
import { admin, colors, text, theme } from '../../../styles';

interface FormProductProps {
    setScreen: Function;
}

const FormProduct: React.FC<FormProductProps> = (props) => {
    const { setScreen } = props;
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(false);
    const [product, setProduct] = useState({
        name: null,
        description: null,
        imgUrl: null,
        price: null,
        categories: null,
    });
    const [categories, setCategories] = useState([
        {
            id: 3,
            name: "Computadores"
        },
        {
            id: 2,
            name: "Eletrônicos"
        },
        {
            id: 1,
            name: "Celulares"
        }
    ]);
    const [showCategories, setShowCategories] = useState(false);

    return (
        <View style={admin.formContainer}>
            {
                loading ? <ActivityIndicator size="large" /> : (
                    <View style={admin.formCard}>
                        <ScrollView>
                            <Modal
                                visible={showCategories}
                                animationType="fade"
                                transparent={true}
                                presentationStyle="overFullScreen"
                            >
                                <View style={admin.modalContainer}>
                                    <ScrollView contentContainerStyle={admin.modalContent}>
                                        {
                                            categories.map(cat => (
                                                <TouchableOpacity
                                                    style={admin.modalItem}
                                                    key={cat.id}
                                                    onPress={() => {
                                                        setProduct({ ...product, categories: cat.name });
                                                        setShowCategories(!showCategories);
                                                    }}
                                                >
                                                    <Text>{cat.name}</Text>
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </ScrollView>
                                </View>
                            </Modal>
                            <TouchableOpacity
                                onPress={() => setScreen("products")}
                                style={theme.goBackContainer}
                            >
                                <Image source={arrow} />
                                <Text style={text.goBackText}>Voltar</Text>
                            </TouchableOpacity>
                            <TextInput placeholder="Nome do produto" style={admin.formInput} />
                            <TouchableOpacity
                                onPress={() => setShowCategories(!showCategories)}
                                style={admin.setectInput}
                            >
                                <Text style={product.categories === null ? { color: "#cecece" } : { color: "#000" }}>
                                    {
                                        product.categories === null ? "Escolha uma categoria" : product.categories
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TextInput placeholder="Preço" style={admin.formInput} />
                            <TouchableOpacity activeOpacity={0.8} style={admin.uploadBtn}>
                                <Text style={text.uploadText}>Carregar imagem</Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>
                                As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.
                            </Text>
                            <TextInput multiline placeholder="Descrição" style={admin.textArea} />
                            <View style={admin.buttonContainer}>
                                <TouchableOpacity style={admin.deleteButton}>
                                    <Text style={text.deleteButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={admin.saveButton}>
                                    <Text style={text.saveButtonText}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
}

export default FormProduct;