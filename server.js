const Hapi = require('@hapi/hapi');
const routes = require('./router');
 
const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost',
    routes:  {
        cors: {
            origin: ['*'],
        },
    },
  });
 
  server.route(routes);

  await server.start();
  console.log('Server berjalan pada %s', server.info.uri);
};
 
init();
