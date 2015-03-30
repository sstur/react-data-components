var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    if (this.state.data.length > this.state.pageLength) {
      var pageControls = (
        <div className="page-controls">
          <Pagination
            className="pagination pull-right"
            currentPage={page.currentPage}
            totalPages={page.totalPages}
            onChangePage={this.onChangePage}
          />
        </div>
      );
    }

    return (
      <div className={this.props.className}>
        <div className="controls">
          <div className="filter-controls">
            {this._renderPageLengthSelector()}
            {this._renderSearchVield()}
          </div>
          {this.props.children}
          {pageControls}
        </div>
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          onRowClick={this.props.onRowClick}
          keys={this.props.keys}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </div>
    );
  },

  _renderPageLengthSelector() {
    if (this.props.showPageLengthSelector === false) return;
    return (
      <SelectField
        id="page-menu"
        label="Page size:"
        value={this.state.pageLength}
        options={this.props.pageLengthOptions}
        onChange={this.onPageLengthChange}
      />
    );
  },

  _renderSearchVield() {
    if (this.props.showSearch === false) return;
    return (
      <SearchField
        id="search-field"
        label="Search"
        value={this.state.filterValues['globalSearch']}
        onChange={this.onFilter.bind(this, 'globalSearch')}
      />
    );
  }
});

module.exports = DataTable;
