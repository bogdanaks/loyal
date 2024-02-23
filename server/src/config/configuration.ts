export default () => ({
  otpSecretKey: process.env.OTP_SECRET_KEY,
  jwtUserSecretKey: process.env.JWT_USER_SECRET_KEY,
  jwtAccountSecretKey: process.env.JWT_ACCOUNT_SECRET_KEY,
  port: parseInt(process.env.PORT, 10) || 5000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
  tg: {
    tgBotUserApiKey: process.env.TG_BOT_USER_API_KEY,
    tgBotBusinessApiKey: process.env.TG_BOT_BUSINESS_API_KEY,
    tgHelperId: process.env.TG_HELPER_ID,
  },
});
