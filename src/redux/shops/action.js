
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

const setSelected = (selected) => {
    return {
        type: 'SET_SELECTED',
        payload: {
            selected: selected,
        },
    }
}

export default {
    setShopsData,
    updateShopFavourite,
    setSelected,
}