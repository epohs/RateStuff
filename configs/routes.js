
var auth = require('../lib/auth');

// http://hapijs.com/tutorials/cookies


module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      state: {
        parse: true,        // parse and store in request.state
        failAction: 'error' // may also be 'ignore' or 'log'
      }
    },
    handler: function (request, reply) {

      var data = {
        title: 'Hello World.',
        content: '<p>NodeJs, Hapi, and Handlebars. <a href="/test/">Test link</a>.</p>',
        state: JSON.stringify(request.state.token, null, 4)
      }


      var token = auth.get_token(request.state.token);

      console.log('token: ', token);

      reply.view('index', data).state('token', token);
    }
  },
  {
    method: 'GET',
    path: '/test/',
    handler: function (request, reply) {

      var data = {
        title: 'Test URL',
        content: '<p>A second route.</p><p><a href="/">Back home</a>.</p>'
      }

      reply.view('index', data);
    }
  }
];