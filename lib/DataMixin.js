var $__0=     require('./utils'),sort=$__0.sort,filter=$__0.filter;

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

module.exports = {

  getInitialState:function() {
    return {
      // Clone the data.
      data: this.props.data.slice(0),
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps:function() {
    return {
      initialPageLength: 10,
      pageLengthOptions: [ 5, 10, 20 ],
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  componentWillMount:function() {
    this._sortData();
  },

  componentWillReceiveProps:function(newProps) {
    if (newProps.data !== this.props.data) {
      this.setState({
        data: newProps.data.slice(),
        filterValues: {},
        currentPage: 0
      }, this._sortData);
    }
  },

  _sortData:function() {
    if (this.state.sortBy) {
      var newData = sort(this.state.sortBy, this.state.data);
      this.setState({
        data: newData
      });
    }
  },

  onSort:function(sortBy) {
    this.setState({
      sortBy: sortBy
    }, this._sortData);
  },

  onFilter:function(filterName, filterValue) {
    var $__0=   this.state,filterValues=$__0.filterValues,sortBy=$__0.sortBy;
    var $__1=   this.props,data=$__1.data,filters=$__1.filters;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, data);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage:function() {
    var $__0=    this.state,data=$__0.data,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    if (
      this._cachedState &&
      this._cachedState.data === data &&
      this._cachedState.currentPage === currentPage &&
      this._cachedState.pageLength === pageLength
    ) {
      return this._cachedPage;
    }

    var start = pageLength * currentPage;

    let page = {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength)
    };
    this._cachedPage = page;
    this._cachedState = {data:data, currentPage:currentPage, pageLength:pageLength};
    return page;
  },

  onChangePage:function(pageNumber) {
    if (this.props.onPageChange) {
      this.props.onPageChange(this.state.currentPage, pageNumber);
    }
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange:function(value) {
    var newPageLength = +value;
    var $__0=   this.state,currentPage=$__0.currentPage,pageLength=$__0.pageLength;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
