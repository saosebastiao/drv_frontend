import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// Import the root reducer (which imports all subreducers)
import rootReducer from '../reducers';

// Initializing with middleware
const createStoreWithMiddleware = applyMiddleware(thunk);

const finalCreateStore = compose(createStoreWithMiddleware)(createStore);

// Create the store with an initial (empty) state
// In a complex application, we might rehydrate this state from AsyncStorage or etc

const store = finalCreateStore(rootReducer);

export default store;

