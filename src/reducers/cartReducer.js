import * as type from "../actions/types";
import productsData from "../db.json";

const initialState = {
    items: productsData,
    addedItems: [],
    total: 0,
    totalQuantity: 0,
    budget: 1000,
    checkedItems: new Map(),
};
const cartReducer = (state = initialState, action) => {
    if (action.type === type.ADD_TO_BASKET) {
        let addedItem = state.items.find(item => item.id === action.id);

        let existed_item = state.addedItems.find(item => action.id === item.id);
        if (existed_item) {
            addedItem.quantity += 1;
            return {
                ...state,
                total: state.total + addedItem.price,
                budget: state.budget - addedItem.price,
                totalQuantity: (state.totalQuantity += 1),
            };
        } else {
            addedItem.quantity = 1;

            let newTotal = state.total + addedItem.price;

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
                budget: state.budget - addedItem.price,
                totalQuantity: (state.totalQuantity += 1),
            };
        }
    }
    if (action.type === type.REMOVE_CART) {
        let itemToRemove = state.addedItems.find(item => action.id === item.id);
        let new_items = state.addedItems.filter(item => action.id !== item.id);

        let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;

        return {
            ...state,
            addedItems: new_items,
            total: newTotal,
            budget: state.budget + itemToRemove.price * itemToRemove.quantity,
            totalQuantity: state.totalQuantity - itemToRemove.quantity,
        };
    }

    if (action.type === type.ADD_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id);

        addedItem.quantity += 1;
        //state.totalQuantity += 1
        let newTotal = state.total + addedItem.price;
        return {
            ...state,
            total: newTotal,
            budget: state.budget - addedItem.price,
            totalQuantity: (state.totalQuantity += 1),
        };
    }
    if (action.type === type.SUBTRACT_QUANTITY) {
        let addedItem = state.items.find(item => item.id === action.id);

        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(
                item => item.id !== action.id,
            );
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                addedItems: new_items,
                total: newTotal,
                budget: state.budget + addedItem.price,
                totalQuantity: (state.totalQuantity -= 1),
            };
        } else {
            addedItem.quantity -= 1;
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                total: newTotal,
                budget: state.budget + addedItem.price,
                totalQuantity: (state.totalQuantity -= 1),
            };
        }
    }
    if (action.type === type.ADD_DELIVERY) {
        return {
            ...state,
            total: state.total + 20,
        };
    }
    if (action.type === type.ADD_PAY_METHOD) {
        return {
            ...state,
            total: state.total + 29,
        };
    }
    if (action.type === type.ADD_CHECK) {
        return {
            ...state,
            checkedItems: state.checkedItems.set(action.item),
        };
    }
    if (action.type === type.CLEAR_BASKET) {
        return {
            ...state,
            addedItems: [],
            totalQuantity: 0,
            total: 0,
            budget: 1000,
        };
    }
    return state;
};

export default cartReducer;
