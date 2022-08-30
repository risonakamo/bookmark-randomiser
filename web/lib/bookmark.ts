import _ from "lodash";

/** get bookmark item at requested path */
async function getBookmarkItemWithPath(path:BookmarkPath):Promise<BookmarkItem>
{
    const bookmarknode:BookmarkTreeNode|null=await getBookmarkNodeWithPath(path);

    if (!bookmarknode)
    {
        console.error("failed to get bookmark node with path:",path);
        throw "bookmark node error";
    }

    return bookmarkNodeToItem(bookmarknode);
}

/** get chrome bookmark node with bookmark path */
async function getBookmarkNodeWithPath(path:BookmarkPath):Promise<BookmarkTreeNode|null>
{
    const bookmarkid:string|null=await bookmarkPathToId(path);

    if (!bookmarkid)
    {
        console.error("failed to get bookmark node with path:",path);
        return null;
    }

    return (await chrome.bookmarks.getSubTree(bookmarkid))[0];
}

/** convert bookmark path to a chrome bookmark id, if possible. assumes the top level is from
 *  Other Bookmarks folder */
async function bookmarkPathToId(path:BookmarkPath):Promise<string|null>
{
    path=[...path];
    var currentNode:BookmarkTreeNode|undefined=await getOtherBookmarksNode();

    if (!currentNode)
    {
        console.error("failed to get top level bookmark node");
        console.error("path:",path);
        return null;
    }

    while (true)
    {
        // popped everything off the path, return the current path's id
        if (!path.length)
        {
            return currentNode.id;
        }

        const searchItem:string|undefined=path.shift();

        if (!searchItem)
        {
            console.error("failed to pop item off path");
            return null;
        }

        const foundItem:BookmarkTreeNode|undefined=_.find(
            currentNode.children,
            (node:BookmarkTreeNode):boolean=>{
                return node.title==searchItem;
            }
        );

        if (!foundItem)
        {
            console.error("failed converting path to id:",path);
            console.error("failed to find item:",searchItem);
            return null;
        }

        currentNode=foundItem;
    }
}

/** get the other bookmarks node */
async function getOtherBookmarksNode():Promise<BookmarkTreeNode|undefined>
{
    const top:chrome.bookmarks.BookmarkTreeNode=(await chrome.bookmarks.getTree())[0];

    return _.find(top.children,(node:BookmarkTreeNode):boolean=>{
        return node.title=="Other bookmarks";
    });
}

/** given a list of bookmark nodes, count the number of those bookmarks which are actual bookmarks
 *  and not folders */
function countRealBookmarks(bookmarkNodes:BookmarkTreeNode[]):number
{
    return _.reduce(bookmarkNodes,(r:number,node:BookmarkTreeNode):number=>{
        if ("children" in node)
        {
            return r+1;
        }

        return r;
    },0);
}

/** convert chrome bookmark node into abstracted form */
function bookmarkNodeToItem(node:BookmarkTreeNode):BookmarkItem
{
    if (node.children==undefined)
    {
        console.error("could not convert bookmark node to item, bookmark node was not a folder");
        throw "bookmark node to item error";
    }

    return {
        title:node.title,
        id:node.id,
        items:countRealBookmarks(node.children)
    };
}

export async function bookmarklibtest():Promise<void>
{
    const a=await getBookmarkItemWithPath(["kantai/images"]);

    console.log(a);
}