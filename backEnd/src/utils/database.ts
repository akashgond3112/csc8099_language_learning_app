import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

const mainModuleFile = process.argv[1];
const mainModuleDir = path.dirname(fs.realpathSync(mainModuleFile));

const p = path.join(mainModuleDir, "pemFIle", "DigiCertGlobalRootCA.crt.pem");
const serverCa = [fs.readFileSync(p, "utf8")];

const sequelize = new Sequelize(
  "databasename",
  "username",
  `password`,
  {
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        ca: serverCa,
      },
    },
    host: "HOST",
  }
);

export default sequelize;
