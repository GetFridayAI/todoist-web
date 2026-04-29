const React = require('react');
const { Text } = require('react-native');

/**
 * Renders the icon name as text so tests can query icons
 * by their Ionicons name string (e.g. getByText('chevron-down-outline')).
 */
const Ionicons = ({ name, testID }) =>
  React.createElement(Text, { testID: testID ?? undefined }, name);

module.exports = { Ionicons };
