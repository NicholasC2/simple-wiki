import express from "express";
import { getWikiFromName } from "./wiki.js";

const app = express();

app.get("/", (req,res)=>{
    res.end(getWikiFromName("test test test test"))
})

app.listen(80, ()=>{
    console.log(`Listening on port 80`)
})