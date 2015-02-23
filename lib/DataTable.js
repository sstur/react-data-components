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

    if (this.props.showPageLengthSelector !== false) {
      var pageLengthSelector = (
        React.createElement(SelectField, {
          id: "page-menu", 
          label: "Page size:", 
          value: this.state.pageLength, 
          options: this.props.pageLengthOptions, 
          onChange: this.onPageLengthChange}
        )
      );
    }

    if (this.props.showSearch !== false) {
      var searchField = (
        React.createElement(SearchField, {
          id: "search-field", 
          label: "Search", 
          value: this.state.filterValues['globalSearch'], 
          onChange: this.onFilter.bind(this, 'globalSearch')}
        )
      );
    }

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
            pageLengthSelector, 
            searchField
          ), 
          pageControls
        ), 
        React.createElement(Table, {
          className: "table table-bordered", 
          dataArray: page.data, 
          columns: this.props.columns, 
          onRowClick: this.props.onRowClick, 
          keys: this.props.keys, 
          sortBy: this.state.sortBy, 
          onSort: this.onSort}
        )
      )
    );
  }
});

module.exports = DataTable;
