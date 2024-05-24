interface IContentPackFile {
    type: string,
    data: any[]
}

interface IContentPackTag {
    name: string,
    count: number
}

interface IContentPack {
    id: string,
    name: string,
    author: string,
    description: string,
    tags: IContentPackTag[],
    isactive: boolean,
    files: IContentPackFile[]
}

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

    public SwitchStates() {
        this.IsActive = !this.IsActive;
    }

}

export {ContentPack, IContentPack, IContentPackFile, IContentPackTag}