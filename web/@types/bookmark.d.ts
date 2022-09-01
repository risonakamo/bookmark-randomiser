type BookmarkPath=string[]

/** abstracted bookmark item. represents a folder that can be randomised upon */
interface BookmarkItem
{
    title:string
    id:string

    // number of folders in the bookmark item
    dirs:number

    // number of real bookmarks in this bookmark item
    items:number
}