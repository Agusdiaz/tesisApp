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
            selectedProduct: product
        },
    }
}

const updateProductAmount = (id, amount) => {
    return {
        type: 'UPDATE_PRODUCT_AMOUNT',
        payload: {
            id: id,
            amount: amount,
        },
    }
}

const removeProduct = (product) => {
    return {
        type: 'REMOVE_PRODUCT',
        payload: {
            product: product,
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

const deleteOrder = () => configureStore.dispatch({ type: 'DELETE_ORDER' })

export default {
    setProductOrder,
    setPromoOrder,
    updateProductAmount,
    setSelectedProduct,
    removeProduct,
    updateTotal,
    updateTakeAway,
    updateTips,
    deleteOrder,
}