import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';

const app = new OpenAPIHono();

app.openapi(
  createRoute({
    method: 'get',
    path: '/{id}',
    request: {
      params: z.object({
        id: z
          .string()
          .min(4)
          .openapi({
            param: {
              name: 'id',
              in: 'path',
            },
            example: '4444',
          }),
      }),
    },
    responses: {
      200: {
        content: {
          'application/json': {
            schema: z
              .object({
                id: z.string().openapi({
                  example: '4567',
                }),
                price: z.number().openapi({
                  example: 10.4,
                }),
              })
              .openapi('User'),
          },
        },
        description: 'Retrieve the user',
      },
    },
  }),
  (c) => {
    const { id } = c.req.valid('param');
    return c.json(
      {
        id,
        price: 100 * parseFloat(id),
      },
      200,
    );
  },
);

export default app;
