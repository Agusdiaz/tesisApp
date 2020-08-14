const setProductOrder = (product) => {
    return {
        type: 'SET_PRODUCT',
        payload: {
            product: product    
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

export default {
    setProductOrder,
    setPromoOrder,
}