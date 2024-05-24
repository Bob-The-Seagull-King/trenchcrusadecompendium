// Base interface for filters
interface IFilterObject {
    group: string; // The category of information a filter relates to
}

// Interface for filters with variable text values
interface IFilterText extends IFilterObject {
    val: string; // The value of the text
    isstrict: boolean; // If the text search should be an exact match
}

// Interface for filters with a key-value pair
interface IFilterItem extends IFilterObject {
    isactive: boolean; // If the filter is active
    doinclude: boolean; // If the filter wants to include of exclude itself
    name: string; // The key that the filter searches for
}

// Interface for tag filters
interface IFilterTag extends IFilterObject {
    tagtype: IFilterItem; // The tag_name information of the tag
    tagval: IFilterText; // The val information of the tag
}

// Object for text filters
class FilterText {
    Group: string;
    Val: string;
    IsStrict: boolean;

    constructor(item: IFilterText) {
        this.Group = item.group;
        this.Val = item.val;
        this.IsStrict = item.isstrict;
    }
}

// Object for misc filters
class FilterItem {
    Group: string;
    IsActive: boolean;
    DoInclude: boolean;
    Name: string;

    constructor(item: IFilterItem) {
        this.Group = item.group;
        this.IsActive = item.isactive;
        this.DoInclude = item.doinclude;
        this.Name = item.name;
    }
}

// Object for tag filters
class FilterTag {
    Group: string;
    TagType: FilterItem;
    TagVal: FilterText;

    constructor(item: IFilterTag) {
        this.Group = item.group;
        this.TagType = new FilterItem(item.tagtype);
        this.TagVal = new FilterText(item.tagval);
    }
}

export {IFilterObject, IFilterText, IFilterItem, IFilterTag, FilterText, FilterItem, FilterTag}