import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  },
  //logging: false,
});
