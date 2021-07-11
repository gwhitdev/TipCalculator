// Written by Gareth Whitley (c) 2021 www.github.com/gwhitdev
// You may freely use and distribute this code as long as you keep this attribution.

export function $(element) {
    if(element) {
        if (typeof(element) === typeof(0)) throw TypeError('You passed a number, pass a valid string instead.');
        const regex = /^[\w||.]/;
        if(!regex.test(element)) throw Error('You need to supply a correct argument to select the element');
    }
    if (element[0] !== '.') return document.getElementById(element);
    if (element[0] === '.') {
        const className = element.substr(1);
        return document.getElementsByClassName(className);
    };
    throw Error('No valid argument supplied');
    
}

