import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

function main(){

    mongoose.connect(config.databaseUrl as string).then(()=>{
        console.log('Database Conected..')
    }).catch(err => console.log(err))

    app.listen(config.port, () => {
        console.log("server listening...");
    });
      

}
 
main()