import { createMacchaApiServer } from "./";
import path = require("path");
import env = require("dotenv");
import { TestPlugin } from "./Plugins";

env.config();

async function bootstrap(): Promise<void> {
    const app = await createMacchaApiServer({
        assetsDir: path.join(process.cwd(), "public"),
        authorization: {
            expiresIn: process.env.EXPIRES_IN ?? "",
            jwtKey: process.env.JWT_KEY ?? ""
        },
        database: {
            username: process.env.DB_USERNAME ?? "",
            password: process.env.DB_PASSWORD ?? "",
            database: process.env.DB_DATABASE ?? "",
            host: process.env.DB_HOST ?? "",
            port: Number(process.env.DB_PORT),
            logging: false,
            logger: process.env.LOGGER_TYPE as "simple-console"
        },
        pulugins: [
            TestPlugin
        ]
    });

    console.log("start espresso cms listen on " + (process.env.PORT || 3000));
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
