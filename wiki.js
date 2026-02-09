import "fs";

const AllowedNamesRegex = /^[A-Za-z0-9_ -]+$/;

/**
 * @param {String} name 
 */
export function getWikiFromName(name) {
    if(!AllowedNamesRegex.test(name)) {
        throw new Error("Invalid wiki name")
    }

    const id = name.replaceAll(" ", "-");
    const wikiJSON = {
        name: name,
        id: id,
        pages: []
    }
}