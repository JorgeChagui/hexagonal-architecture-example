// import dotenv from "dotenv";
// dotenv.config();
/* If using something like "node -r dotenv/config index.js" to
    start the app you don't need the code above */

import { repositoryType } from "./constants";

export default {
    app: {
        port: process.env.PORT || 8000,
        repositoryType: process.env.REPOSITORY_TYPE || repositoryType.Other,
        nodeEnv: process.env.NODE_ENV,
    },
}