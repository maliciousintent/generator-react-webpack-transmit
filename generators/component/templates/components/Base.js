// Component: <%= component.displayName %>

import React from 'react';
import { Router, Route, Link } from 'react-router'
<% if (componentUsesTransmit) { %>import Transmit from 'react-transmit';

// @TODO: import API config
// import { API_BASE_URL } from '../api';<% } %>

require('<%= style.webpackPath %>');


class <%= component.className %> extends React.Component {
  render() {
    <% if (componentUsesTransmit) { %>const { <%= transmitFragmentName %> } = this.props; <% } %>

    return (
      <div className="<%= style.className %>">
        Please edit <%= component.path %>/<%= component.fileName %> to update this component!
      </div>
    );
  }
}

<%= component.className %>.displayName = '<%= component.displayName %>';

// Uncomment properties you need
<% if (componentUsesTransmit) { %><%= component.className %>.propTypes = {
  <%= transmitFragmentName %>: React.PropTypes.Object,
};
<% } else { %>// <%= component.className %>.propTypes = {};<% } %>
// <%= component.className %>.defaultProps = {};

<% if (componentUsesTransmit) { %>
export default Transmit.createContainer(<%= component.className %>, {
  initialVariables: {
  },

  fragments: {
    <%= transmitFragmentName %>({ <%= transmitFragmentName %>Id }) {
      // @TODO: Fetch from API
      // return fetch(API_BASE_URL + '?id=' + <%= transmitFragmentName %>Id).then(body => { return body.json(); })
      // .then(<%= transmitFragmentName %> => <%= transmitFragmentName %>);
    },
  },
});<% } else { %>
export default <%= component.className %>;<% } %>
