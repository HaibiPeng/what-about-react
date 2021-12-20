import createStore from "./createStore";
import combineReducers from "./combineReducers";
import connect from "./connect";
import Provider from "./provider";

import React from "react";

const ReduxContext = React.createContext("redux");

export default ReduxContext;
export { createStore, combineReducers, connect, Provider };