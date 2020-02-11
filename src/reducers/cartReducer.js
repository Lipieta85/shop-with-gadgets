import * as type from "../actions/types";
//import productsData from "../db.json";
import { mapKeys } from "lodash";

const initialState = {
    items: [],
    addedItems: [],
    total: "0.00",
    totalQuantity: 0,
    budget: "",
    basket: null,
    orderInputState: "",
    orderSelectInputValue: "",
    error: "",
    pagination: {},
    productsToOrder: [],
    productsCategory: "1",
    availableProductsCategory: [],
    addConfirmProductModalState: false,
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case type.ADD_IF_ITEM_EXIST:
            let addedItem = state.items.find(
                item => item.product.id === action.id,
            );

            let existed_item = state.addedItems.find(
                item => action.id === item.product.id,
            );
            let addedValue = Object.values(action.productQuantity);
            let addedValueNum = Number(addedValue[0]);

            existed_item.quantity += addedValueNum;

            existed_item.itemTotalPrice = (
                existed_item.quantity * Number(addedItem.price.price)
            ).toFixed(2);

            state.total = Number(state.total);

            return {
                ...state,
                items: state.items.map(item =>
                    item.product.id === action.id
                        ? {
                              ...item,
                              availability: item.availability - addedValueNum,
                          }
                        : item,
                ),
                total: (
                    state.total +
                    Number(existed_item.price.price) * addedValueNum
                ).toFixed(2),

                budget: (
                    Number(state.budget) -
                    Number(existed_item.price.price) * addedValueNum
                ).toFixed(2),
                totalQuantity: (state.totalQuantity += addedValueNum),
                addConfirmProductModalState: true,
            };

        case type.ADD_IF_ITEM_EMPTY:
            let addedItem2 = state.items.find(
                item => item.product.id === action.id,
            );
            let addedValue2 = Object.values(action.productQuantity);
            let addedValueNum2 = Number(addedValue2[0]);

            addedItem2.quantity = addedValueNum2;
            let itemTotalPrice = (
                Number(addedItem2.price.price) * addedItem2.quantity
            ).toFixed(2);
            addedItem2 = { ...addedItem2, itemTotalPrice: itemTotalPrice };

            let newTotal = (
                Number(state.total) +
                Number(addedItem2.price.price) * addedValueNum2
            ).toFixed(2);

            addedItem2.availableProduct -= addedValueNum2;

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem2],
                items: state.items.map(item =>
                    item.product.id === action.id
                        ? {
                              ...item,

                              availability: item.availability - addedValueNum2,
                          }
                        : item,
                ),
                total: newTotal,
                budget: (
                    Number(state.budget) -
                    Number(addedItem2.price.price) * addedValueNum2
                ).toFixed(2),
                totalQuantity: (state.totalQuantity += addedValueNum2),
                addConfirmProductModalState: true,
            };

        case type.DELETE_ITEM:
            let itemToRemove = state.addedItems.find(
                item => action.id === item.product.id,
            );
            let new_items = state.addedItems.filter(
                item => action.id !== item.product.id,
            );

            let newTotal2 = (
                Number(state.total) -
                Number(itemToRemove.price.price) * itemToRemove.quantity
            ).toFixed(2);
            return {
                ...state,
                addedItems: new_items,
                items: state.items.map(item =>
                    item.product.id === action.id
                        ? {
                              ...item,

                              availability:
                                  item.availability + itemToRemove.quantity,
                          }
                        : item,
                ),
                total: newTotal2,
                budget: (
                    Number(state.budget) +
                    Number(itemToRemove.price.price) * itemToRemove.quantity
                ).toFixed(2),
                totalQuantity: state.totalQuantity - itemToRemove.quantity,
            };

        // case ADD_CHECK:
        //     state.checkedItems.clear();
        //     return {
        //         ...state,
        //         checkedItems: state.checkedItems.set(
        //             action.item,
        //             action.isChecked,
        //         ),
        //     };

        case type.CLEAR_BASKET:
            return {
                ...state,
                addedItems: [],
                totalQuantity: 0,
                total: "0.00",
                basket: null,
                productsToOrder: [],
            };

        case type.ORDER_INPUT_STATE:
            return {
                ...state,
                orderInputState: (state.orderInputState = action.value),
            };

        case type.ORDER_SELECT_INPUT_VALUE:
            return {
                ...state,
                orderSelectInputValue: (state.orderSelectInputValue =
                    action.value),
                productsToOrder: [],
            };

        case type.CHANGE_BASKET_AMOUNTS:
            let addedItem3 = state.addedItems.find(
                item => item.product.id === action.productId,
            );

            let oldAddedItemQuantity = Number(addedItem3.quantity);
            let addedValue3 = Object.values(action.changedProductAmount);
            let addedValueNum3 = Number(addedValue3[0]);

            let oldItemTotal =
                Number(addedItem3.price.price) * oldAddedItemQuantity;
            oldItemTotal.toFixed(2);
            let newItemTotal = Number(addedItem3.price.price) * addedValueNum3;
            newItemTotal.toFixed(2);
            addedItem3.quantity = addedValueNum3;
            //addedItem.totalPrice = addedItem.quantity * addedItem.price;
            addedItem3.itemTotalPrice =
                Number(addedItem3.price.price) * addedItem3.quantity;

            addedItem3.itemTotalPrice = Number(
                addedItem3.itemTotalPrice,
            ).toFixed(2);

            return {
                ...state,
                addedItems: [...state.addedItems],
                total: ((state.total -= oldItemTotal) + newItemTotal).toFixed(
                    2,
                ),
                items: state.items.map(item =>
                    item.product.id === action.productId
                        ? {
                              ...item,

                              availability:
                                  (item.availability += oldAddedItemQuantity) -
                                  addedValueNum3,
                          }
                        : item,
                ),
                budget: (
                    Number(state.budget) +
                    oldItemTotal -
                    newItemTotal
                ).toFixed(2),

                totalQuantity:
                    (state.totalQuantity -= oldAddedItemQuantity) +
                    addedValueNum3,
                addConfirmProductModalState: true,
            };
        case type.SET_PRODUCTS:
            let data = Object.values(action.products);

            const arr = [];
            mapKeys(data[0], function(value, key) {
                return arr.push(value);
            });
            const products = arr;
            products.pop();
            const pagination = data[0].pagination;

            return {
                ...state,
                items: products,
                error: false,
                pagination: pagination,
            };
        case type.SET_TYPED_PRODUCTS:
            let data2 = Object.values(action.typedProducts);

            const arr2 = [];
            mapKeys(data2[0], function(value, key) {
                return arr2.push(value);
            });
            const products2 = arr2;

            const pagination2 = {
                page: 1,
                totalPages: Math.floor(data2[0].length / 12),
                itemsPerPage: 12,
                totalItems: data2[0].length,
            };

            return {
                ...state,
                items: products2,
                error: false,
                pagination: pagination2,
            };
        case type.FETCH_PRODUCTS_FAILED:
            return {
                ...state,
                error: true,
            };
        case type.ADD_BASKET_ID:
            return {
                ...state,
                basket: action.id,
            };
        case type.PRODUCTS_TO_ORDER:
            return {
                ...state,
                productsToOrder: [...state.productsToOrder, action.products],
            };
        case type.SET_PRODUCT_CATEGORY:
            return {
                ...state,
                productsCategory: action.number,
            };
        case type.SET_PRODUCTS_CATEGORIES: {
            return {
                ...state,
                availableProductsCategory: Object.values(action.categories),
            };
        }
        case type.SET_BUDGET: {
            return {
                ...state,
                budget: String(action.data),
            };
        }
        case type.CLEAR_STATE: {
            return {
                ...state,
                addedItems: [],
                total: "0.00",
                totalQuantity: 0,
                basket: null,
                orderInputState: "",
                orderSelectInputValue: "",
                error: "",
                productsToOrder: [],
                productsCategory: "1",
            };
        }
        case type.ADD_PRODUCT_CONFIRMATION_PRODUCT_STATE: {
            return {
                ...state,
                addConfirmProductModalState: false,
            };
        }
        default:
            return state;
    }
};

export default cartReducer;
