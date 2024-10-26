import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
console.log(1);

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
                url: 'http://localhost:7070', // ודא שהפורט תואם לפורט השרת
            },
        ],
    },
    apis: ['./router/*.ts', './data/controllers/*.ts'], // הגדר את הנתיבים בצורה מלאה
};
console.log(2);

const swaggerDocs = swaggerJsdoc(swaggerOptions);

export { swaggerDocs, swaggerUi };
