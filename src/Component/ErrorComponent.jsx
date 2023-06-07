import React from 'react';
class ErrorComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            hasErr: false
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasErr: true
        }
    }
    render(){
        if(this.state.hasErr){
            return (<h2>Oops! Something Went Wrong</h2>)
        }
        return this.props.children
    };
}

export default ErrorComponent;

