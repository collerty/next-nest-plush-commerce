"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const cookieParser = require("cookie-parser");
const express = require("express");
const body_parser_1 = require("body-parser");
const get_body_parser_options_util_1 = require("@nestjs/platform-express/adapters/utils/get-body-parser-options.util");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        rawBody: false
    });
    app.use((0, body_parser_1.json)((0, get_body_parser_options_util_1.getBodyParserOptions)(true, { limit: '50mb' })));
    app.use((0, express_1.urlencoded)((0, get_body_parser_options_util_1.getBodyParserOptions)(true, { limit: '50mb' })));
    app.use(express.json());
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const configService = app.get(config_1.ConfigService);
    const PORT = configService.get('PORT') || 4000;
    await app.listen(PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map