import React from "react";
import { connect } from "./redux-lib";
import { incrementAction, decrementAction } from "./counterStore";
import "./Counter.css";

const Counter = ({ value, increase, decrease }) => (
    <div>
        <p>Value: {value}</p>
        <button onClick={increase}>Increment</button>
        <button onClick={decrease}>Decrement</button>
    </div>
);

const mapStateToProps = (state) => {
    return {
        value: state.counter
    };
};

const mapDispatchToProps = (dispatch) => ({
    increase: () => dispatch(incrementAction()),
    decrease: () => dispatch(decrementAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);