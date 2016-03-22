module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: function (request, reply) {

      var data = {
        title: 'Hello World.',
        content: '<p>NodeJs, Hapi, and Handlebars. <a href="/test/">Test link</a>.</p>'
      }

      reply.view('index', data);
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