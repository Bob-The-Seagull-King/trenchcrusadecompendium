import { create } from "zustand";
import { IWarband, Warband } from "../classes/lists/Warband";
import Cookies from 'js-cookie'

type WarbandStore = {
    Warbands: Warband[];
    SetFromCookies: () => void; 
}

export const useWarbandStore = create<WarbandStore>((set) => ({
    Warbands: [],
    SetFromCookies: () => {
        set(
            (state) => ({Warbands: GrabWarband()})
        )}
}))

export function GrabWarband() {
    const TempList: Warband[] = [];  
    const data = localStorage.getItem('warbandstorage');  
    try {
        const WarbandList: Warband[] = JSON.parse(data || "");
        return WarbandList;
    } catch (e) {
        console.log("Local storage is not valid.")
    }
    return TempList;
}

