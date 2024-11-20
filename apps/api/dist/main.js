"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('E-commerce API')
        .setDescription('API documentation for the e-commerce application')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag("Auth")
        .addTag('Products')
        .addTag('Orders')
        .addTag('Categories')
        .addTag("Users")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT');
    await app.listen(PORT || 4000);
}
bootstrap();
//# sourceMappingURL=main.js.map