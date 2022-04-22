"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Note api",
            version: "2.0.0",
            description: "ITS API Swagger",
        },
        servers: [
            {
                url: "http://localhost:4001",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        ],
    },
    apis: ["src/routes/*.ts", "index.ts"],
};
