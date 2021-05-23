// define custom id
var default_custom_id = btoa('custom,330,14'); //"Y3VzdG9tLDMzMCwxNA=="

// function that read and decode msn_data
function msnIdDecode(x) {
    var data_decoded = atob(x);
    data_splited = data_decoded.split(',')
    // check number of element, if second and third are numeric
    if (data_splited.length === 3 && !isNaN(parseFloat(data_splited[1])) && !isNaN(parseFloat(data_splited[2]))) {
        return data_splited
    }
}

// if msn_ids does not exist
if (localStorage.getItem("msn_ids") === null) {
    var msn_ids = [];
    localStorage.setItem("msn_ids", JSON.stringify(msn_ids));
} else {
    // open it 
    var msn_ids = JSON.parse(localStorage.getItem("msn_ids"));
}


// if msn_custom not exist 
if (localStorage.getItem("msn_custom_id") === null) {
    // create it
    var msn_custom_id = default_custom_id;
    var msn_custom = msnIdDecode(msn_custom_id);
    localStorage.setItem("msn_custom_id", msn_custom_id);
} else {
    // decode it
    var msn_custom_id = localStorage.getItem("msn_custom_id");
    var msn_custom = msnIdDecode(msn_custom_id);
}


// if lastkey does not exist
if (localStorage.getItem("lastkey") === null) {
    // add it as custom to store
    var lastkey = msn_custom_id;
    localStorage.setItem("lastkey", lastkey);
} else {
    // open it
    var lastkey = localStorage.getItem("lastkey");
}


// Check if new data given in url 
let params = new URLSearchParams(document.location.search);
var url_id = params.get('p');

if (url_id != null) {
    let msn_decoded = msnIdDecode(url_id)
    // if Decode is valid ans not alread in database
    if (msn_decoded && !msn_ids.includes(url_id)) {
        // push id into msn_ids and store it
        msn_ids.push(url_id)
        localStorage.setItem("msn_ids", JSON.stringify(msn_ids));

        // store id as lastkey
        var lastkey = url_id;
        localStorage.setItem("lastkey", lastkey);
    }
}


// add data to dropdown
// get selector
var msn_all = msn_ids.concat(msn_custom_id);
var selectorMSN = document.getElementById("selector-msn");
for (var i = 0, len = msn_all.length; i < len; ++i) {

    if (msn_all[i] === lastkey) {
        let data = msnIdDecode(msn_all[i])
        let tag = '<option selected="selected" value=' + msn_all[i] + '>MSN ' + data[0] + '</option>'
        selectorMSN.insertAdjacentHTML('beforeend', tag);
    } else {
        let data = msnIdDecode(msn_all[i])
        let tag = '<option value=' + msn_all[i] + '>MSN ' + data[0] + '</option>'
        selectorMSN.insertAdjacentHTML('beforeend', tag);
    }
}

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
