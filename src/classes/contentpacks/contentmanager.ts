import { ContentPack, IContentPack } from './contentpack'
import { useContentPackStore } from '../../store/contentpacks'

/**
 * Handles getting and setting the list of Content Packs uploaded
 * to the browser's local storage.
 */
class ContentPackManager {
    PackList: ContentPack[] = []; // Array of Content Packs

    /**
     * Gets the list of content packs currently stored.
     */
    constructor() {
        const GrabData = useContentPackStore((state) => state.SetFromCookies)

        GrabData;

        const ReturnData = useContentPackStore((state) => state.ContentPacks)
        this.PackList = ReturnData;
    }

    /**
     * Updates the browser's local storage to match the
     * manager's current array of Content Pack information.
     */
    public SetStorage() {
        localStorage.setItem('contentpackstorage', JSON.stringify(this.PackList));
    }

    /**
     * Receives the contents of a file uploaded from the users
     * computer and attempts to convert that into a content pack.
     * @param _content The string data of the imported JSON file.
     * @returns String message explaining any upload errors.
     */
    public FileToContentPack(_content : string) {
        let ReturnMsg = "";

        try {
            ReturnMsg = this.ValidateFileData(_content) 
            // If successfully validated, add the content pack to local storage
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

        // Return uploade message, non-empty strings represent an error
        return ReturnMsg;
    }

    /**
     * Checks if the JSON file has the right parameters.
     * NOTE:    Does not check the specific data uploaded, only that
     *          the minimum file structure exists
     * @param _content The string content of the uploaded file
     * @returns String, empty if no error occured during validation
     */
    private ValidateFileData(_content : string) {

        // Temporary parse as JSON object
        const TestPack = (JSON.parse(_content) as IContentPack)
        
        // Raise nothing if all the required structure is there
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

        // Check if a content pack with the same ID already exists
        let i = 0;
        for (i = 0; i < this.PackList.length; i++) {
            if (this.PackList[i].ID == TestPack.id) {
                return "You already have a Content Pack with the same ID";
            }
        }

        // Check if any ID provided match an ID in other content packs
        // such as Models, Equipment, etc to avoid conflicts
        const IDArray = [];
        for (i = 0; i < TestPack.files.length; i ++) {
            let j = 0;
            for (j = 0; j < TestPack.files[i].data.length; j++) {
                IDArray.push(TestPack.files[i].data[j].id)
            }
        }

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

        // If nothing is raised, return an empty string
        return ""
    }

    /**
     * @returns Content Pack array
     */
    public GetPack() {
        return this.PackList;
    }

    /**
     * Deletes a specific pack from the array and updates
     * local storage to reflect this.
     * @param _pack The content pack marked for deletion
     */
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