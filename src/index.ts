import { OpenAPIHono } from '@hono/zod-openapi';
import customerRoutes from './customer.route';
import { swaggerUI } from '@hono/swagger-ui';

const app = new OpenAPIHono();

app.route('/customers', customerRoutes);

app.get('/docs', swaggerUI({ url: '/openapi' }));

app.doc31('/openapi', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
});

export default app;
