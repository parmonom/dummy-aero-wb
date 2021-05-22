// define custom id
var custom_id = btoa('custom,330,14'); //"Y3VzdG9tLDMzMCwxNA=="

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
    // add custom configuration 'custom,330,14' encoded 
    var msn_ids = [custom_id];
    localStorage.setItem("msn_ids", JSON.stringify(msn_ids));
} else {
    // open it 
    var msn_ids = JSON.parse(localStorage.getItem("msn_ids"));
}

// if custom not in msn array ?

// if lastkey does not exist
if (localStorage.getItem("lastkey") === null) {
    // add it as custom to store
    var lastkey = custom_id;
    localStorage.setItem("lastkey", lastkey);
} else {
    // open it
    var lastkey = localStorage.getItem("lastkey");
}

// parse ids into msn_data
// var msn_data = [];
// for (var i = 0; i < msn_ids.length; ++i) {
//     // id decode
//     msn_data.push(msnIdDecode(msn_ids[i]));
// }

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

        // // push new msn decoded into msn_data
        // msn_data.push(msn_decoded);
    }
}

// add data to dropdown
// get selector
var selectorMSN = document.getElementById("selector-msn");
for (var i = 0, len = msn_ids.length; i < len; ++i) {

    if (msn_ids[i] === lastkey) {
        let data = msnIdDecode(msn_ids[i])
        let tag = '<option selected="selected" value=' + msn_ids[i] + '>MSN ' + data[0] + '</option>'
        selectorMSN.insertAdjacentHTML('beforeend', tag);
    } else {
        let data = msnIdDecode(msn_ids[i])
        let tag = '<option value=' + msn_ids[i] + '>MSN ' + data[0] + '</option>'
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
