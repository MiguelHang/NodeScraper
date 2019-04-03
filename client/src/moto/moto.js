import React,  { Component } from 'react'

import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import defaultImage from './../images/defaultImage.png'

class Moto extends Component {
  render() {
    return(
      <Card style={{margin: '15px', width:'245px'}}>
      <CardMedia>
        <img height="200" src={this.props.Info.img === 'none' ? defaultImage : this.props.Info.img  } alt="" />
      </CardMedia>
      <CardTitle title={this.props.Info.price} subtitle={this.props.Info.title} />
      <CardText>
        {`${this.props.Info.year} ${this.props.Info.km} ${this.props.Info.date}`}
      </CardText>
      <CardActions>
        <FlatButton href={this.props.Info.link} target="_blanck" label="Ver"/>
      </CardActions>
    </Card>
    )}
}

export default Moto

   