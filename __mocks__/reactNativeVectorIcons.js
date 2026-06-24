const React = require('react');
const { Text } = require('react-native');

/**
 * Mimics @react-native-vector-icons/* exports with a simple text component.
 * Keeps icon-related imports test-safe in Jest's JS runtime.
 */
const MockIcon = ({ name, testID }) =>
  React.createElement(Text, { testID: testID ?? undefined }, name ?? 'icon');

module.exports = MockIcon;
module.exports.default = MockIcon;
module.exports.createIconSet = () => MockIcon;
module.exports.createIconSetFromIcoMoon = () => MockIcon;
module.exports.createMultiStyleIconSet = () => MockIcon;
