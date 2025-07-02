import dotenv from 'dotenv';
dotenv.config();

export const config = {
  snowflake: {
    account: process.env.SNOWFLAKE_ACCOUNT!,
    username: process.env.SNOWFLAKE_USERNAME!,
    password: process.env.SNOWFLAKE_PASSWORD!,
    region: process.env.SNOWFLAKE_REGION!,
    clientSessionKeepAlive: true,
    application: process.env.SNOWFLAKE_APPLICATION || 'my-app',
    warehouse: process.env.SNOWFLAKE_WAREHOUSE!,
    role: process.env.SNOWFLAKE_ROLE!,
    database: process.env.SNOWFLAKE_DATABASE!,
    auditDatabase: process.env.SNOWFLAKE_AUDIT_DATABASE!
  },
  maxRetries: 10000
};