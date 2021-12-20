// The connect() function connects a React component to a Redux store
import React, { Component } from "react";
import ReduxContext from './index';

const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    class Connect extends Component {
        constructor(props) {
            super(props);
            console.log(props.store)
            this.state = props.store.getState();
        }

        componentDidMount() {
            // this.props.store.subscribe((state) => {
            //     this.setState(state);
            // });
            this.updateComponent();
            this.props.store.subscribe(() => this.updateComponent());
        }

        updateComponent() {
            const { store } = this.props;
            let stateProps = mapStateToProps(store.getState());
            let dispatchProps = mapDispatchToProps(store.dispatch);
            // 每次store数据更新后重新渲染一下页面
            this.setState({ allProps: { ...stateProps, ...dispatchProps } });
        }

        render() {
            // const { store } = this.props;
            return (
                // <WrappedComponent
                //     {...this.props}
                //     {...mapStateToProps(store.getState())}
                //     {...mapDispatchToProps(store.dispatch)}
                // />  
                <WrappedComponent {...this.state.allProps} />
            );
        }
    }

    return (props) => (
        <ReduxContext.Consumer>
            {(store) => <Connect {...props} store={store} />}
        </ReduxContext.Consumer>
    );
};

export default connect;