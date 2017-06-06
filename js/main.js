document.addEventListener("DOMContentLoaded", function(event) {
  displayDate();
  displayAccordion();
  createTable();
  // Question 2
  createDiagram();
  //Question 1
  $('#textContentDisplay')[0].textContent = 'Output: <a href="https://google.com">google</a>'
  $('#innerHtmlDisplay')[0].innerHTML = 'Output: <a href="https://google.com">google</a>'
  var c = document.getElementsByTagName("BUTTON")[0];
  $('#nodeValueDisplay')[0].innerHTML = 'Output: '+ c.childNodes[0].nodeValue;
  // Question 6
  if(localStorage.track) {
    displayMiddleSection();
  } else {
    $('#displayUserTrack').html("<h1> Please add your favourite Song </h1>");
  }
  $('#middleSongSection').on("click", 'tr td a', function() {
    countDown($(this).attr('id'));
  });
  recentPlayList();
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

function createTable() {
    var myTableDiv = document.getElementById("sudokuDynamicTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 4; i++) {
      var tr = document.createElement('TR');
      tableBody.appendChild(tr);

      for (var j = 0; j < 4; j++) {
        var td = document.createElement('TD');
        var inputTag = document.createElement('input');
        inputTag.type = "number";
        inputTag.min = 1;
        inputTag.max = 4;
        td.appendChild(inputTag);
        tr.appendChild(td);
      }
    }
    myTableDiv.appendChild(table);
}

function solveSudoku() {
  if(validateSudokuForm()) {
    document.getElementsByClassName('display-error-messages')[0].style.display = 'none';
    var game = constructArray();
    var validValues = ['1', '2', '3', '4'];
    for(var i=0; i<4; i++) {
      var currentRowValues = []
      var currentColValues = []
      for(var j=0; j<4; j++) {
        currentRowValues.push(game[i][j])
        currentColValues.push(game[j][i])
        if(j === 3) {
          var result = currentRowValues.concat(currentColValues).filter(Number); 

          result = jQuery.unique(result);
          var validInsertElements = array_diff(result, validValues)
          console.log('________________');
          console.log(validInsertElements)
          for(var x=0; x<4; x++) {
            if ( game[i][x] === ''){
              element = validInsertElements.pop()
              game[i][x] = element;
            }
          }
        }
      }
     
      
    }
    console.log(game[0]);
  }
}

function array_diff(array1, array2){
    var difference = $.grep(array1, function(el) { return $.inArray(el,array2) < 0});
    return difference.concat($.grep(array2, function(el) { return $.inArray(el,array1) < 0}));;
}

function subMatrix(i, j, game) {
  sectRow = Math.floor( i / 2 );
  sectCol = Math.floor( j / 2 );
  console.log(sectRow);
  console.log(sectCol);
}


function constructArray() {
  var sudokuArray = [];
  var elements = document.getElementById('sudokuDynamicTable').getElementsByTagName('tr');
  for(var i=0; i < elements.length; i++) {
    var currentRow = []
    tableData= elements[i].getElementsByTagName('input')
    for(var j=0; j < 4; j++){
      currentRow.push(tableData[j].value)
    }
    sudokuArray.push(currentRow);
    }
  return sudokuArray;
}

function validateSudokuForm() {
  var inputValues = document.getElementById('sudokuDynamicTable').getElementsByTagName('input');
  var flag = true;
  var invalid = [];
  for(var i=0; i < inputValues.length; i++) {
    inputValues[i].className = '';
    if(inputValues[i].value > 4 || inputValues[i].value < 0  || inputValues[i].value === '0') {
      console.log('onle one time');
      flag = false;
      invalid.push(i);
    }
  }
  if (!flag) {
    for(var i=0; i < invalid.length; i++) {
      var j = invalid[i]
      inputValues[j].className = 'errors';
    }
    document.getElementsByClassName('display-error-messages')[0].style.display = 'block';
  }
  return flag
}

function createDiagram() {
  createDiv('browser-window', 'createDiagram');
  createDiv('block1', 'browser-window');
  createDiv('block2', 'block1');
  createDiv('block3', 'block1');
  $('.block2').append('<input type="checkbox" class="toggle-checkbox" />');
  $('.block2').append('<br>')
  $('.block2').append('<input type="checkbox" class="toggle-checkbox" />');
  $('.block3').append('<input type="checkbox" class="toggle-checkbox" />');
  $('.block3').append('<br>')
  $('.block3').append('<input type="checkbox" class="toggle-checkbox" />');
}

function createDiv(divClassName, appendClassName) {
  var wDiv = document.createElement('div');
  wDiv.className = divClassName
  wDiv.setAttribute('onClick', 'colorChange()');
  document.getElementsByClassName(appendClassName)[0].appendChild(wDiv);

}

function colorChange(divClassName) {
  window.event.stopPropagation();
  divClassName = window.event.target.className;
  if(divClassName === 'browser-window'){
    $('.browser-window')[0].style.backgroundColor = randColor();
  } else if(divClassName.split(/\s+/)[0] === 'block2') {
    $('.block2').toggleClass('color-blue')
    $('.block3 .toggle-checkbox').prop('checked', false);
    $('.block2 .toggle-checkbox').prop('checked', true);
  } else if(divClassName.split(/\s+/)[0]=== 'block3') {
    $('.block3').toggleClass('color-yellow')
    $('.block2 .toggle-checkbox').prop('checked', false);
    $('.block3 .toggle-checkbox').prop('checked', true);
  } else if(divClassName === 'block1') {
    $('.toggle-checkbox').prop('checked', true);
  }
}

$('.toggle-checkbox').click(function(event){
  event.stopPropagation();
});

function randColor() {
  return '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
}

$('#songFormSubmit').submit(function(event){
  var songList = JSON.parse(localStorage.getItem('track')) || [];
  event.preventDefault();
  var name = $('#songFormSubmit input[name="songName"]').val();
  var theme = $('#songFormSubmit input[name="songTheme"]').val();
  var song1 = new song(name,theme,0,0)
  songList.push(song1);
  localStorage.setItem('track', JSON.stringify(songList));
  clearText();

  displayMiddleSection();
});

function displayMiddleSection(recentBool){
  if (recentBool) {
    userTracks = JSON.parse(localStorage.getItem("track"));
    var headers = ['Song Name', 'Song Theme', 'Play Count', 'Last played'];
    userTracks.sort(function (a, b) {
      return a.playCount < b.playCount;
    });
    userTracks = userTracks.slice(0,4);
  } else {
    userTracks = JSON.parse(localStorage.getItem("track"));
    var headers = ['Song Name', 'Song Theme', 'Play Count', 'Last played', 'Play Song'];
  }
  var table = document.createElement('table');
  var tr = document.createElement('tr');
  jQuery.each(headers, function(index, header) {
    var th = document.createElement('th');
    th.appendChild(document.createTextNode(header));
    tr.appendChild(th);
  });
  table.appendChild(tr);
  jQuery.each( userTracks, function( i, obj ) {
    var tr = document.createElement('tr');
    var td1 = document.createElement('td')
    $.each( obj, function( key, value ) {
      var td = document.createElement('td');
      td.appendChild(document.createTextNode(value));
      tr.appendChild(td);
      table.appendChild(tr);
    });
    if (!recentBool) {
      aTag = document.createElement('a')
      aTag.setAttribute('id', 'playSound' + i);
      aTag.innerHTML = "Play Song" ;
      aTag.href = '#';
      td1.appendChild(aTag);
      tr.appendChild(td1);
    }
  });
  if (recentBool) {
    $('#recentTrack').html(table);
  } else {
    $('#displayUserTrack').html(table);
  }
}

function song(name, theme, playCount, lastTimePlayed) {
  this.name = name;
  this.theme = theme;
  this.playCount = playCount;
  this.lastTimePlayed = lastTimePlayed;
}

function clearText()
{
  $('#songFormSubmit input[name="songName"]')[0].value = '';
  $('#songFormSubmit input[name="songTheme"]')[0].value = '';
}

function countDown(elementId){
  var playButton = document.getElementById(elementId);
  var counter = 5;
  var newElement = document.createElement("p");
  newElement.innerHTML = "Song will be end in 5 seconds.";
  var id;
  playButton.closest('td').replaceChild(newElement, playButton);

  id = setInterval(function() {
      counter--;
      if(counter < 0) {
          newElement.parentNode.replaceChild(playButton, newElement);
          clearInterval(id);
          updateTrack(elementId, Date());
      } else {
          newElement.innerHTML = "Song will be end in " + counter.toString() + " seconds.";
      }
  }, 1000);
}


function updateTrack(elementId, playDate) {
  var songName = $('#' + elementId).parent().siblings()[0].textContent;
  var songTheme = $('#' + elementId).parent().siblings()[1].textContent;
  var userTracks = JSON.parse(localStorage.getItem("track"));
  for (var i = 0; i < userTracks.length; i++) {
     if(songName === userTracks[i].name && songTheme === userTracks[i].theme ) {
         userTracks[i].playCount += 1;  //add ne
         userTracks[i].lastTimePlayed =  Date(); 
         break;  //exit loop since you found the person
     }
  }
  localStorage.setItem("track", JSON.stringify(userTracks));
  displayMiddleSection();
  recentPlayList();
}

function recentPlayList() {
  displayMiddleSection(true);
}