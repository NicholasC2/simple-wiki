import "fs";

const AllowedNamesRegex = /^[A-Za-z0-9_ -]+$/;

/**
 * @param {String} name 
 */
export function createWiki(name, description) {
    if(!AllowedNamesRegex.test(name)) {
        throw new Error("Invalid wiki name")
    }

    const id = name.replaceAll(" ", "-");
    const wikiJSON = {
        name: name,
        description: description,
        id: id,
        pages: [],
        createdAt: new Date().getTime()
    }
}