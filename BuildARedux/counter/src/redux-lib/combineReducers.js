// The combineReducers helper function turns an object whose values are 
// different reducing functions into a single reducing function that can be passed to createStore
const combineReducers = (reducers) => {
    // the return value is also reducer, so it's a function that returns other function
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {}); // start reduce with an empty object
    };
};

export default combineReducers;