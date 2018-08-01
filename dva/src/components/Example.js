import React from 'react';
import { connect } from 'dva';
import { Map, GroundImage, Polyline, Marker } from 'react-amap';
import { Table } from 'antd';
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
    const { lines, lineIndex, events, dispatch } = this.props;
    const T = 0.0009;
    const index = Math.floor(lines[lineIndex].data.length / 2)
    const center = lines[lineIndex].data[index]
    const next = lines[lineIndex].data[index + 1]
    const position = {
      longitude: (center.longitude + next.longitude) / 2,
      latitude: (center.latitude + next.latitude) / 2 + T * 0.8,
    }
    return <div>
      <div style={{width: '100%', height: '500px'}}>
        <Map
          plugins={['ToolBar', 'MapType', 'Scale']}
          center={center}
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
            style={{
              borderWeight: 2,
              strokeColor: "yellow",
              lineJoin: "round",
            }}
          />
          <Marker
            position={position}
          />
        </Map>
      </div>
      <div>
        <Table
          columns={[{
            title: '塔杆',
            dataIndex: 'tower',
            key: 'tower',
          }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render(value) {
              return '雷击'
            }
          }, {
            title: '时间',
            dataIndex: 'created',
            key: 'created',
          }]}
          dataSource={events}
        />
      </div>
    </div>
  }
}

export default connect(({example}) => {
  return example
})(MapDemo);

