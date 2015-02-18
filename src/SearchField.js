var React = require('react');

var SearchField = React.createClass({

  onChange(e) {
    this.props.onChange(e.target.value);
  },

  render() {
    return (
      <div>
        <input
          type="search"
          value={this.props.value}
          placeholder={this.props.label}
          onChange={this.onChange}
        />
      </div>
    );
  }

});

module.exports = SearchField;
