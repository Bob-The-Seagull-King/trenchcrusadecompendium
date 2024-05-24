import {ContentPack, IContentPack, IContentPackFile, IContentPackTag} from './contentpack'
import Cookies from 'js-cookie'
import { useContentPackStore } from '../../store/contentpacks'

class ContentPackManager {
    PackList: ContentPack[] = [];

    constructor() {
        const GrabData = useContentPackStore((state) => state.SetFromCookies)
        GrabData;
        const ReturnData = useContentPackStore((state) => state.ContentPacks)
        this.PackList = ReturnData;
    }

    public SetStorage() {
        localStorage.setItem('contentpackstorage', JSON.stringify(this.PackList));
    }

    public FileToContentPack(_content : string) {
        let ReturnMsg = "";
        try {
            ReturnMsg = this.ValidateFileData(_content) 
            if (ReturnMsg == "") {
                const ContentNew: ContentPack = new ContentPack(JSON.parse(_content));
                this.PackList.push(ContentNew);
                this.SetStorage();
            } else {
                return ReturnMsg;
            }
        } catch (e) {
            ReturnMsg = "File was not in the Content Pack format.";
        }

        return ReturnMsg;
    }

    private ValidateFileData(_content : string) {
        console.log("sdhasjkhdkasj")

        const TestPack = (JSON.parse(_content) as IContentPack)

        if (    TestPack.id &&
                TestPack.name &&
                TestPack.author &&
                TestPack.description &&
                TestPack.tags &&
                TestPack.isactive &&
                TestPack.files
            ) {
            undefined;
        } else {
            return "Invalid file format structure.";
        }

        let i = 0;
        for (i = 0; i < this.PackList.length; i++) {
            if (this.PackList[i].ID == TestPack.id) {
                return "You already have a Content Pack with the same ID";
            }
        }

        const IDArray = [];
        for (i = 0; i < TestPack.files.length; i ++) {
            let j = 0;
            for (j = 0; j < TestPack.files[i].data.length; j++) {
                IDArray.push(TestPack.files[i].data[j].id)
            }
        }

        console.log(IDArray);
        let x = 0;
        for (x = 0; x < this.PackList.length; x++) {
            
            for (i = 0; i < this.PackList[x].Files.length; i ++) {
                let j = 0;
                for (j = 0; j < this.PackList[x].Files[i].data.length; j++) {
                    if (IDArray.includes(this.PackList[x].Files[i].data[j].id)) {
                        return "Conflicting IDs were found."
                    }
                }
            }
        }


        return ""
    }

    public GetPack() {
        return this.PackList;
    }

    public DeletePack(_pack : ContentPack) {
        let i = 0;
        for (i = 0; i < this.PackList.length; i++) {
            if (_pack == this.PackList[i]) {
                this.PackList.splice(i, 1);
                break;
            }
        }
        this.SetStorage();
    }
}

export {ContentPackManager}