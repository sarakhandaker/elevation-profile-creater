import './App.css';
import Form from './components/Form'
import React, { Component } from 'react'
import Graph from './components/Graph';
import ShowMap from './components/ShowMap'

const key = "bQF7yo9TJZCUX74Rrpx3pIJ1ls2ymIvA"
const URL = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=`
const URL2 = `http://open.mapquestapi.com/elevation/v1/profile?key=${key}&shapeFormat=raw&latLngCollection=`

export class App extends Component {
  constructor() {
    super()
    this.state = {
      address1: "",
      address2: "",
      data: {
        labels: ['Scatter'],
        datasets: ""
      }
    }
  }

  handleSubmit = (first, second) => {
    fetch(URL + first).then(resp => resp.json()).then(resp => {
      this.setState({ address1: resp.results[0].locations[0].latLng })
      fetch(URL + second).then(resp => resp.json()).then(resp => {
        this.setState({ address2: resp.results[0].locations[0].latLng })
        this.Coord()
      })
    })
  }

  Coord = () => {
    const lat1 = this.state.address1.lat
    const lat2 = this.state.address2.lat
    const lng1 = this.state.address1.lng
    const lng2 = this.state.address2.lng

    const m = (lng2 - lng1) / (lat2 - lat1)
    const b = lng1 - m * lat1
    const inc = (lat2 - lat1) / 100
    const Array = []
    for (let i = 0; i < 100; i++) {
      Array.push(lat1 + i * inc)
      Array.push(m * (lat1 + i * inc) + b)
    }

    fetch(URL2 + Array.join(",")).then(resp => resp.json()).then(resp => {
      let array = []
      resp.elevationProfile.forEach(element => {
        array.push({ x: element.distance, y: element.height })
      })
      this.setState({
        data: {
          labels: ['Scatter'],
          datasets: [
            {label: "",
              backgroundColor: 'rgba(75,192,192,0.4)',
              showLine: true,
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointRadius: 1,
              pointHitRadius: 10,
              data: array
            }
          ]
        }
      })
    })
  }

  render() {
    const {data, address1, address2}=this.state
    return (
      <div className="App">
        {address1?<Graph data={data} />:null }
        <Form handleSubmit={this.handleSubmit} />
        {address1?<ShowMap lat={address1.lat} lng={address1.lng} lat2={address2.lat} lng2={address2.lng} />:null }
      </div>
    )
  }
}

export default App
