import {createSlice} from '@reduxjs/toolkit'
import { edit_item_with_index } from '../../utils/GeneralFunctions'
/**************************************** Redux Toolkit Functions *************************************/

const initialState = {
    cartItems: [],
    totalPrice: 0,
    totalDiscount: 0,
    totalCount: 0,
    minOrderPrice: 100000,
    isSaveOrder: false,
    finalOrder : {},
    showTotalBox : true
}

const orderSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        /**** add product or increment product count in user cart ****/
        addToCart: (state, action) => {
            pushToCart(state, action)
            priceHandler(state)
        },
        removeFromCart: (state, action) => {
            if (action.payload.type === 'decrement_cart') {
                removeItemOfOrder(action.payload.index, state)
            } else {
                let index = state.cartItems.findIndex(elem => elem.id === action.payload.id)
                removeItemOfOrder(index, state)
            }

            priceHandler(state)
        },


        /*** allow to user for go to payment page ***/
        changeSaveOrderStatus: (state, action) => {
            state.isSaveOrder = action.payload
        },

        // order again
        orderAgainAddToCart: (state, action) => {
            state.cartItems = [...action.payload]
            priceHandler(state)
        },

        finalOrderHandler: (state,action) => {
            state.finalOrder = {
                ...state.finalOrder,
                ...action.payload
            }
        },

        removeOrderAfterSubmit: (state) => {
            state.cartItems = []
            state.totalPrice = 0
            state.totalDiscount = 0
            state.totalCount = 0
            state.isSaveOrder = false
            state.finalOrder  = {}
        },

        changeShowTotalBox: (state, action) => {

            state.showTotalBox = action.payload

        },

    }
})


/**************************************** Middleware functions *************************************/

const removeItemOfOrder = (index,state) => {
    let order = state.cartItems[index]
    let count = order?.count
    if (count - 1 > 0) {
        state.cartItems[index] = { ...order, count: count - 1 }
    } else {
        state.cartItems.splice(index, 1)
    }
}

const pushToCart = (state, action) => {
    let cartItemList = state.cartItems

    const orders = cartItemList.filter(
        item => item.id === action.payload.id
    )

    if (orders?.length > 0) {
        if (action?.payload?.additional?.length > 0) {
            let payloadAdditional = action?.payload?.additional

            let index = cartItemList.findIndex(elem => JSON.stringify(elem.additional) === JSON.stringify(payloadAdditional))
            let orderWithSameAdditional = cartItemList[index]

            if (orderWithSameAdditional) {
                cartItemList[index] = { ...action?.payload, count: orderWithSameAdditional.count + 1 }
            } else {
                cartItemList.unshift({ ...action?.payload, count: 1 })
            }

        } else {
            
            let orderWithoutAddons = orders.find(elem => (elem.additional?.length === 0 || elem.additional === undefined))
            if(orderWithoutAddons){
                let orderIndex = null
                cartItemList.map((info , index) => {
                    if(JSON.stringify(info) === JSON.stringify(orderWithoutAddons)){
                        orderIndex = index
                    }
                })
                cartItemList = edit_item_with_index(cartItemList,{...orderWithoutAddons, count : orderWithoutAddons?.count + 1}, orderIndex )
            }else{
                cartItemList.unshift({ ...action?.payload, count: 1 })
            }
        }
    } else {
        cartItemList.unshift({ ...action?.payload, count: 1 })
    }

    state.cartItems = cartItemList
}

const priceHandler = (state) => {
    let price = 0, count = 0, totalDiscount = 0;

    state.cartItems?.forEach(item => {
        //
        //     // totalDiscount :
        totalDiscount += parseFloat((item?.price / 100) * parseFloat(item?.marketings?.discount ? item?.marketings?.discount : item?.discount) * item.count)
        //
        //     // additional items :
        if (item?.additional?.length > 0) {
            let additionalPrice = 0
            item?.additional.forEach(elem => {
                additionalPrice += parseFloat(elem?.price * elem?.count)
            })
            price += parseFloat(additionalPrice * item?.count)
        }
        price += parseFloat(item?.price * item?.count)
        //
        count += item?.count
    })

    state.totalCount = count
    state.totalPrice = price
    state.totalDiscount = totalDiscount
    if (price > state.minOrderPrice) {
        state.isSaveOrder = true
    } else {
        state.isSaveOrder = false
    }
}


/**************************************** EXPORT *************************************/
export default orderSlice.reducer
export const {
    addToCart,
    removeFromCart,
    changeSaveOrderStatus,
    orderAgainAddToCart,
    finalOrderHandler,
    removeOrderAfterSubmit,
    changeShowTotalBox
} = orderSlice.actions
