var { sort, filter } = require('./utils');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

module.exports = {

  getInitialState() {
    return {
      // Clone the data.
      data: this.props.data.slice(0),
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageLength: this.props.initialPageLength
    };
  },

  getDefaultProps() {
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

  componentWillMount() {
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

  _sortData() {
    if (this.state.sortBy) {
      var newData = sort(this.state.sortBy, this.state.data);
      this.setState({
        data: newData
      });
    }
  },

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy
    }, this._sortData);
  },

  onFilter(filterName, filterValue) {
    var {filterValues, sortBy} = this.state;
    var {data, filters} = this.props;

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
  buildPage() {
    var {data, currentPage, pageLength} = this.state;
    var start = pageLength * currentPage;

    return {
      data: data.slice(start, start + pageLength),
      currentPage: currentPage,
      totalPages: Math.ceil(data.length / pageLength)
    };
  },

  onChangePage(pageNumber) {
    this.setState({ currentPage: pageNumber });
  },

  onPageLengthChange(value) {
    var newPageLength = +value;
    var {currentPage, pageLength} = this.state;
    var newPage = Math.floor((currentPage * pageLength) / newPageLength);

    this.setState({
      pageLength: newPageLength,
      currentPage: newPage
    });
  }

};
