import { create } from "zustand";
import {ContentPack, IContentPack, IContentPackFile, IContentPackTag} from '../classes/contentpacks/contentpack'
import Cookies from 'js-cookie'

type ContentPackStore = {
    ContentPacks: ContentPack[];
    SetFromCookies: () => void;
}

export const useContentPackStore = create<ContentPackStore>((set) => ({
    ContentPacks: [],
    SetFromCookies: () => {
        set(
            (state) => ({ContentPacks: GrabContentPack()})
        )}
}))

function GrabContentPack() {
    const TempList: ContentPack[] = [];  
    const data = localStorage.getItem('contentpackstorage');  
    try {
        const ContentList: ContentPack[] = JSON.parse(data || "");
        return ContentList;
    } catch (e) {
        console.log("Local storage is not valid.")
    }
    return TempList;
}

