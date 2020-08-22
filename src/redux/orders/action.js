import configureStore from '../../store/configureStore'

const setProductOrder = (product) => {
    return {
        type: 'SET_PRODUCT',
        payload: {
            product: product
        },
    }
}

const setSelectedProduct = (product) => {
    return {
        type: 'SET_SELECTED_PRODUCT',
        payload: {
            selectedProduct: product,
        },
    }
}

const updateProductAmount = (product, amount) => {
    return {
        type: 'UPDATE_PRODUCT_AMOUNT',
        payload: {
            product: product,
            amount: amount,
        },
    }
}

const removeProduct = (index) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: {
            index: index,
        },
    }
}

const setPromoOrder = (promo) => {
    return {
        type: 'SET_PROMO',
        payload: {
            promo: promo,
        },
    }
}

const updatePromoAmount = (promo, amount) => {
    return {
        type: 'UPDATE_PROMO_AMOUNT',
        payload: {
            promo: promo,
            amount: amount,
        },
    }
}

const removePromo = (index) => {
    return {
        type: 'REMOVE_PROMO',
        payload: {
            index: index,
        },
    }
}

const setSelectedPromo = (promo) => {
    return {
        type: 'SET_SELECTED_PROMO',
        payload: {
            selectedPromo: promo
        },
    }
}

const updateTotal = (total) => {
    return {
        type: 'UPDATE_TOTAL',
        payload: {
            total: total,
        },
    }
}

const updateTakeAway = (takeAway) => {
    return {
        type: 'UPDATE_TAKEAWAY',
        payload: {
            takeAway: takeAway,
        },
    }
}

const updateTips = (tips) => {
    return {
        type: 'UPDATE_TIPS',
        payload: {
            tips: tips,
        },
    }
}

const setComents = (coment) => {
    return {
        type: 'SET_COMENTS',
        payload: {
            coment: coment
        },
    }
}

const setCuitAndMail = (mail, cuit) => {
    return {
        type: 'SET_CUITMAIL',
        payload: {
            mail: mail,
            cuit: cuit,
        },
    }
}

const removeDisabledProduct = (id) => {
    return {
        type: 'REMOVE_DISABLED_PRODUCT',
        payload: {
            id: id,
        },
    }
}

const removeDisabledIngredient = (id) => {
    return {
        type: 'REMOVE_DISABLED_INGREDIENT',
        payload: {
            id: id,
        },
    }
}

const removeDisabledPromo = (id) => {
    return {
        type: 'REMOVE_DISABLED_PROMO',
        payload: {
            id: id,
        },
    }
}

const deleteOrder = () => configureStore.dispatch({ type: 'DELETE_ORDER' })

export default {
    setProductOrder,
    updateProductAmount,
    removeProduct,
    setSelectedProduct,
    setSelectedPromo,
    updatePromoAmount,
    removePromo,
    setPromoOrder,
    updateTotal,
    updateTakeAway,
    updateTips,
    deleteOrder,
    setComents,
    setCuitAndMail,
    removeDisabledProduct,
    removeDisabledIngredient,
    removeDisabledPromo,
}