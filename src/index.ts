import { OpenAPIHono } from '@hono/zod-openapi';
import customerRoutes from './customer.route';
import orderRoutes from './order.route';
import { swaggerUI } from '@hono/swagger-ui';
import { basicAuth } from 'hono/basic-auth';

const app = new OpenAPIHono();

app.route('/customers', customerRoutes);
app.route('/orders', orderRoutes);

app.get(
  '/docs',
  basicAuth({
    username: 'pass',
    password: 'word',
  }),
  swaggerUI({ url: '/openapi' }),
);

app.openAPIRegistry.registerComponent('securitySchemes', 'BasicAuth', {
  type: 'http',
  scheme: 'basic',
});

// todo: protect the /openapi route
app.doc31('/openapi', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
  security: [{ basicAuth: [] }],
});

export default app;
