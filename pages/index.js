import React, { Component } from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { StyleSheet, Text, View, Animated, ScrollView } from 'react-native';

const headerBg = '#282f3f';
const activeBg = '#384153';
const normalBg = '#434e64';
const activeText = '#ffffff';
const normalText = '#222222';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  tabStyle: {
    opacity: 1,
    padding: 0,
    width: 'auto',
    marginRight: 2,
    backgroundColor: headerBg,
  },
  tabBar: {
    width: '100%',
    padding: 10,
    paddingBottom: 0,
    backgroundColor: headerBg,
  },
  tabView: {
    height: '100%',
  },
  label: {
    lineHeight: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: 'none',
  },
  content: {
    padding: 10,
    height: '100%',
    backgroundColor: 'lightgray',
  },
});

const FirstRoute = () => (
  <View style={styles.content}>
    <Text>Test 1</Text>
  </View>
);
const SecondRoute = () => (
  <View
    style={[
      styles.content,
      {
        backgroundColor: 'gray',
      },
    ]}
  >
    <Text>Test 2</Text>
  </View>
);

class TabViewExample extends Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Test 1' },
      { key: 'second', title: 'Test 2' },
    ],
  };
  _renderLabel(scene) {
    const { position, navigationState, getLabelText } = this;
    const { routes } = navigationState;
    const { route } = scene;

    const label = getLabelText(scene);
    const inputRange = routes.map((x, i) => i);

    const backgroundColor = position.interpolate({
      inputRange,
      outputRange: routes.map(r => (r === route ? activeBg : normalBg)),
      extrapolate: 'clamp',
    });
    const color = position.interpolate({
      inputRange,
      outputRange: routes.map(r => (r === route ? activeText : normalText)),
      extrapolate: 'clamp',
    });

    return (
      <Animated.Text
        numberOfLines={1}
        style={[
          styles.label,
          {
            backgroundColor,
            color,
          },
        ]}
      >
        {label}
      </Animated.Text>
    );
  }
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        style={styles.tabView}
        renderTabBar={props => (
          <TabBar
            {...props}
            getLabelText={({ route: { title } }) => title}
            indicatorStyle={styles.indicator}
            renderLabel={this._renderLabel}
            tabStyle={styles.tabStyle}
            style={styles.tabBar}
          />
        )}
        onIndexChange={index => this.setState({ index })}
      />
    );
  }
}

export default props => (
  <View style={styles.container}>
    <TabViewExample />
  </View>
);
