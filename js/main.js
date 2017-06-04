document.addEventListener("DOMContentLoaded", function(event) {
  displayDate();
  displayAccordion();
  localStorage.lasttimeopen = Date();
});

function clickCounter() {
  if (typeof(Storage) !== "undefined") {
  	if(localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
  	} else {
  	  localStorage.clickcount = 1
  	}
  	document.getElementById('countResult').innerHTML = 'You have clicked the button '+localStorage.clickcount+' time\'s'
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
  }
}

function displayDate() {
  if (typeof(Storage) !== "undefined") {
  	if(!localStorage.lasttimeopen) {
  	  localStorage.lasttimeopen = Date();
  	}
  	document.getElementById("displayDate").innerHTML = localStorage.lasttimeopen;
  } else {
    document.getElementById("displayDate").innerHTML = "Sorry, your browser does not support web storage...";

  }

}

function displayAccordion() {
	var acc = document.getElementsByClassName("accordion");
	for ( var i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    }
	}

}