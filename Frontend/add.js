function sendPost(){
    const data = JSON.stringify({
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        releasedate:document.getElementById("release date").value,
        agelimit:document.getElementById("age limit").value,
        runningtime:document.getElementById("running time").value


      
      });
      
      navigator.sendBeacon('http://127.0.0.1:5000/savedetails/', data);
      console.log(data);
    }
