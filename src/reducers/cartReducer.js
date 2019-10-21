import Item1 from "../assets/images/MM-0002.png";
import Item2 from "../assets/images/MM-0011.png";
import Item3 from "../assets/images/MM-0020.png";
import Item4 from "../assets/images/MM-0025.png";
import Item5 from "../assets/images/MM-0028.png";
import * as type from "../actions/types";

const initState = {
    items: [
        {
            id: 1,
            title: "Ubranie",
            desc: "Ubranie zrobione z najwyższej jakości materiału ",
            price: 110,
            img: Item1,
        },
        {
            id: 2,
            title: "Notes",
            desc:
                "Ładny notes na notatki, z wieloma stronami do zapisu notatek",
            price: 80,
            img: Item2,
        },
        {
            id: 3,
            title: "Scyzoryk",
            desc:
                "Scyzoryk z wieloma funkcjami, sprawdzi się w różnych sytuacjach",
            price: 120,
            img: Item3,
        },
        {
            id: 4,
            title: "Długopis",
            desc: "Ładny i dobrze piszący długopis, o długiej żywotności",
            price: 260,
            img: Item4,
        },
        {
            id: 5,
            title: "Parasol",
            desc:
                "Parasol o ładnej stylistyce, zrobiony z najwyższej jakości matreiałów",
            price: 160,
            img: Item5,
        },
    ],
    addedItems: [],
    total: 0,
    totalQuantity: 0,
    delivery: 0,
    payMethod: 0,
};
const cartReducer = (state = initState, action) => {
    if (action.type === type.ADD_TO_BASKET) {
        let addedItem = state.items.find(item => item.id === action.id);

        let existed_item = state.addedItems.find(item => action.id === item.id);
        if (existed_item) {
            addedItem.quantity += 1;
            return {
                ...state,
                total: state.total + addedItem.price,
                totalQuantity: (state.totalQuantity += 1),
            };
        } else {
            addedItem.quantity = 1;

            let newTotal = state.total + addedItem.price;

            return {
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total: newTotal,
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
                totalQuantity: (state.totalQuantity -= 1),
            };
        } else {
            addedItem.quantity -= 1;
            let newTotal = state.total - addedItem.price;
            return {
                ...state,
                total: newTotal,
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
    return state;
};

export default cartReducer;
