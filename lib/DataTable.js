var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({displayName: "DataTable",

  mixins: [ DataMixin ],

  render:function() {
    var page = this.buildPage();

    if (this.state.data.length > this.state.pageLength) {
      var pageControls = (
        React.createElement("div", {className: "page-controls"}, 
          React.createElement(Pagination, {
            className: "pagination pull-right", 
            currentPage: page.currentPage, 
            totalPages: page.totalPages, 
            onChangePage: this.onChangePage}
          )
        )
      );
    }

    return (
      React.createElement("div", {className: this.props.className}, 
        React.createElement("div", {className: "controls"}, 
          React.createElement("div", {className: "filter-controls"}, 
            this._renderPageLengthSelector(), 
            this._renderSearchVield()
          ), 
          this.props.children, 
          pageControls
        ), 
        React.createElement(Table, {
          className: "table table-bordered", 
          dataArray: page.data, 
          columns: this.props.columns, 
          onDisplayChange: this.props.onDisplayChange, 
          onRowClick: this.props.onRowClick, 
          keys: this.props.keys, 
          sortBy: this.state.sortBy, 
          onSort: this.onSort}
        )
      )
    );
  },

  _renderPageLengthSelector:function() {
    if (this.props.showPageLengthSelector === false) return;
    return (
      React.createElement(SelectField, {
        id: "page-menu", 
        label: "Page size:", 
        value: this.state.pageLength, 
        options: this.props.pageLengthOptions, 
        onChange: this.onPageLengthChange}
      )
    );
  },

  _renderSearchVield:function() {
    if (this.props.showSearch === false) return;
    return (
      React.createElement(SearchField, {
        id: "search-field", 
        label: "Search", 
        value: this.state.filterValues['globalSearch'], 
        onChange: this.onFilter.bind(this, 'globalSearch')}
      )
    );
  }
});

module.exports = DataTable;
