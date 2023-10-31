const GYM_LEVEL = 14;
const STOP_LEVEL = 17;
const GYM_BREAKPOINTS = [2, 6, 20];

var stopData = {};

function addSurveyMarkData(type, number) {
  var url = `https://portal.spatial.nsw.gov.au/server/rest/services/SurveyMarkGDA2020/MapServer/find?searchText=${number}&contains=true&searchFields=marknumber&sr=&layers=0&layerDefs=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&dynamicLayers=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnUnformattedValues=false&returnFieldName=false&datumTransformations=&layerParameterValues=&mapRangeValues=&layerRangeValues=&clipping=&spatialFilter=&f=pjson`;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        let response = JSON.parse(xhr.responseText);
        let marker = response.results.find(marker => marker.attributes.marktype.toLowerCase() == type.toLowerCase());
        let gymCell = S2.getKeyFromCoordsAndLevel(marker.geometry.y, marker.geometry.x, GYM_LEVEL);
        let stopCell = S2.getKeyFromCoordsAndLevel(marker.geometry.y, marker.geometry.x, STOP_LEVEL);
        if (stopData.hasOwnProperty(gymCell)) {
          if (stopData[gymCell].hasOwnProperty(stopCell)) {
            stopData[gymCell][stopCell].push({name: `${type.toUpperCase()}${number}`, existing: false, gym: false});
          } else {
            stopData[gymCell][stopCell] = [{name: `${type.toUpperCase()}${number}`, existing: false, gym: false}];
          }
        } else {
          stopData[gymCell] = {};
          stopData[gymCell][stopCell] = [{name: `${type.toUpperCase()}${number}`, existing: false, gym: false}];
        }
        updateResponse();
    }};

  xhr.send();
}

function plan() {
  stopData = {};
  updateResponse();

  //first deal with existing stops because they are easy
  let existingStops = [];
  let existingStop;
  $('#existingStopsTable tr').each(function(){
      $(this).find('td').each(function(index){
        let value = $(this).children('input').eq(0).val();
        switch (index) {
          case 0:
            existingStop = {};
            existingStop.name = value;
            break;
          case 1:
            existingStop.lat = value;
            break;
          case 2:
            existingStop.long = value;
            break;
          case 3:
            existingStop.gym = $(this).children('input').eq(0).is(":checked");
            existingStops.push(existingStop);
            break;
        }
      });
  });
  let gymCell;
  let stopCell;
  for (let stop of existingStops) {
    gymCell = S2.getKeyFromCoordsAndLevel(stop.lat, stop.long, GYM_LEVEL);
    stopCell = S2.getKeyFromCoordsAndLevel(stop.lat, stop.long, STOP_LEVEL);
    if (stopData.hasOwnProperty(gymCell)) { //if it already exists
      if (stopData[gymCell].hasOwnProperty(stopCell)) { //if it already exists
        stopData[gymCell][stopCell].push({name: stop.name, existing: true, gym: stop.gym});
      } else {
        stopData[gymCell][stopCell] = [{name: stop.name, existing: true, gym: stop.gym}];
      }
    } else {
      stopData[gymCell] = {};
      stopData[gymCell][stopCell] = [{name: stop.name, existing: true, gym: stop.gym}];
    }
  }

  //now start with server markers which will asynchrnously change the output as the responses come in
  let marker;
  $('#surveyMarksTable tr').each(function(){
    $(this).find('td').each(function(index){
      let value = $(this).children('input').eq(0).val();
      switch (index) {
        case 0:
          marker = {};
          marker.type = $(this).children('select').eq(0).val();
          break;
        case 1:
          marker.number = $(this).children('input').eq(0).val();
          console.log("Going to try adding ${marker.type}, ${marker.number}");
          addSurveyMarkData(marker.type, marker.number);
          break;
        }
      });
  });

  $("#key").show();
  updateResponse();
}

function load() {
  $("#addSurveyMark")[0].onclick = addSurveyMark;
  $("#addExistingStop")[0].onclick = addExistingStop;
  document.getElementById("existingStopsFile").addEventListener('change', handleExistingStopsUploaded, false);
  document.getElementById("surveyMarksFile").addEventListener('change', handleSurveyMarksUploaded, false);
  $("#key").hide();
}

function addSurveyMark() {
  let table = $("#surveyMarksTable")[0];
  let row = table.insertRow(-1);
  
  let cell1 = row.insertCell(0);
  let select = document.createElement("select");
  select.name = "type";
  
  let option1 = document.createElement("option");
  option1.value = "ss";
  option1.innerHTML = "SS";

  let option2 = document.createElement("option");
  option2.value = "pm";
  option2.innerHTML = "PM";

  select.add(option1);
  select.add(option2);

  cell1.appendChild(select);

  let cell2 = row.insertCell(1);
  let input = document.createElement("input");
  input.type = "number";
  cell2.appendChild(input);

  let cell3 = row.insertCell(2);
  let button = document.createElement("button");
  button.innerHTML = "X";
  button.onclick = deleteOwnRow;
  cell3.appendChild(button);
}

function deleteOwnRow(event) {
  var td = event.target.parentNode; 
  var tr = td.parentNode;
  tr.parentNode.removeChild(tr);
}

function addExistingStop() {
  let table = $("#existingStopsTable")[0];
  let row = table.insertRow(-1);
  
  let cell1 = row.insertCell(0);
  let input1 = document.createElement("input");
  input1.type = "text";
  cell1.appendChild(input1);

  let cell2 = row.insertCell(1);
  let input2 = document.createElement("input");
  input2.type = "number";
  cell2.appendChild(input2);

  let cell3 = row.insertCell(2);
  let input3 = document.createElement("input");
  input3.type = "number";
  cell3.appendChild(input3);
  
  let cell4 = row.insertCell(3);
  let input4 = document.createElement("input");
  input4.type = "checkbox";
  cell4.appendChild(input4);
  
  let cell5 = row.insertCell(4);
  let button = document.createElement("button");
  button.innerHTML = "X";
  button.onclick = deleteOwnRow;
  cell5.appendChild(button);
}

function updateResponse() {
  $("#output").html(""); //first clear
  let l14div;
  let l17div;
  let stopDiv;
  for (let gymCell in stopData) {
    l14div = document.createElement("div");
    l14div.classList.add("L14");
    let count = countStops(stopData[gymCell]);
    l14div.innerHTML = `L14 Cell ${gymCell} has ${count} stop${count == 1 ? "" : "s"} inside it; ${stopsNeededForNextGym(count)} more for a new gym:`;
    for (let stopCell in stopData[gymCell]) {
      l17div = document.createElement("div");
      l17div.classList.add("L17");
      l17div.innerHTML = `L17 Cell ${stopCell} contains:`;
      for (let stop of stopData[gymCell][stopCell]) {
        stopDiv = document.createElement("div");
        stopDiv.classList.add("stop");
        if (stop.existing) {
          stopDiv.classList.add("existing");
          if (stop.gym) {
            stopDiv.classList.add("gym");
          }
        } else {
          stopDiv.classList.add("potential");
        }
        stopDiv.innerHTML = stop.name;
        l17div.appendChild(stopDiv);
      }
      l14div.appendChild(l17div);
    }
    $("#output").append(l14div);
  }
}

function countStops(gymCellObj) {
  let total = 0;
  for (let stopCell of Object.keys(gymCellObj)) {
    total += gymCellObj[stopCell].filter(x => x.existing == true).length;
  }
  return total;
}

function stopsNeededForNextGym(stopsCount) {
  for (let breakpoint of GYM_BREAKPOINTS) {
    if (stopsCount < breakpoint) {
      return breakpoint - stopsCount;
    }
  }
  return "∞";
}

function handleExistingStopsUploaded(evt) {
  let files = evt.target.files; // FileList object

  // use the 1st file from the list
  let f = files[0];
  
  let reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
      return function(e) {
        let result = e.target.result;
        let existingStop;
        for (let csvRow of result.split("\r\n")) {
          let values = csvRow.split(",");
          existingStop = {name: values[0], lat: values[1], long: values[2], gym: values[3] == "true"};

          let table = $("#existingStopsTable")[0];
          let row = table.insertRow(-1);
          
          let cell1 = row.insertCell(0);
          let input1 = document.createElement("input");
          input1.type = "text";
          input1.value = existingStop.name;
          cell1.appendChild(input1);
        
          let cell2 = row.insertCell(1);
          let input2 = document.createElement("input");
          input2.type = "number";
          input2.value = existingStop.lat;
          cell2.appendChild(input2);
        
          let cell3 = row.insertCell(2);
          let input3 = document.createElement("input");
          input3.type = "number";
          input3.value = existingStop.long;
          cell3.appendChild(input3);
          
          let cell4 = row.insertCell(3);
          let input4 = document.createElement("input");
          input4.type = "checkbox";
          input4.checked = existingStop.gym;
          cell4.appendChild(input4);
          
          let cell5 = row.insertCell(4);
          let button = document.createElement("button");
          button.innerHTML = "X";
          button.onclick = deleteOwnRow;
          cell5.appendChild(button);
        }
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
}

function handleSurveyMarksUploaded(evt) {
  let files = evt.target.files; // FileList object

  // use the 1st file from the list
  let f = files[0];
  
  let reader = new FileReader();

  // Closure to capture the file information.
  reader.onload = (function(theFile) {
      return function(e) {
        let result = e.target.result;
        let surveyMark;
        for (let csvRow of result.split("\r\n")) {
          surveyMark = {type: csvRow.substring(0, 2), number: csvRow.substring(2)};

          let table = $("#surveyMarksTable")[0];
          let row = table.insertRow(-1);

          let cell1 = row.insertCell(0);
          let select = document.createElement("select");
          select.name = "type";

          let option1 = document.createElement("option");
          option1.value = "ss";
          option1.innerHTML = "SS";

          let option2 = document.createElement("option");
          option2.value = "pm";
          option2.innerHTML = "PM";

          select.add(option1);
          select.add(option2);

          select.value = surveyMark.type.toLowerCase();
          cell1.appendChild(select);

          let cell2 = row.insertCell(1);
          let input = document.createElement("input");
          input.type = "number";
          input.value = surveyMark.number;
          cell2.appendChild(input);

          let cell3 = row.insertCell(2);
          let button = document.createElement("button");
          button.innerHTML = "X";
          button.onclick = deleteOwnRow;
          cell3.appendChild(button);
        }
      };
    })(f);

    // Read in the image file as a data URL.
    reader.readAsText(f);
}