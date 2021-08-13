import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, TextInput, ActivityIndicator, Alert } from 'react-native';
import Toast from 'react-native-tiny-toast';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import arrow from '../../../assets/arrow-blue.png';
import { updateProduct, getProduct, getCategories, uploadImage } from '../../../services';
import { admin, colors, text, theme } from '../../../styles';

interface EditProductProps {
    setScreen: Function;
    productId: number;
}

const EditProduct: React.FC<EditProductProps> = (props) => {
    const { setScreen, productId } = props;
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({
        name: "",
        description: "",
        imgUrl: " ",
        price: "",
        categories: [],
    });
    const [categories, setCategories] = useState([]);
    const [showCategories, setShowCategories] = useState(false);
    const [image, setImage] = useState("");

    async function loadCategories() {
        setLoading(true);
        const result = await getCategories();
        setCategories(result.data.content);
        setLoading(false);
    }

    async function handleSave() {
        setLoading(true);
        const data = {
            ...product,
        }
        try {
            await updateProduct(data);
            setScreen("products");
            Toast.showSuccess("Produto atualizado com sucesso");
        } catch (e) {
            Toast.show("Erro ao salvar");
        }
        setLoading(false);
    }

    function getRawPrice(e) {
        const str = e;
        const res = str.slice(2).replace(/\./g, "").replace(/,/g, ".");
        return res;
    }

    async function selectImage() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        !result.cancelled && setImage(result.uri);
    };

    async function handleUpload() {
        uploadImage(image).then(res => {
            const { uri } = res?.data;
            setProduct({ ...product, imgUrl: uri });
        })
    }

    async function loadProduct() {
        setLoading(true);
        const res = await getProduct(productId);
        setProduct(res.data);
        setLoading(false);
    }

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, []);

    useEffect(() => {
        async () => {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Precisamos de acesso a biblioteca de imagens!");
            }
        }
    }, []);

    useEffect(() => {
        image ? handleUpload() : null;
    }, [image]);

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
                                            categories.map(cat => {
                                                const { id, name } = cat;
                                                return (<TouchableOpacity
                                                    style={admin.modalItem}
                                                    key={id}
                                                    onPress={() => {
                                                        setProduct({ ...product, categories: [{ id, name }] });
                                                        setShowCategories(!showCategories);
                                                    }}
                                                >
                                                    <Text>{name}</Text>
                                                </TouchableOpacity>
                                                )
                                            })
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
                            <TextInput
                                placeholder="Nome do produto"
                                style={admin.formInput}
                                value={product.name}
                                onChangeText={(e) => setProduct({ ...product, name: e })}
                            />
                            <TouchableOpacity
                                onPress={() => setShowCategories(!showCategories)}
                                style={admin.setectInput}
                            >
                                <Text>
                                    {
                                        product.categories.length > 0 && product.categories[0].name
                                    }
                                </Text>
                            </TouchableOpacity>
                            <TextInputMask
                                type="money"
                                placeholder="Preço"
                                style={admin.formInput}
                                value={(product.price)}
                                onChangeText={(e) => setProduct({ ...product, price: getRawPrice(e) })}
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                style={admin.uploadBtn}
                                onPress={() => selectImage()}
                            >
                                <Text style={text.uploadText}>Carregar imagem</Text>
                            </TouchableOpacity>
                            <Text style={text.fileSize}>
                                As imagens devem ser  JPG ou PNG e não devem ultrapassar 5 mb.
                            </Text>
                            <TouchableOpacity
                                onPress={() => selectImage()}
                                activeOpacity={0.9}
                                style={{ width: "100%", height: 150, borderRadius: 10, marginVertical: 10 }}
                            >
                                <Image
                                    source={image === "" ? { uri: product.imgUrl } : { uri: image }}
                                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                                />
                            </TouchableOpacity>
                            <TextInput
                                multiline
                                placeholder="Descrição"
                                style={admin.textArea}
                                value={product.description}
                                onChangeText={(e) => setProduct({ ...product, description: e })}
                            />
                            <View style={admin.buttonContainer}>
                                <TouchableOpacity
                                    style={admin.deleteButton}
                                    onPress={() => {
                                        Alert.alert("Deseja cancelar?", "Os dados inseridos não serão salvos", [
                                            {
                                                text: "Voltar",
                                                style: "cancel",
                                            },
                                            {
                                                text: "Confirmar",
                                                onPress: () => setScreen("products"),
                                                style: "default",
                                            }
                                        ])
                                    }}
                                >
                                    <Text style={text.deleteButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={admin.saveButton}>
                                    <Text
                                        style={text.saveButtonText}
                                        onPress={() => handleSave()}
                                    >
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                )
            }
        </View>
    );
}

export default EditProduct;