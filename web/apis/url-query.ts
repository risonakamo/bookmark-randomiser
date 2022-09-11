/** get from url the target folder id */
export function getTargetFolderId():string|null
{
    const params:URLSearchParams=new URLSearchParams(document.location.search);

    return params.get("folderid");
}