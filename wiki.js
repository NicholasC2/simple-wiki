import fs from "fs";

const WikiDir = "wikis";
const AllowedNamesRegex = /^[A-Za-z0-9_ -]+$/;

class Page {
    title = ""
    id = ""
}

const UpdateTypes = [
    "Content",
    "Title",
    "Description"
]

class WikiUpdate {
    page = Page
    type = 0
    changeTo = ""
    updatedAt = 0
}

class Wiki {
    name = ""
    description = ""
    id = ""
    createdAt = 0
    updates = [WikiUpdate]
    pages = [Page]

    constructor(name, description) {
        if(!AllowedNamesRegex.test(name)) {
            throw new Error("Invalid wiki name")
        }
    
        this.name = name;
        this.description = description;
        this.id = name.replaceAll(" ", "-").toLowerCase();
        
        const date = new Date()
        this.createdAt = date.getTime() - date.getTimezoneOffset()
        this.updates = []
        this.pages = []
    }
}

/**
 * Creates the WikiDir if it doesn't exist or is a file
 */
function initWikiDir() {
    if(!fs.existsSync(WikiDir)) {
        fs.mkdirSync(WikiDir)
    } // Create wiki dir if it doesn't exist

    const stats = fs.statSync(WikiDir)
    if(!stats.isDirectory()) {
        fs.rmSync(WikiDir); // Deletes wiki dir if it is a file
        fs.mkdirSync(WikiDir) // Creates wiki dir because it doesn't exist
    }
}

/**
 * @param {String} name 
 */
export function createWiki(name, description) {
    initWikiDir() // make sure that wiki dir exists
    const newWiki = new Wiki(name, description); // Instantiates new wiki

    const newWikiFolder = WikiDir+"/"+newWiki.id
    if(fs.existsSync(newWikiFolder)) {
        throw new Error("Wiki Already Exists"); // Throw error if the folder already exists
    } else {
        fs.mkdirSync(newWikiFolder) // makes the wiki folder
        fs.writeFileSync(newWikiFolder+"/manifest.json", JSON.stringify(newWiki, null, 4)) // makes the wiki manifest
        fs.mkdirSync(newWikiFolder+"/pages") // makes the wiki manifest
        return "Wiki Created Successfuly"
    }
}

export function getWiki(search) {
    if(!AllowedNamesRegex.test(search)) {
        throw new Error("Invalid wiki name")
    }

    const id = search.replaceAll(" ", "-");
    const manifestPath = WikiDir+"/"+id+"/manifest.json";
    if(fs.existsSync(manifestPath)) {
        return JSON.parse(fs.readFileSync(manifestPath))
    } else {
        throw new Error("Wiki Doesn't Exist")
    }
}