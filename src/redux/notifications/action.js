const updateBadgeClient = (action) => {
    return {
        type: 'UPDATE_BADGE_CLIENT',
        payload: {
            action: action,
        },
    }
}

const updateBadgeShop = (action) => {
    return {
        type: 'UPDATE_BADGE_SHOP',
        payload: {
            action: action,
        },
    }
}

export default {
    updateBadgeClient,
    updateBadgeShop,
}