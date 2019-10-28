import * as type from "../actions/types";
import productsData from "../db.json";

const initialState = {
    items: productsData,
    addedItems: [],
    total: 0,
    totalQuantity: 0,
    budget: 10000,
    checkedItems: new Map(),
    orderInputState: "",
    orderSelectInputValue: "Wrocław ul. Sadowa",
};
const cartReducer = (state = initialState, action) => {
    if (action.type === type.ADD_TO_BASKET) {
        let addedItem = state.items.find(item => item.id === action.id);

        let existed_item = state.addedItems.find(item => action.id === item.id);

        let addedValue = Object.values(action.productQuantity);
        let addedValueNum = Number(addedValue[0]);
        if (existed_item) {
            return {
                ...state,
                addedItem: (addedItem.quantity += addedValueNum),
                total: state.total + addedItem.price * addedValueNum,
                budget: state.budget - addedItem.price * addedValueNum,
                totalQuantity: (state.totalQuantity += addedValueNum),
            };
        } else {
            let newTotal = state.total + addedItem.price * addedValueNum;
            return {
                ...state,
                addedItem: (addedItem.quantity = addedValueNum),
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
                budget: state.budget - addedItem.price * addedValueNum,
                totalQuantity: (state.totalQuantity += addedValueNum),
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
        console.log(addedItem.quantity);
        //state.totalQuantity += 1
        let newTotal = state.total + addedItem.price;
        return {
            ...state,
            addedItem: (addedItem.quantity += 1),
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
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                addedItem: (addedItem.quantity -= 1),
                total: newTotal,
                budget: state.budget + addedItem.price,
                totalQuantity: (state.totalQuantity -= 1),
            };
        }
    }
    // if (action.type === type.ADD_CHECK) {
    //     state.checkedItems.clear();
    //     return {
    //         ...state,
    //         checkedItems: state.checkedItems.set(action.item, action.isChecked),
    //     };
    // }
    if (action.type === type.CLEAR_BASKET) {
        return {
            ...state,
            addedItems: [],
            totalQuantity: 0,
            total: 0,
            budget: 10000,
        };
    }
    if (action.type === type.ORDER_INPUT_STATE) {
        return {
            ...state,
            orderInputState: (state.orderInputState = action.value),
        };
    }
    if (action.type === type.ORDER_SELECT_INPUT_VALUE) {
        return {
            ...state,
            orderSelectInputValue: (state.orderSelectInputValue = action.value),
        };
    }
    if (action.type === type.CHANGE_BASKET_AMOUNTS) {
        let addedItem = state.items.find(item => item.id === action.productId);

        let oldAddedItemQuantity = Number(addedItem.quantity);
        let addedValue = Object.values(action.newProductAmount);
        let addedValueNum = Number(addedValue[0]);

        let oldItemTotal = addedItem.price * oldAddedItemQuantity;
        let newItemTotal = addedItem.price * addedValueNum;
        return {
            ...state,
            addedItem: (addedItem.quantity = addedValueNum),
            total: (state.total -= oldItemTotal) + newItemTotal,
            budget: (state.budget += oldItemTotal) - newItemTotal,
            totalQuantity:
                (state.totalQuantity -= oldAddedItemQuantity) + addedValueNum,
        };
    }
    return state;
};

export default cartReducer;
