import express from "express";
import { createWiki, getWiki } from "./wiki.js";

const app = express();

app.get("/", (req,res)=>{
    res.end(createWiki("test test test test", "description"))
})

app.listen(4000, (err)=>{
    if(err) throw err;
    console.log(`Listening on port 4000`)
})