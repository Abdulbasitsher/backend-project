import BDconnect from "./db/index.js"; 
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config({
    path: "./env"
});



BDconnect()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch(
    (err) => {
        console.log("DB is not connect", err)
    }
)




// (async ()=> {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
//         app.on("error", (error) => {
//             console.error("Error on connecting to the database: ", error);
//             throw error;
//         })
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         });
//     }catch(error){
//         console.error("Error on connecting to the database: ", error);
//     }
// })()