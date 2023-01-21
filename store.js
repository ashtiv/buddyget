import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

// Reducer for the current login user
const loginUserReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.user;
        case 'LOGOUT':
            return null;
        default:
            return state;
    }
};

// Combine all reducers
const rootReducer = combineReducers({
    loginUser: loginUserReducer,
});

// Create the store
const store = createStore(rootReducer);

// Make the store available to the app
export const ReduxProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
);
