import fs from "fs";

const WikiDir = "wikis";
const AllowedNamesRegex = /^[A-Za-z0-9_ -]+$/;

/**
 * @param {String} name 
 * @returns {Boolean}
 */
export function createWiki(name, description) {
    if(!AllowedNamesRegex.test(name)) {
        throw new Error("Invalid wiki name")
    }

    const date = new Date();
    const id = name.replaceAll(" ", "-");
    const wikiManifest = {
        name: name,
        description: description,
        id: id,
        pages: [],
        createdAt: (date.getTime()/1000) - (date.getTimezoneOffset()*60)
    }

    if(!fs.existsSync(WikiDir)) fs.mkdirSync(WikiDir);
    const stats = fs.statSync(WikiDir)
    if(!stats.isDirectory()) {
        fs.rmSync(WikiDir);
        fs.mkdirSync(WikiDir);
    }
    if(!fs.existsSync(WikiDir)) {
        throw new Error("Dir Creation Error")
    }

    const wikiFolder = WikiDir+"/"+id
    if(fs.existsSync(wikiFolder)) {
        if(!fs.existsSync(wikiFolder+"/manifest.json")) {
            fs.rmdirSync(wikiFolder);

            fs.mkdirSync(wikiFolder)
            return createManifest(wikiFolder, wikiManifest);
        }
        throw new Error("Wiki Already Exists");
    } else {
        fs.mkdirSync(wikiFolder)
        return createManifest(wikiFolder, wikiManifest);
    }
}

function createManifest(wikiFolder, manifestJSON) {
    fs.writeFileSync(wikiFolder+"/manifest.json", JSON.stringify(manifestJSON, null, 4))
    return "Wiki Created Successfuly"
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