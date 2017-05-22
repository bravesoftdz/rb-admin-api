var userFactory   = require('./factory/userFactory');
var profileFactory   = require('./factory/profileFactory');
var tokenFactory = require('./factory/tokenFactory');
var customerFactory = require('./factory/customerFactory');
var cryptoFactory = require('./factory/cryptoFactory');
var billFactory = require('./factory/billFactory');
var costCenterFactory = require('./factory/costCenterFactory');
var productFactory = require('./factory/productFactory');
var planFactory = require('./factory/planFactory');
var geoFactory = require('./factory/geoFactory');
var orderFactory = require('./factory/orderFactory');
var dashboardFactory = require('./factory/dashboardFactory');

module.exports = {
  token: tokenFactory,
  geo: geoFactory,
  user: userFactory,
  profile: profileFactory,
  customer: customerFactory,
  crypto: cryptoFactory,
  bill: billFactory,
  costCenter: costCenterFactory,
  product: productFactory,
  plan: planFactory,
  order: orderFactory,
  dashboard: dashboardFactory
};
