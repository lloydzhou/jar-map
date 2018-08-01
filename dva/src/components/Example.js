import React from 'react';
import { connect } from 'dva';
import { Map, GroundImage, Polyline } from 'react-amap';
import tower from '../assets/tower.png';

class MapDemo extends React.Component{
  constructor(){
    super();
    this.events = {
      created: (i) => {console.log(i)},
      click: () => {console.log('img click')},
      dblclick: () => {console.log('img dblclick')},
    };
    this.state = {
      src: tower,
      visible: true,
      opacity: 1,
    };
  }
  render(){
    const { lines, lineIndex, dispatch } = this.props;
    const T = 0.0009;
    return <div>
      <div style={{width: '100%', height: '500px'}}>
        <Map
          plugins={['ToolBar', 'MapType', 'Scale']}
          center={lines[lineIndex].data[Math.floor(lines[lineIndex].data.length / 2)]}
          zoom={16}
        >
          {lines[lineIndex].data.map(center => {
            const bounds = {
              sw: {
                longitude: center.longitude - T,
                latitude: center.latitude - T,
              },
              ne: {
                longitude: center.longitude + T,
                latitude: center.latitude + T,
              }
            };
            console.log('bounds', bounds, center)
            return (
              <GroundImage
                key={center.no}
                visible={this.state.visible}
                events={this.events}
                opacity={this.state.opacity}
                bounds={bounds}
                src={tower}
                clickable
              />
            )
          })}
          <Polyline 
            path={lines[lineIndex].data.map(t => {
              return {
                longitude: t.longitude,
                latitude: t.latitude + T * 0.8,
              }
            })}
          />
        </Map>
      </div>
    </div>
  }
}

export default connect(({example}) => {
  return example
})(MapDemo);

