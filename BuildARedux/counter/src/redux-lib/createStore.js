const createStore = (reducer, initialState = {}) => {
    let state;
    let listeners = []; // listeners 是一组函数的集合（数组）

    //getState 返回应用当前的 state 树。 它与 store 的最后一个 reducer 返回值相同。
    const getState = () => state;

    //subscribe 是一个向store中添加监听器的函数，返回一个可以解绑变化监听器的函数。
    const subscribe = (listener) => {
        // 添加监听器
        listeners.push(listener);
        // 返回一个可以解绑变化监听器的函数
        return () => {
            let index = listeners.indexOf(listener);
            if (index >= 0) {
                // 解绑变化监听器
                listeners.splice(0, index);
            }
        }
    };

    // dispatch 函数使用reducer来获取新的state并通知每个监听器state发生了变化
    // 将使用当前 getState() 的结果(上面d的state)和传入的 action 以同步方式的调用 store 的 reducer 函数。这个 reducer 的返回值会被作为下一个 state。
    // 从现在开始，这个 state 就成为了 getState() 的返回值，同时每个变化监听器(change listener)会被触发。
    const dispatch = (action) => {
        state = reducer(state, action); // 新的state
        listeners.forEach((listener) => listener(state)); // 并通知每个监听器state发生了变化
    };

    // 分发初始state
    dispatch({initialState});

    return { getState, dispatch, subscribe };
};

export default createStore;