import { cleanEnv, str, port } from "envalid"

function validateEnv() : void {

    cleanEnv(process.env, {
        MONGO_URL: str(),
        PORT: port({ default: 8000 }),
        JWT_SECRET:str()
    })
}

export default validateEnv;