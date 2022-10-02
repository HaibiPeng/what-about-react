// connect() 将一个React组件和一个Redux的store连接起来
import React, { Component } from "react";
import ReduxContext from './index';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        constructor(props) {
            super(props);
            this.state = props.store.getState(); // 获取当前 state 树
        }

        // 当组件加载完成后需要更新state
        componentDidMount() {
            this.updateComponent(); // 更新state
            this.props.store.subscribe(() => this.updateComponent()); // 添加监听器
        }

        updateComponent() {
            const { store } = this.props;
            let stateProps = mapStateToProps(store.getState()); // 作为基于 Redux 存储状态的连接组件的 props
            let dispatchProps = mapDispatchToProps(store.dispatch); // 一组作为props传递给连接组件的 action creator 函数
            // 每次store数据更新后重新渲染一下页面
            this.setState({ allProps: { ...stateProps, ...dispatchProps } });
        }

        render() {
            return (
                <WrappedComponent {...this.state.allProps} />
            );
        }
    }

    // 返回一个包装函数，这个包装函数将你的组件作为参数，并返回一个包装组件，同时将额外的props注入到这个组件中
    return (props) => (
        <ReduxContext.Consumer>
            {(store) => <Connect {...props} store={store} />}
        </ReduxContext.Consumer>
    );
};

export default connect;