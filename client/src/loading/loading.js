import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const style = {
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center', 
}

const Loading = () => (
  <div style={style}>
    <CircularProgress size={80} thickness={5} />
  </div>
);

export default Loading
