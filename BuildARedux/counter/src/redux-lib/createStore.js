const createStore = (reducer, initialState = {}) => {
    let state;
    let listeners = []; //listeners are an array of functions

    //getState is a function, get the state
    const getState = () => state;

    //subscribe is a function, add listeners to the store
    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            let index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(0, index);
            }
        }
    };

    //dispatch is a function, use reducer to get new state and notify each listener of the state change
    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach((listener) => listener(state));
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

export default createStore;