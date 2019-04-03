import React, { Component } from 'react'

import { Container } from './styles'
import Moto from './../moto/moto'
import motosServices from './motosContainer.services'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Loading from './../loading/loading'

const style = {
  margin: 12,
};

class motosContainer extends Component {

  constructor() {
    super()
    this.state = {
      motos: [],
      model: '',
      location: '',
      brand:'',
      loading: false
      
    }
  }
  

  handleModelChange = event => {
    this.setState({
      model: event.target.value
    });
  }

  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  }

  handleBrandChange = event => {
    this.setState({
      brand: event.target.value
    });
  }
  
  search = () => {
    this.setState({motos:[]})
    this.setState({loading: true})
    motosServices.getMotos({ model: this.state.model, location: this.state.location, brand: this.state.brand }).then(response => {
      this.setState({ motos: response.data.results })
      this.setState({loading: false})
    })
  }

  render() {
    return(
      <div>
        <TextField hintText="Model" floatingLabelText="Model" style={style} value={this.state.model} onChange={this.handleModelChange}/>
        <TextField hintText="Location" floatingLabelText="Location" style={style} value={this.state.location} onChange={this.handleLocationChange}/>
        <TextField hintText="Brand" floatingLabelText="Brand" style={style} value={this.state.brand} onChange={this.handleBrandChange}/>
        <RaisedButton label="Buscar" primary={true} style={style} onClick={this.search}/>
      <Container>
        { this.state.loading ?
          <Loading/>
           : false }
        {this.state.motos.map((item, index) => (
          item.ads.map( (moto, index) => {
            return (<Moto
              key={index}
              Info={moto}
          />)
          })
        ))}
      </Container>
      </div>
    )
  }
}

export default motosContainer