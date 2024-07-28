/**
 * Generic structure for a file to be included
 * in data searches. I.e "Models" "Factions" etc
 */
interface IContentPackFile {
    type: string,
    data: any[]
}

/**
 * Structure for tag to help users know what types
 * of data the content pack adds
 */
interface IContentPackTag {
    name: string,
    count: number
}

/**
 * Structure of a Content Pack
 */
interface IContentPack {
    id: string,
    name: string,
    author: string,
    description: string,
    tags: IContentPackTag[],
    isactive: boolean,
    files: IContentPackFile[]
}

/**
 * Additional suite of data that is added to all
 * searched made by the compendium when "Active".
 */
class ContentPack {

    ID: string;
    Name: string;
    Author: string;
    Description: string;
    Tags: IContentPackTag[];
    IsActive: boolean;
    Files: IContentPackFile[];

    constructor(_contentpack: IContentPack) {
        this.ID = _contentpack.id;
        this.Name = _contentpack.name;
        this.Author = _contentpack.author;
        this.Description = _contentpack.description;
        this.Tags = _contentpack.tags;
        this.IsActive = true;
        this.Files = _contentpack.files;
    }

    /**
     * Swap a pack between Active and Inactive
     */
    public SwitchStates() {
        this.IsActive = !this.IsActive;
    }

}

export {ContentPack, IContentPack, IContentPackFile, IContentPackTag}