import React, { Component } from 'react'
import {Scatter} from 'react-chartjs-2';

export class Graph extends Component {
    
    render() {
        return (
            <div>
                <h2>Elevation Profile</h2>
                <Scatter data={this.props.data} />
            </div>
        )
    }
}

export default Graph
