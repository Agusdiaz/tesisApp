
const setShopsData = (shops) => {
    return {
        type: 'SET_SHOPS',
        payload: {
            allShops: shops    
        },
    }
}

const updateShopFavourite = (cuit, favourite) => {
    return {
        type: 'UPDATE_FAVOURITE',
        payload: {
            cuit: cuit,
            favourite: favourite,
        },
    }
}

export default {
    setShopsData,
    updateShopFavourite,
}