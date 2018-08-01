import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import Example from '../components/Example'
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;


function IndexPage({lines, lineIndex, dispatch}) {
  console.log(lines, lineIndex)
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['' + lineIndex]}
          onSelect={({item, key, seleckedKey}) => {
            dispatch({ type: 'example/save', payload: { lineIndex: parseInt(key) } })
            console.log(item, key, seleckedKey)
          }}>
          {lines.map((line, index) => {
            return <Menu.Item key={index}>
              <Icon type="line-chart" />
              <span className="nav-text">{line.name}</span>
            </Menu.Item>
          })}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Breadcrumb style={{ margin: '16px 24px' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{lines[lineIndex].name}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Example />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by lloydzhou@qq.com
        </Footer>
      </Layout>
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect(({example}) => {
  return example
})(IndexPage);

