/** get favicon url for a page url */
export function getFaviconUrl(url:string):string
{
    return `chrome-extension://${chrome.runtime.id}/_favicon/?`
        +`pageUrl=${encodeURIComponent(url)}`
        +`&size=32`;
}