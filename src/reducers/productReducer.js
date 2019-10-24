import * as type from "../actions/types";
import productsData from "../db.json";

const initialState = {
    products: productsData,
};

const productReducer = function(state = initialState, action) {
    switch (action.type) {
        case type.GET_PRODUCT:
            const selectedProduct = state.products.find(
                item => item.id === action.id,
            );
            return Object.assign({}, state, { selectedProduct });
    }

    return state;
};

export default productReducer;
