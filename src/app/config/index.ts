import dotenv from 'dotenv'


dotenv.config()

export default  {
    port : process.env.port,
    databaseUrl : process.env.database_Url,
    jwtSecret : process.env.Token_secret,
    salt : Number(process.env.bycrypt_Salt)
} 