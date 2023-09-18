import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "valera",
  password: "6579",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: ['./database/entity/**{.ts,.js}'],
  migrations: ['./database/migrations/**{.ts,.js}'],
  // entities: [User, Post],
  // subscribers: ['./database/subscriber/**{.ts,.js}'],
})
