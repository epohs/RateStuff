'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
const routes = require('./configs/routes');

server.connection({ port: 4000 });



server.register(require('vision'), (err) => {

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: 'templates',
    partialsPath: 'templates/partials',
    //layoutPath: 'templates/layouts',
    //helpersPath: 'templates/helpers'
  });


  server.route(routes);

 });


server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

