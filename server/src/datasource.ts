import { DataSource } from "typeorm";

const dbPort = process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432;

const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: dbPort,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "tp1DevOps",
  entities: [__dirname + "/entities/**/*.{js,ts}"],
  logging: true,
  synchronize: true,
});

export default datasource;
