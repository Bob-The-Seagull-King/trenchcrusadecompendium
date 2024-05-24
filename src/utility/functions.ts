/**
 * Returns a capitalized version of a given string
 * @param stringVal The string to be capitalized
 * @returns The string with the first letter capitalized
 */
export function capitalizeString(stringVal: string) {
    if (stringVal.length > 0) {
        return stringVal[0].toUpperCase() + stringVal.slice(1).toLowerCase();
    }
    return "";
}

/**
 * Takes a long string featuring underscores and turns it
 * into a form usable on the frontend.
 * @param stringVal The string to convert
 * @returns The string with "_" replaced with " " and all
 *          individual words capitalized.
 */
export function makestringpresentable(stringVal: string) {
    const pairedString = stringVal.toString().replace(/_/g, ' ').split(" "); 
    let stringreturned = "";
    
    let i = 0 
    for (i = 0; i < pairedString.length; i++) {
        const tempstring = capitalizeString(pairedString[i])
        stringreturned = stringreturned + ((i == 0)?  "" : " ") + tempstring
    }
    return stringreturned;
}

/**
 * Returns the class-colour based on the provided name
 * @param name The job or class of the given item
 * @returns The colour associated with that job or class
 */
export function getColour(name: string){
    const yellow = ["yellow", "cl_vagabond", "vagabond", "fool", "freelancer", "shade", "warden"];
    const red = ["red","cl_stalwart", "stalwart", "bastion", "demon slayer", "colossus", "knave"];
    const green = ["green", "cl_mendicant", "mendicant", "chanter", "harvester", "sealer", "seer"];
    const blue = ["blue","cl_wright", "wright", "enochian", "geomancer", "spellblade", "stormbender"];
    const purple = ["Purple", "purple"];

    if (yellow.includes(name.toLowerCase())) {
        return yellow[0];
    }

    if (red.includes(name.toLowerCase())) {
        return red[0];
    }

    if (green.includes(name.toLowerCase())) {
        return green[0];
    }

    if (blue.includes(name.toLowerCase())) {
        return blue[0];
    }

    if (purple.includes(name.toLowerCase())) {
        return purple[0];
    }

    return purple[0];
}

/**
 * Checks if a tag-set contains a specific value
 * @param tag the array of {} tags
 * @param value the value of the tag_name to be checked
 * @returns Boolean, if one of the tags has tag_name
 * that matches the value.
 */
export function containsTag(tag:any, value:string) {
    let i = 0;

    for (i = 0; i < tag.length; i++) {
        if (tag[i].tag_name == value) {
            return true;
        }
    }
    return false;
}

/**
 * Gets the value of a tage from a tag array
 * @param tag the array of {} tags
 * @param value the tag_name to get the value of
 * @returns the val of a given tag, returns ""
 * if no tag exists within the param tag.
 */
export function getTagValue(tag:any, value:string) {
    let i = 0;

    for (i = 0; i < tag.length; i++) {
        if (tag[i].tag_name == value) {
            return tag[i].val;
        }
    }
    return "";
}

/**
 * Finds the human-readable title for any given
 * page route.
 * @param _route The current route of the page.
 * @returns A string name for the route endpoint.
 */
export function getRouteName(_route: string) {
    if (_route.includes("compendium/abilities")) {
        return "Abilities"
    }

    if (_route.includes("tools/content")) {
        return "Content Manager"
    }

    return ""
}

type sortArg<T> = keyof T | `-${string & keyof T}`

/**
 * Returns a comparator for objects of type T that can be used by sort
 * functions, were T objects are compared by the specified T properties.
 *
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function byPropertiesOf<T extends object> (sortBy: Array<sortArg<T>>) {
    function compareByProperty (arg: sortArg<T>) {
        let key: keyof T
        let sortOrder = 1
        if (typeof arg === 'string' && arg.startsWith('-')) {
            sortOrder = -1
            // Typescript is not yet smart enough to infer that substring is keyof T
            key = arg.substr(1) as keyof T
        } else {
            // Likewise it is not yet smart enough to infer that arg here is keyof T
            key = arg as keyof T
        }
        return function (a: T, b: T) {
            const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0

            return result * sortOrder
        }
    }

    return function (obj1: T, obj2: T) {
        let i = 0
        let result = 0
        const numberOfProperties = sortBy?.length
        while (result === 0 && i < numberOfProperties) {
            result = compareByProperty(sortBy[i])(obj1, obj2)
            i++
        }

        return result
    }
}

/**
 * Sorts an array of T by the specified properties of T.
 *
 * @param arr - the array to be sorted, all of the same type T
 * @param sortBy - the names of the properties to sort by, in precedence order.
 *                 Prefix any name with `-` to sort it in descending order.
 */
export function sort<T extends object> (arr: T[], ...sortBy: Array<sortArg<T>>) {
    arr.sort(byPropertiesOf<T>(sortBy))
}