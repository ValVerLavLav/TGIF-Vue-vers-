// Task 3 - Calculate and Display Statistics
// Question to Pol: according to the instructions, am I not suppose to have made a JSON file?



// 1. Create Senate HTML File and JSON Statistics Object
var statistics = [
  {
  'Number_of_Democrats': 0,
  'Number_of_Republicans': 0,
  'Number_of_Independents': 0,
  'Number_of_Members': 0
  },
  {
  'Average_Percentage_Democrats_voted_loyal_with_the_party': 0,
  'Average_Percentage_Republicans_voted_loyal_with_the_party': 0,
  'Average_Percentage_Independents_voted_loyal_with_the_party': 0,
  'Average_Percentage_Members_voted_loyal_with_the_party': 0
  },
  {
  'Ten_Percent_Disloyal': [],
  'Ten_Percent_Loyal': [],
  'Ten_Percent_Least_Attending': [],
  'Ten_Percent_Most_Attending': [],
  }
];



let dataSenLoyAtt = [];



// 2. Get the Numbers of Members in Each Party
var demSenLst = [];
var repSenLst = [];
var indSenLst = [];

var demSenLoySum = 0;
var repSenLoySum = 0;
var indSenLoySum = 0;

var tenPerDisSenLst = [];
var tenPerLoySenLst = [];

var tenPerLeaAttSenLst = [];
var tenPerMosAttSenLst = [];

var senPLandAApp = new Vue({
  el: '#senPLandAVueApp',
  // Senate Data App

  data: {
      senators: []
  },

  methods: {

  },

  computed: {

  }
});


algorithm();

async function algorithm() {
  dataSenLoyAtt =
  await fetch('https://api.propublica.org/congress/v1/115/senate/members.json', {
    method: 'GET',
    headers: {
      'X-API-Key': 'hM5ZRK0mQfi7NHmXxHtClVnYSuuCMyaAtw7WiSLQ'
    }
  })

  .then(response => response.json())
  .then(function (dataSen) {
    // disTab();



    // senPLandAApp.dataSenTab = senators;



    return (dataSen.results[0].members);
  })








  .catch(err => console.error(err))

  getTenPerParLoySen(dataSenLoyAtt);
  getTenPerAttSen(dataSenLoyAtt);
  getSenByParty();
  genSenAtAGla();
    
  if (/Loyalty/.test(window.location.href)) {
    genTenPerDisSenLst(dataSenLoyAtt);
    genTenPerLoySenLst(dataSenLoyAtt);
  } else {
    genTenPerLeaEngSenLst(dataSenLoyAtt);
    genTenPerMosEngSenLst(dataSenLoyAtt); 
  };
};



function getSenByParty() {

  for (i = 0; i < dataSenLoyAtt.length; i++) {
    if (dataSenLoyAtt[i].party === "D") {
      demSenLst.push(dataSenLoyAtt[i]);
      demSenLoySum += dataSenLoyAtt[i].votes_with_party_pct;
    }
  
    if (dataSenLoyAtt[i].party === "R") { 
      repSenLst.push(dataSenLoyAtt[i]);
      repSenLoySum += dataSenLoyAtt[i].votes_with_party_pct;
    }
        
    if (dataSenLoyAtt[i].party === "I") {
      indSenLst.push(dataSenLoyAtt[i]);
      indSenLoySum += dataSenLoyAtt[i].votes_with_party_pct;
    }
  
  };  
var numDemSen = demSenLst.length;
var numRepSen = repSenLst.length;
var numIndSen = indSenLst.length;
var numSen = dataSenLoyAtt.length;



// 3. [Loyalty 1 -] Calculate the Average 'Votes with Party' for Each Party
var demSenLoy = demSenLoySum / numDemSen;
var repSenLoy = repSenLoySum / numRepSen;
var indSenLoy = indSenLoySum / numIndSen;
var senLoy = (demSenLoySum + repSenLoySum + indSenLoySum) / numSen;

statistics[0]['Number_of_Democrats'] = numDemSen;
statistics[0]['Number_of_Republicans'] = numRepSen;
statistics[0]['Number_of_Independents'] = numIndSen;
statistics[0]['Number_of_Members'] = numSen;

statistics[1]['Average_Percentage_Democrats_voted_loyal_with_the_party'] = demSenLoy;
statistics[1]['Average_Percentage_Republicans_voted_loyal_with_the_party'] = repSenLoy;
statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'] = indSenLoy;
statistics[1]['Average_Percentage_Members_voted_loyal_with_the_party'] = senLoy;
};

function getTenPerParLoySen (dataSenLoyAtt) {
  var numSen = dataSenLoyAtt.length;
  dataSenLoyAtt.sort(function(a, b) {
    return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
  });

  var tenPerDisMinVal = dataSenLoyAtt[10].votes_with_party_pct;
  while (tenPerDisSenLst.length < (numSen/10)) {
    for (i = 0; dataSenLoyAtt[i].votes_with_party_pct >= tenPerDisMinVal; i++) {
      tenPerDisSenLst.push(dataSenLoyAtt[i]);
    }
  };



// ...and the ones who most often voted for the party
  dataSenLoyAtt.sort(function(a, b) {
    return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
  });

  var tenPerLoyMaxVal = dataSenLoyAtt[10].votes_with_party_pct;
  while (tenPerLoySenLst.length < (numSen/10)) {
    for (i = 0; dataSenLoyAtt[i].votes_with_party_pct <= tenPerLoyMaxVal; i++) {
      tenPerLoySenLst.push(dataSenLoyAtt[i]);
    }
  };
statistics[2]['Ten_Percent_Disloyal'] = tenPerDisSenLst;
statistics[2]['Ten_Percent_Loyal'] = tenPerLoySenLst;
};

function getTenPerAttSen (dataSenLoyAtt) {
  var numSen = dataSenLoyAtt.length;
  dataSenLoyAtt.sort(function(a, b) {
    return parseFloat(b.missed_votes) - parseFloat(a.missed_votes);
  });


  var tenPerLeaAttMinVal = dataSenLoyAtt[10].missed_votes;
  while (tenPerLeaAttSenLst.length < (numSen/10)) {
    for (i = 0; dataSenLoyAtt[i].missed_votes >= tenPerLeaAttMinVal; i++) {
      tenPerLeaAttSenLst.push(dataSenLoyAtt[i]);
    };
  };



// ...and the ones who most often voted for the party
  dataSenLoyAtt.sort(function(a, b) {
    return parseFloat(a.missed_votes) - parseFloat(b.missed_votes);
  });

  var tenPerMosMaxVal = dataSenLoyAtt[10].missed_votes;
  while (tenPerMosAttSenLst.length < (numSen/10)) {
    for (i = 0; dataSenLoyAtt[i].missed_votes <= tenPerMosMaxVal; i++) {
      tenPerMosAttSenLst.push(dataSenLoyAtt[i]);
    }
  };
statistics[2]['Ten_Percent_Least_Attending'] = tenPerLeaAttSenLst;
statistics[2]['Ten_Percent_Most_Attending'] = tenPerMosAttSenLst;
};

// 6. Create HTML Table to Display the Statistics
// Call your code in the Senate Party Loyalty HTML file and use console.log to check your answers on different test data.
function genSenAtAGla () {
  var senAtAGlaTab = document.getElementById("senAtAGla");
  senAtAGlaTab.innerHTML = "";

  var rowDemSen = senAtAGlaTab.insertRow(0);

  var cellDemSen1 = rowDemSen.insertCell(0);
  cellDemSen1.innerHTML = 'Democrats';
  var cellDemSen2 = rowDemSen.insertCell(1);
  cellDemSen2.innerHTML = statistics[0]['Number_of_Democrats'];
  var cellDemSen3 = rowDemSen.insertCell(2);
  cellDemSen3.innerHTML = statistics[1]['Average_Percentage_Democrats_voted_loyal_with_the_party'] + " %";


  var rowRepSen = senAtAGlaTab.insertRow(1);

  var cellRepSen1 = rowRepSen.insertCell(0);
  cellRepSen1.innerHTML = 'Republicans';
  var cellRepSen2 = rowRepSen.insertCell(1);
  cellRepSen2.innerHTML = statistics[0]['Number_of_Republicans'];
  var cellRepSen3 = rowRepSen.insertCell(2);
  cellRepSen3.innerHTML = statistics[1]['Average_Percentage_Republicans_voted_loyal_with_the_party'] + " %";


  var rowIndSen = senAtAGlaTab.insertRow(2);

  var cellIndSen1 = rowIndSen.insertCell(0);
  cellIndSen1.innerHTML = 'Independents';
  var cellIndSen2 = rowIndSen.insertCell(1);
  cellIndSen2.innerHTML = statistics[0]['Number_of_Independents'];
  var cellIndSen3 = rowIndSen.insertCell(2);
  cellIndSen3.innerHTML = statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'] + " %";


  var rowTotSen = senAtAGlaTab.insertRow(3);

  var cellTotSen1 = rowTotSen.insertCell(0);
  cellTotSen1.innerHTML = 'Total';
  var cellTotSen2 = rowTotSen.insertCell(1);
  cellTotSen2.innerHTML = statistics[0]['Number_of_Members'];
  var cellTotSen3 = rowTotSen.insertCell(2);
  cellTotSen3.innerHTML = statistics[1]['Average_Percentage_Members_voted_loyal_with_the_party'] + " %";

};

function genTenPerDisSenLst () {
  var mosDisSenTab = document.getElementById("senLeastLoyal");
  mosDisSenTab.innerHTML = "";
  
  for (i = 0; i < tenPerDisSenLst.length; i++) {
      var rowDisSenTab = mosDisSenTab.insertRow(0);
  
    var cellDisSenLastName = rowDisSenTab.insertCell(0);
    cellDisSenLastName.innerHTML = tenPerDisSenLst[i].last_name;
    
    var cellDisSenFirstName = rowDisSenTab.insertCell(1);
    cellDisSenFirstName.innerHTML = tenPerDisSenLst[i].first_name;
                
    var cellDisSenMiddleName = rowDisSenTab.insertCell(2);
    if (tenPerDisSenLst[i].middle_name === null) {
      cellDisSenMiddleName.innerHTML = "";
    } else {
      cellDisSenMiddleName.innerHTML = tenPerDisSenLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellDisSenTotVot = rowDisSenTab.insertCell(3);
    cellDisSenTotVot.innerHTML = tenPerDisSenLst[i].total_votes;
  
    var cellDisSenLoyVot = rowDisSenTab.insertCell(4);
    cellDisSenLoyVot.innerHTML = tenPerDisSenLst[i].votes_with_party_pct + " %";
  };
};

function genTenPerLoySenLst () {
  var mosLoySenTab = document.getElementById("senMostLoyal");
  mosLoySenTab.innerHTML = "";
  
  for (i = 0; i < tenPerLoySenLst.length; i++) {
    var rowLoySenTab = mosLoySenTab.insertRow(0);
  
    var cellLoySenLastName = rowLoySenTab.insertCell(0);
    cellLoySenLastName.innerHTML = tenPerLoySenLst[i].last_name;
    
    var cellLoySenFirstName = rowLoySenTab.insertCell(1);
    cellLoySenFirstName.innerHTML = tenPerLoySenLst[i].first_name;
                
    var cellLoySenMiddleName = rowLoySenTab.insertCell(2);
    if (tenPerLoySenLst[i].middle_name === null) {
      cellLoySenMiddleName.innerHTML = "";
    } else {
      cellLoySenMiddleName.innerHTML = tenPerLoySenLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellLoySenTotVot = rowLoySenTab.insertCell(3);
    cellLoySenTotVot.innerHTML = tenPerLoySenLst[i].total_votes;
  
    var cellLoySenLoyVot = rowLoySenTab.insertCell(4);
    cellLoySenLoyVot.innerHTML = tenPerLoySenLst[i].votes_with_party_pct + " %";
  };
};

function genTenPerLeaEngSenLst () {
  var leaEngSenTab = document.getElementById("leaEngSen");
  leaEngSenTab.innerHTML = "";
  
  for (i = 0; i < tenPerLeaAttSenLst.length; i++) {
    var rowLeaEngSenTab = leaEngSenTab.insertRow(0);
  
    var cellLeaEngSenLastName = rowLeaEngSenTab.insertCell(0);
    cellLeaEngSenLastName.innerHTML = tenPerLeaAttSenLst[i].last_name;
    
    var cellLeaEngSenFirstName = rowLeaEngSenTab.insertCell(1);
    cellLeaEngSenFirstName.innerHTML = tenPerLeaAttSenLst[i].first_name;
                
    var cellLeaEngSenMiddleName = rowLeaEngSenTab.insertCell(2);
    if (tenPerLeaAttSenLst[i].middle_name === null) {
      cellLeaEngSenMiddleName.innerHTML = "";
    } else {
      cellLeaEngSenMiddleName.innerHTML = tenPerLeaAttSenLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellLeaEngSenTotVot = rowLeaEngSenTab.insertCell(3);
    cellLeaEngSenTotVot.innerHTML = tenPerLeaAttSenLst[i].total_votes;
  
    var cellLeaEngSenLoyVot = rowLeaEngSenTab.insertCell(4);
    cellLeaEngSenLoyVot.innerHTML = tenPerLeaAttSenLst[i].votes_with_party_pct + " %";
  };
};

function genTenPerMosEngSenLst () {
  var mosEngSenTab = document.getElementById("mosEngSen");
  mosEngSenTab.innerHTML = "";
  
  for (i = 0; i < tenPerMosAttSenLst.length; i++) {
    var rowMosEngSenTab = mosEngSenTab.insertRow(0);
  
    var cellMosEngSenLastName = rowMosEngSenTab.insertCell(0);
    cellMosEngSenLastName.innerHTML = tenPerMosAttSenLst[i].last_name;
    
    var cellMosEngSenFirstName = rowMosEngSenTab.insertCell(1);
    cellMosEngSenFirstName.innerHTML = tenPerMosAttSenLst[i].first_name;
                
    var cellMosEngSenMiddleName = rowMosEngSenTab.insertCell(2);
    if (tenPerMosAttSenLst[i].middle_name === null) {
      cellMosEngSenMiddleName.innerHTML = "";
    } else {
      cellMosEngSenMiddleName.innerHTML = tenPerMosAttSenLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellMosEngSenTotVot = rowMosEngSenTab.insertCell(3);
    cellMosEngSenTotVot.innerHTML = tenPerMosAttSenLst[i].total_votes;
  
    var cellMosEngSenLoyVot = rowMosEngSenTab.insertCell(4);
    cellMosEngSenLoyVot.innerHTML = tenPerMosAttSenLst[i].votes_with_party_pct + " %";
  };
};



// .fetch().
// then(function(data)=>
// /some function/
// document.getElementById("loader").style.display = none). //hide loader when data arrives
// then().
// catch(err)



// window.addEventListener("load", function () {
//   const loader = document.getElementById("loader");
//   document.body.removeChild(loader);
// });


// window.addEventListener("load", function () {
//   const loader = document.getElementById(".loader");
//   loader.className += " hidden";
// });



// function hideLoad() {
//   var load = document.getElementById("loader");
//   load.style.display = "none";
// };