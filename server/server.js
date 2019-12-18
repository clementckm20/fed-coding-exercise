'use strict';

const Hapi = require('@hapi/hapi');
// Define sources for data
const launchpads = require('./resources/launchpads.json')
const launches = require('./resources/launches.json')
const init = async () => {
// Set server port
    const server = Hapi.server({
        port: 8001,
        host: 'localhost'
    });
// Set routes for launches
    server.route({
        method: 'GET',
        path: '/launches',
        handler: (request, h) => {
            var headers = request.headers;
            return {body: launches};
        },
        config: {
          cors: {
              origin: ['http://localhost:3000',
                    'http://localhost'],
              additionalHeaders: [
              'Access-Control-Allow-Origin',
              'Access-Control-Request-Method',
              'Allow-Origin',
              'Origin',
              'access-control-allow-origin',
              'access-control-request-method',
              'allow-origin',
              'origin','Content-Type']
          }
        }
    });
// Set routes for launchpad
server.route({
    method: 'GET',
    path: '/launchpads',
    handler: (request, h) => {
        var headers = request.headers;
        return {body: launchpads};
    },
    config: {
      cors: {
          origin: ['http://localhost:3000',
                'http://localhost'],
          additionalHeaders: [
          'Access-Control-Allow-Origin',
          'Access-Control-Request-Method',
          'Allow-Origin',
          'Origin',
          'access-control-allow-origin',
          'access-control-request-method',
          'allow-origin',
          'origin','Content-Type']
      }
    }
});
// start server
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
