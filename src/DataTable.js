var React = require('react');
var Table = require('./Table');
var Pagination = require('./Pagination');
var SelectField = require('./SelectField');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var {PropTypes} = React;

var DataTable = React.createClass({

  mixins: [ DataMixin ],

  childContextTypes: {
    currentPage: PropTypes.number,
    dataLength: PropTypes.number,
    globalSearchValue: PropTypes.string,
    onChangePage: PropTypes.func,
    onGlobalSearchChange: PropTypes.func,
    onPageLengthChange: PropTypes.func,
    pageLength: PropTypes.number,
  },

  getChildContext() {
    let {state} = this.state;
    return {
      currentPage: state.currentPage,
      dataLength: state.data.length,
      globalSearchValue: state.filterValues.globalSearch,
      onChangePage: this.onChangePage,
      onGlobalSearchChange: this.onFilter.bind(this, 'globalSearch'),
      onPageLengthChange: this.onPageLengthChange,
      pageLength: state.pageLength,
    };
  },

  render() {
    var {data} = this.buildPage();
    return (
      <div className={this.props.className}>
        {this.props.children}
        <Table
          className="table table-bordered"
          dataArray={data}
          columns={this.props.columns}
          onDisplayChange={this.props.onDisplayChange}
          onRowClick={this.props.onRowClick}
          keys={this.props.keys}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
      </div>
    );
  },

  // _render() {
  //   return (
  //     <div className="controls">
  //       <div className="filter-controls">
  //         <PageLengthSelector />
  //         <SearchFilter />
  //       </div>
  //       <PageSelector />
  //     </div>
  //   );
  // },

});

var SearchFilter = React.createClass({
  contextTypes: {
    globalSearchValue: PropTypes.string,
    onGlobalSearchChange: PropTypes.func,
  },

  render() {
    let {context} = this;
    return (
      <SearchField
        id="search-field"
        label="Search"
        value={context.globalSearchValue}
        onChange={context.onGlobalSearchChange}
      />
    );
  }
});

var PageLengthSelector = React.createClass({
  propTypes: {
    options: PropTypes.object,
  },

  contextTypes: {
    pageLength: PropTypes.number,
    onPageLengthChange: PropTypes.func,
  },

  render() {
    let {context, props} = this;
    return (
      <SelectField
        id="page-menu"
        label="Page size:"
        value={context.pageLength}
        options={props.options}
        onChange={context.onPageLengthChange}
      />
    );
  }
});

var PageSelector = React.createClass({
  contextTypes: {
    currentPage: PropTypes.number,
    dataLength: PropTypes.number,
    onChangePage: PropTypes.func,
    pageLength: PropTypes.number,
  },

  render() {
    let {dataLength, pageLength, currentPage, onPageChange} = this.context;
    if (dataLength > pageLength) {
      let totalPages = Math.ceil(dataLength / pageLength);
      return (
        <div className="page-controls">
          <Pagination
            className="pagination pull-right"
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={onChangePage}
          />
        </div>
      );
    }
  }
});

module.exports = DataTable;
module.exports.SearchFilter = SearchFilter;
module.exports.PageLengthSelector = PageLengthSelector;
module.exports.PageSelector = PageSelector;
