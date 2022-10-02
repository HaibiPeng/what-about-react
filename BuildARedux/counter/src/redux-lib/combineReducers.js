// combineReducers函数将一个含有不同reducers的对象转化为一个单独的reducer，这个合成的reducer将作为参数传递给createStore函数
const combineReducers = (reducers) => {
    // 函数返回值也是一个reducer，所以它也是一个返回函数的函数
    return (state = {}, action) => {
        return Object.keys(reducers).reduce((nextState, key) => {
            nextState[key] = reducers[key](state[key], action);
            return nextState;
        }, {}); // reduce方法，从一个空对象开始reduce
    };
};

export default combineReducers;