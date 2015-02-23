var React = require('react');

var SearchField = React.createClass({displayName: "SearchField",

  onChange:function(e) {
    this.props.onChange(e.target.value);
  },

  render:function() {
    return (
      React.createElement("div", null, 
        React.createElement("input", {
          type: "search", 
          value: this.props.value, 
          placeholder: this.props.label, 
          onChange: this.onChange}
        )
      )
    );
  }

});

module.exports = SearchField;
