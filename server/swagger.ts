import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
const swaggerOptions = {
    
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation',
        },
        servers: [
            {
                url: 'http://localhost:7070', 
            },
        ],
    },
    apis: ['./router/*.ts', './data/controllers/*.ts'], 
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
