var url = "http://127.0.0.1:5000/view";
var id = "view";

async function generator(url, id) {
    var request = await new XMLHttpRequest()
    request.open('GET', url, true)
    request.onload = function () {
      var data = JSON.parse(this.response)
      view(data, request, id);
    }
  request.send()
}

  function view(data, request, id){
      if(id == "view"){
        if (request.status >= 200 && request.status < 400) {
           data.forEach((query) => {
           console.log(request.status);
           var div = document.createElement("tr");
           var mainContainer = document.getElementById(id);
           div.innerHTML = "<td>"+query.id+"</td><td><input id='name"+query.id+"' placeholder='"+query.name+"' value='"+query.name+"'/></td><td><input id='genre"+query.id+"' placeholder='"+query.genre+"' value='"+query.genre+"'/></td><td><input id='releasedate"+query.id+"' placeholder='"+query.releasedate+"' value='"+query.releasedate+"'/></td><td><input id='agelimit"+query.id+"' placeholder='"+query.agelimit+"' value='"+query.agelimit+"'/></td><td><input id='runningtime"+query.id+"' placeholder='"+query.runningtime+"' value='"+query.runningtime+"'/></td>"+"<button onclick = 'deleterecord("+query.id+")' type = 'submit' value='Submit'>Delete</button>"+"<button onclick = 'update("+query.id+")'>Update</button>" ;
           mainContainer.appendChild(div)
        })
      } else {
        console.log('error')
      }}
  }

async function generate_html(){
  await generator(url, id);
}

function deleterecord(id){
  const data = JSON.stringify({
    id: parseInt(id)
  });
  
  navigator.sendBeacon('http://127.0.0.1:5000/deleterecord/', data);
  console.log(data);
}
function update(id){
  const data = JSON.stringify({
    id: id,
    name: document.getElementById("name"+id).value,
    genre: document.getElementById("genre"+id).value,
    releasedate:document.getElementById("releasedate"+id).value,
    agelimit:document.getElementById("agelimit"+id).value,
    runningtime:document.getElementById("runningtime"+id).value

  });
  
  navigator.sendBeacon('http://127.0.0.1:5000/updatedetails/', data);
  console.log(data);
}

generate_html();
