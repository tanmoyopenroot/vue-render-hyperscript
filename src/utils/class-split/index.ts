const classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;

export default (element: string) => element.split(classIdSplit);
