function main()
{
  chrome.tabs.create({
    url:"/build/pages/folder-select/index.html"
  });
}

window.onload=main;

export {};