import { text } from "express";
import pg from "pg";

const dbClient = new pg.Client(
    {
        user:"postgres",
        host:"localhost",
        database:"postgres",
        password:"1010",
        port:"5432"
    }
)
dbClient.connect().then(() => console.log("DATABASE IS CONNECTED")).catch(error => console.error("DATABASE CONNECTION ERROR",error));
const query = (text,params) => dbClient.query(text,params);
export {query} 