'use strict';

// Framework for making things easier
const Hapi = require('hapi');

// The server object
const server = new Hapi.Server();

server.connection({ port: 4000 });

// Configure the server for cookies
server.state('data', {
  ttl: null,
  isSecure: false,
  isHttpOnly: true,
  encoding: 'base64json',
  clearInvalid: false, // remove invalid cookies
  strictHeader: true // don't allow violations of RFC 6265
});



// Routes are handled in an include
const routes = require('./configs/routes');



server.register(require('vision'), (err) => {


  // Configure our templates
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

