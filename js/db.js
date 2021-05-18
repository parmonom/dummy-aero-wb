// get size of db
var sizedb = localStorage.length;

// add default if not in db
if (localStorage.getItem("custom") === null) {
    // store lastkey
    var lastkey = 'custom';
    localStorage.setItem("lastkey", lastkey);
    // store custom
    var custom_ac = ['custom', 330, 14];
    localStorage.setItem("custom", JSON.stringify(custom_ac));
}

// Check if new data given in url 
let params = new URLSearchParams(document.location.search);

var url_emptyWeight = parseFloat(params.get('ew'));
var url_startCG = parseFloat(params.get('scg'));
var url_msn = params.get('msn');

if (!isNaN(url_emptyWeight) & !isNaN(url_startCG) & url_msn != null) {
    // store lastkey
    var lastkey = url_msn;
    localStorage.setItem("lastkey", lastkey);
    // store url data
    var new_data = [url_msn, url_emptyWeight, url_startCG];
    localStorage.setItem(url_msn, JSON.stringify(new_data));
}


// // add data to dropdown
// get last key
var lastkey = localStorage.getItem('lastkey');
// get selector
var selectorMSN = document.getElementById("selector-msn");
for ( var i = 0, len = localStorage.length; i < len; ++i ) {
    console.log(i, localStorage.key( i ), lastkey)

    if (localStorage.key(i) === lastkey) {
        var data = JSON.parse(localStorage.getItem(localStorage.key( i )));
        var tag = '<option selected="selected" value='+data[0]+'>MSN '+data[0]+'</option>'
        selectorMSN.insertAdjacentHTML('beforeend', tag);
    }
    else if (localStorage.key(i) != 'lastkey') {
        var data = JSON.parse(localStorage.getItem(localStorage.key( i )));
        var tag = '<option value='+data[0]+'>MSN '+data[0]+'</option>'
        selectorMSN.insertAdjacentHTML('beforeend', tag);
    }
}
//  selected="selected"

//     inputEmptyWeight.value = url_emptyWeight
//     inputStartCG.value = url_startCG
//     window.localStorage.setItem("emptyWeight", url_emptyWeight)    
//     window.localStorage.setItem("startCG", url_startCG)    

// } else if (window.localStorage.getItem("emptyWeight") & window.localStorage.getItem("startCG")) {
//     //if storage exist start CG
//     inputEmptyWeight.value = window.localStorage.getItem("emptyWeight")
//     inputStartCG.value = window.localStorage.getItem("startCG")

// } else {
//     //else fill storage from default value
//     window.localStorage.setItem("emptyWeight", emptyWeight)    
//     window.localStorage.setItem("startCG", startCG)    
// }
