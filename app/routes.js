var factories   = require('./factories');


module.exports = function(app){
  // ---------------------------------------------------------
  // authentication (no middleware necessary since this isnt authenticated)
  // ---------------------------------------------------------
  // http://localhost:8080/api/login
  app.post('/api/login', factories.user.authenticate);
  // ---------------------------------------------------------
  // route middleware to authenticate and check token
  // ---------------------------------------------------------
  //app.use(factories.token.next);

  // ---------------------------------------------------------
  // authenticated routes
  // ---------------------------------------------------------
  app.get('/api/logout',factories.user.logout);

  // Customer
  app.get('/api/customer/', factories.customer.findAll);
  app.post('/api/customer/', factories.customer.add);
  app.get('/api/customer/:id', factories.customer.findById);
  app.delete('/api/customer/:id', factories.customer.delete);
  app.get('/api/customer/:email', factories.customer.findByEmail);
  app.put('/api/customer/:id', factories.customer.update);

  // User
  app.post('/api/user/add', factories.user.add); 

  // Geo
  app.get('/api/state', factories.geo.findStates); 
  app.get('/api/city/:id', factories.geo.findCitiesByState); 

  // Bills
  app.get('/api/bill', factories.bill.findAll);
  app.post('/api/bill', factories.bill.add);
  app.delete('/api/bill/:id', factories.bill.delete);
  app.post('/api/bill/:id/pay', factories.bill.pay);

  // CostCenter
  app.get('/api/costcenter/', factories.costCenter.findAll);
  app.post('/api/costcenter/', factories.costCenter.add);
  app.delete('/api/costcenter/:id', factories.costCenter.delete);

  // Product
  app.get('/api/product/', factories.product.findAll);
  app.post('/api/product/', factories.product.add);
  app.delete('/api/product/:id', factories.product.delete);

  // Order
  app.get('/api/order/', factories.order.findAll);
  app.post('/api/order/', factories.order.add);
  app.delete('/api/order/:id', factories.order.archive);
  app.put('/api/order/:id', factories.order.update);

  // Plan
  app.get('/api/plan/', factories.plan.findAll);
  app.post('/api/plan/', factories.plan.add);
  app.delete('/api/plan/:id', factories.plan.delete);

  // Dashboard 
  app.get('/api/dashboard/activeUsers/', factories.dashboard.countAllActiveCustomers);
  app.get('/api/dashboard/ordersNotPaid/', factories.dashboard.ordersNotPaidsWithDueDateInNextDays);
  app.get('/api/dashboard/delayedOrders/', factories.dashboard.delayedOrders);
  app.get('/api/dashboard/billsToPay/', factories.dashboard.billsToPayInNextDays);
  
  // Searchs 
  app.get('/api/search/customer/by/name', factories.customer.findByName);


  app.get('/check', function(req, res) {
    res.json(req.decoded);
  });
};
