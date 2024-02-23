interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

interface TelegramConfig {
  tgBotUserApiKey: string;
  tgBotBusinessApiKey: string;
  tgHelperId: string;
}

interface EnvironmentVariables {
  otpSecretKey: string;
  jwtUserSecretKey: string;
  jwtAccountSecretKey: string;
  port: number;
  database: DatabaseConfig;
  tg: TelegramConfig;
}
