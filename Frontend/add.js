function sendPost(){
    const data = JSON.stringify({
        name: document.getElementById("name").value,
        genre: document.getElementById("genre").value,
        releasedate:document.getElementById("releasedate").value,
        agelimit:document.getElementById("agelimit").value,
        runningtime:document.getElementById("runningtime").value


      
      });
      
      navigator.sendBeacon('http://127.0.0.1:5000/savedetails/', data);
      console.log(data);
    }
