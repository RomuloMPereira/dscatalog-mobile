import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get('window').width;

const colors = {
    white: "#FFFFFF",
    lightGray: "#F2F2F2",
    mediumGray: "#9E9E9E",
    darkGray: "#263238",
    black: "#000000",
    primary: "#407BEE",
    secondary: "#33569B",
    bluePill: "#407BFF61",
    red: "#DF5753",
    borderGray: "#E1E1E1",
}

const text = StyleSheet.create({
    bold: {
        fontSize: 26,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 15,
        color: colors.darkGray,
    },
    regular: {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        color: colors.mediumGray,
    },
    primaryText: {
        textTransform: "uppercase",
        fontSize: 14,
        fontWeight: "bold",
        color: colors.white,
        marginLeft: 20,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    currency: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,
    },
    productPrice: {
        fontSize: 30,
        fontWeight: "bold",
        color: colors.primary,
    },
    goBackText: {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
        color: colors.darkGray,
        marginLeft: 16,
    },
    productDetailsName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 10,
        color: colors.darkGray,
    },
    productDescription: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.mediumGray,

    },
});

const theme = StyleSheet.create({
    //Home
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: "center",
        justifyContent: "space-around",
    },
    draw: {
        width: 313,
        height: 225,
    },
    textContainer: {
        paddingHorizontal: 20,
    },
    primaryButton: {
        backgroundColor: colors.primary,
        width: 290,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 10,
    },
    arrowContainer: {
        backgroundColor: colors.secondary,
        height: 50,
        width: 50,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    //Catalog
    scrollContainer: {
        padding: 10,
    },
    productCard: {
        width: "100%",
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "space-around",
        paddingTop: 16,
    },
    productDescription: {
        width: "100%",
        padding: 20,
        borderTopColor: colors.lightGray,
        borderTopWidth: 1,
        marginTop: 16,
    },
    priceContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    productImage: {
        width: 140,
        height: 140,
    },
    //Filter
    inputContainer: {
        width: "100%",
        height: 60,
        backgroundColor: colors.white,
        borderRadius: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 1,
        alignItems: "center",
        marginVertical: 12.5,
        paddingVertical: 10,
    },
    searchInput: {
        width: "90%",
        height: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.borderGray,
    },
    //Product Details
    detailsContainer: {
        backgroundColor: colors.white,
        padding: 20,
    },
    detailsCard: {
        width: "100%",
        height: "100%",
        backgroundColor: colors.white,
        borderRadius: 20,
        borderColor: colors.mediumGray,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 1,
        padding: 20,
    },
    goBackContainer: {
        width: 290,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    productImageContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.lightGray,
        alignItems: "center",
        borderRadius: 20,
    },
    productImageDetails: {
        width: 220,
        height: 220,
    },
    scrollTextContainer: {
        marginVertical: 20,
        padding: 20,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: colors.lightGray,
    }
});

const nav = StyleSheet.create({
    leftText: {
        color: colors.white,
        fontWeight: "bold",
        marginLeft: 20,
    },
    drawer: {
        marginRight: 20,
    },
    options: {
        width: deviceWidth,
        height: 120,
        backgroundColor: colors.primary,
        marginTop: 125,
        marginRight: -20,
        padding: 20,
        justifyContent: "space-between",
    },
    option: {
        paddingVertical: 5,
    },
    textOption: {
        color: colors.white,
        textTransform: "uppercase",
    },
    textActive: {
        fontWeight: "bold",
    }
})

export { colors, theme, text, nav };