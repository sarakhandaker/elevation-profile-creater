import React, { Component } from 'react'

export class Form extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             first:"",
             second:''
        }
    }

    handleOnChange=(event)=>{
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.handleSubmit(this.state.first, this.state.second)
    }

    render() {
        
        return (
                <form onSubmit={this.handleSubmit}>
                    <label>First Address:</label><br/>
                    <input onChange= {this.handleOnChange} name="first"/><br/>
                    <label>Second Address:</label><br/>
                    <input onChange= {this.handleOnChange} name="second"/><br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
        )
    }
}

export default Form
