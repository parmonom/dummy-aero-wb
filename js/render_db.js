// msn item number

var container_msn = document.getElementById("msn-items");

// render recipe data
const renderMsn = (data) => {
  var data_splited = msnIdDecode(data);
  const html = `
    <div class="card-panel msn-item white row" data-id="${data}">
      <div class="msn-item-details">
        <div class="msn-item-title">Dummy ${data_splited[0]}</div>
        <div class="msn-item-content">Empty weight: ${data_splited[1]} kg</div>
        <div class="msn-item-content">Empty CG: ${data_splited[2]} %</div>
      </div>
      <div class="msn-item-delete">
        <img src="./img/google-icons/delete_outline_black-24dp.svg" data-id="${data}" class="left">
      </div>
    </div>
    `;
  container_msn.innerHTML += html;

};

for (var i = 0, len = msn_ids.length; i < len; ++i) {
  renderMsn(msn_ids[i])
}

// delete item
container_msn.addEventListener('click', evt => {
  if (evt.target.tagName === 'IMG') {
    let id = evt.target.getAttribute('data-id')
    item = document.querySelector(`.msn-item[data-id=${id}]`)
    
    // remove from DOM
    item.remove()

    // remove from database
    var index = msn_ids.indexOf(id);
    if (index !== -1) {
      msn_ids.splice(index, 1);
    }

    // update localstorage
    localStorage.setItem("msn_ids", JSON.stringify(msn_ids));
  }
})