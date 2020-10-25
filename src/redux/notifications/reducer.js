import { colors } from '../../../src/index.styles'

const initialState = {
    badgeClient: null,
    badgeShop: null,
    routesClient: [
        { key: 'home', title: 'Principal', icon: 'food', color: colors.APP_BACKGR },
        { key: 'shops', title: 'Buscar', icon: 'magnify', color: colors.APP_BACKGR },
        { key: 'notifications', title: 'Notificaciones', icon: 'bell-ring-outline', badge: null, color: colors.APP_BACKGR },
        { key: 'profile', title: 'Perfil', icon: 'face', color: colors.APP_BACKGR },
    ],
    routesShop: [
        { key: 'orders', title: 'Pedidos', icon: 'receipt', badge: null, color: colors.APP_BACKGR },
        { key: 'menu', title: 'Menú', icon: 'food-fork-drink', color: colors.APP_BACKGR },
        { key: 'disabledProducts', title: 'Deshabilitados', icon: 'close-outline', color: colors.APP_BACKGR },
        { key: 'profile', title: 'Perfil', icon: 'chef-hat', color: colors.APP_BACKGR },
    ],
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case 'UPDATE_BADGE_CLIENT':
            var value
            if (state.badgeClient === null && payload.action === 1)
                value = 1
            else if (payload.action === 1)
                value = state.badgeClient + 1
            else value = null
            return { ...state, badgeClient: value, routes: { ...state.routesClient, ...state.routesClient[2].badge = value } }
        case 'UPDATE_BADGE_SHOP':
            var value
            if (state.badgeShop === null && payload.action === 1)
                value = 1
            else if (payload.action === 1)
                value = state.badgeShop + 1
            else value = null
            return { ...state, badgeShop: value, routes: { ...state.routesShop, ...state.routesShop[0].badge = value } }
        default:
            return state
    }
}