import React, {Component} from 'react';
///import ScrDataContext from './ScrDataContext.jsx';

export default class Home extends Component{
    constructor(props){
		super(props);
		this.state = {
			data:this.props.data
		}
    }
    render(){
		return (<div className="abcd">
				{this.state.data}
			</div>)
	}
}