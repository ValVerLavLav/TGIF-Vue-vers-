// Task 2.1 - Access and Display Public Data

// document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2)
// Question: Where to put it?

const dataHouTab = dataHou.results[0].members;


// Task 2.2 - Filters
var getDemocrats = document.getElementById("displayDemocrats");
var getRepublicans = document.getElementById("displayRepublicans");
var getIndependents = document.getElementById("displayIndependents");

var getStateOfOrigin = document.getElementById("stateOfOrigin");
// get DD selector
// Question to Pol: What did you mean by 'get DD selector'?

getDemocrats.addEventListener('click', function() {
    genHouTab(filterMembers())
});
getRepublicans.addEventListener('click', function() {
    genHouTab(filterMembers());
});
getIndependents.addEventListener('click', function() {
    genHouTab(filterMembers());
});


getStateOfOrigin.addEventListener('change', function () {
    genHouTab(filterMembers());
});
//Add change ability to the DD selector
// Question to Pol: What did you mean by change ability? 



function filterMembers () {
  var getMembers = [];
  for (var i = 0; i < dataHouTab.length; i++) {
    if (getStateOfOrigin.value == dataHouTab[i].state || getStateOfOrigin.value == "") {
      
      if (getDemocrats.checked && dataHouTab[i].party === "D") {
          getMembers.push(dataHouTab[i]);
        };
      if (getRepublicans.checked && dataHouTab[i].party === "R") {
          getMembers.push(dataHouTab[i]);
        };
      if (getIndependents.checked && dataHouTab[i].party === "I") {
          getMembers.push(dataHouTab[i]);
      };
    };
  };
  return getMembers;
// return getMembers.length > 0 ? getMembers : null;
};
filterMembers();





function genHouTab(getMembers) {
    var houTab = document.getElementById("house-data");
    houTab.innerHTML = "";

    // if (dataSenTab != null) {
    // Question: What's the point of this loop?  As I defined the data, why should the function return no array?
        for (i = 0; i < getMembers.length; i++) {
            var rowHouTab = houTab.insertRow(0);
    
            var cellHouLastName = rowHouTab.insertCell(0);
            cellHouLastName.innerHTML = getMembers[i].last_name;
            
            var cellHouFirstName = rowHouTab.insertCell(1);
            cellHouFirstName.innerHTML = getMembers[i].first_name;
                        
            var cellHouMiddleName = rowHouTab.insertCell(2);
            if (getMembers[i].middle_name === null) {
                cellHouMiddleName.innerHTML = "";
            } else {
                cellHouMiddleName.innerHTML = getMembers[i].middle_name;
            };
            // Question : how to merge the three cells into one?

            var cellHouParty = rowHouTab.insertCell(3);
            cellHouParty.innerHTML = getMembers[i].party;
    
            var cellHouState = rowHouTab.insertCell(4);
            cellHouState.innerHTML = getMembers[i].state;
    
            var cellHouSeniority = rowHouTab.insertCell(5);
            cellHouSeniority.innerHTML = getMembers[i].seniority;
    
            var cellHouConsistencyWithParty = rowHouTab.insertCell(6);
            cellHouConsistencyWithParty.innerHTML = getMembers[i].votes_with_party_pct + " %";    
        // } else {
            // No Array, so show a warning
            // Request: How to code this?
        };
    // };
};