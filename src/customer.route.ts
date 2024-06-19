import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const app = new OpenAPIHono();

const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
});

const CustomerSchema = z
  .object({
    id: z.string().openapi({
      example: '123',
    }),
    name: z.string().openapi({
      example: 'John Doe',
    }),
    age: z.number().openapi({
      example: 42,
    }),
    createdAt: z.date().openapi({
      example: new Date().toISOString(),
    }),
  })
  .openapi('Customer');

const route = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: CustomerSchema,
        },
      },
      description: 'Retrieve the user',
    },
  },
});

app.openapi(route, (c) => {
  const { id } = c.req.valid('param');
  return c.json(
    {
      id,
      age: 20,
      name: 'Ultra-man',
      createdAt: new Date().toISOString(),
    },
    200,
  );
});

export default app;
