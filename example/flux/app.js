require('bootstrap/less/bootstrap.less');
require('font-awesome/less/font-awesome.less');
require('react-data-components/css/table-twbs.css');
require('react-data-components/css/pagination.css');

var React = require('react');
var FluxTable = require('./FluxTable');
var WebAPIUtils = require('./WebAPIUtils');
var DataStore = require('./DataStore');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};

DataStore.init({
  pageSize: 5,
  sortBy: { prop: 'CITY', order: 'desc' },
  filters: {
    globalSearch: {
      filter: containsIgnoreCase
    }
  }
});

WebAPIUtils.getCsvFile('sample_data.csv');

React.render(<FluxTable />, document.body);
