import React from 'react';
import { Map, GroundImage } from 'react-amap';
import tower from '../assets/tower.png';

const T = 0.012;
function randomBoundsAndCenter(center) {
  // 随机生成一个中心点，然后据此生成一个边界
  // 30.894930, 114.025867
  center = center || {
    longitude: 114 + Math.random() * T,
    latitude: 30 + Math.random() * T,
  }
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
  console.log(center, bounds)
  return { center, bounds };
}
class MapDemo extends React.Component{
  constructor(){
    super();
    this.events = {
      created: (i) => {console.log(i)},
      click: () => {console.log('img click')},
      dblclick: () => {console.log('img dblclick')},
    };
    const bc = randomBoundsAndCenter({
      // 30.894930, 114.025867
      longitude: 114.025867,
      latitude: 30.907930,
    })
    const bc1 = randomBoundsAndCenter({
      longitude: 114.0825867,
      latitude: 30.908930,
    })
    const bc2 = randomBoundsAndCenter({
      longitude: 114.1225867,
      latitude: 30.909930,
    })
    this.state = {
      src: tower,
      visible: true,
      opacity: 1,
      bounds: bc.bounds,
      bounds1: bc1.bounds,
      bounds2: bc2.bounds,
      mapCenter: bc1.center,
    };
  }
  render(){
    return <div>
      <div style={{width: '100%', height: '500px'}}>
        <Map plugins={['ToolBar']} center={this.state.mapCenter} zoom={12}>
          <GroundImage
            visible={this.state.visible}
            events={this.events}
            bounds={this.state.bounds1}
            src={this.state.src}
            opacity={this.state.opacity}
            clickable
          />
          <GroundImage
            visible={this.state.visible}
            events={this.events}
            bounds={this.state.bounds2}
            src={this.state.src}
            opacity={this.state.opacity}
            clickable
          />
          <GroundImage
            visible={this.state.visible}
            events={this.events}
            bounds={this.state.bounds}
            src={this.state.src}
            opacity={this.state.opacity}
            clickable
          />
        </Map>
      </div>
    </div>
  }
}

export default MapDemo;

//const Example = () => {
//  return (
//    <div>
//      Example
//    </div>
//  );
//};
//
//Example.propTypes = {
//};
//
//export default Example;
