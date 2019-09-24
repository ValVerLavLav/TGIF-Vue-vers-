// Task 3 - Calculate and Display Statistics
// Question to Pol: according to the instructions, am I not suppose to have made a JSON file?



// 1. Create House HTML File and JSON Statistics Object
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

let dataCgmLoyAtt = [];


// 2. Get the Numbers of Members in Each Party
var demCgmLst = [];
var repCgmLst = [];
var indCgmLst = [];

var demCgmLoySum = 0;
var repCgmLoySum = 0;
var indCgmLoySum = 0;

var tenPerDisCgmLst = [];
var tenPerLoyCgmLst = [];

var tenPerLeaAttCgmLst = [];
var tenPerMosAttCgmLst = [];


algorithm();

async function algorithm() {
  dataCgmLoyAtt =
    await fetch('https://api.propublica.org/congress/v1/115/house/members.json', {
      method: 'GET',
      headers: {
        'X-API-Key': 'hM5ZRK0mQfi7NHmXxHtClVnYSuuCMyaAtw7WiSLQ'
      }
    })
    .then(response => response.json())
    .then(dataHou => dataHou.results[0].members
      // loaderInvisible()
    )
    // .then(loaderInvisible())
    
      //  display() {
      //    console.log("It works!");
      //  }
    .catch(err => console.error(err))

  getTenPerParLoyCgm(dataCgmLoyAtt);
  getTenPerAttCgm(dataCgmLoyAtt);
  getCgmByParty();
  genHouAtAGla();
    
  if (/Loyalty/.test(window.location.href)) {
    genTenPerDisCgmLst(dataCgmLoyAtt);
    genTenPerLoyCgmLst(dataCgmLoyAtt);
  } else {
    genTenPerMosEngCgmLst (dataCgmLoyAtt); 
    genTenPerLeaEngCgmLst(dataCgmLoyAtt);
  };
};

function loaderInvisible(){
  (document.getElementById("loader").style.display="none")
};



function getCgmByParty() {
  for (i = 0; i < dataCgmLoyAtt.length; i++) {
    if (dataCgmLoyAtt[i].party === "D") {
      demCgmLst.push(dataCgmLoyAtt[i]);
      demCgmLoySum += dataCgmLoyAtt[i].votes_with_party_pct;
    }
  
    if (dataCgmLoyAtt[i].party === "R") { 
      repCgmLst.push(dataCgmLoyAtt[i]);
      repCgmLoySum += dataCgmLoyAtt[i].votes_with_party_pct;
    }
        
    if (dataCgmLoyAtt[i].party === "I") {
      indCgmLst.push(dataCgmLoyAtt[i]);
      indCgmLoySum += dataCgmLoyAtt[i].votes_with_party_pct;
    }
  
  };  
var numDemCgm = demCgmLst.length;
var numRepCgm = repCgmLst.length;
var numIndCgm = indCgmLst.length;
var numCgm = dataCgmLoyAtt.length;

// 3. [Loyalty 1 -] Calculate the Average 'Votes with Party' for Each Party
var demCgmLoy = demCgmLoySum / numDemCgm;
var repCgmLoy = repCgmLoySum / numRepCgm;
var indCgmLoy = indCgmLoySum / numIndCgm;
var cgmLoy = (demCgmLoySum + repCgmLoySum + indCgmLoySum) / numCgm;

statistics[0]['Number_of_Democrats'] = numDemCgm;
statistics[0]['Number_of_Republicans'] = numRepCgm;
statistics[0]['Number_of_Independents'] = numIndCgm;
statistics[0]['Number_of_Members'] = numCgm;

statistics[1]['Average_Percentage_Democrats_voted_loyal_with_the_party'] = demCgmLoy;
statistics[1]['Average_Percentage_Republicans_voted_loyal_with_the_party'] = repCgmLoy;
statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'] = indCgmLoy;
statistics[1]['Average_Percentage_Members_voted_loyal_with_the_party'] = cgmLoy;
};

function getTenPerParLoyCgm (dataCgmLoyAtt) {
  var numCgm = dataCgmLoyAtt.length;
  loaderInvisible();
  dataCgmLoyAtt.sort(function(a, b) {
    return parseFloat(b.votes_with_party_pct) - parseFloat(a.votes_with_party_pct);
  });

  var tenPerDisMinVal = dataCgmLoyAtt[10].votes_with_party_pct;
  while (tenPerDisCgmLst.length < (numCgm/10)) {
    for (i = 0; dataCgmLoyAtt[i].votes_with_party_pct >= tenPerDisMinVal; i++) {
      tenPerDisCgmLst.push(dataCgmLoyAtt[i]);
    }
  };



// ...and the ones who most often voted for the party
  dataCgmLoyAtt.sort(function(a, b) {
    return parseFloat(a.votes_with_party_pct) - parseFloat(b.votes_with_party_pct);
  });

  var tenPerLoyMaxVal = dataCgmLoyAtt[10].votes_with_party_pct;
  while (tenPerLoyCgmLst.length < (numCgm/10)) {
    for (i = 0; dataCgmLoyAtt[i].votes_with_party_pct <= tenPerLoyMaxVal; i++) {
      tenPerLoyCgmLst.push(dataCgmLoyAtt[i]);
    }
  };
statistics[2]['Ten_Percent_Disloyal'] = tenPerDisCgmLst;
statistics[2]['Ten_Percent_Loyal'] = tenPerLoyCgmLst;
};

// 5. Get the Remaining Statistics
function getTenPerAttCgm () {
  var numCgm = dataCgmLoyAtt.length;
  dataCgmLoyAtt.sort(function(a, b) {
    return parseFloat(b.missed_votes) - parseFloat(a.missed_votes);
  });


  var tenPerLeaAttMinVal = dataCgmLoyAtt[10].missed_votes;
  while (tenPerLeaAttCgmLst.length < (numCgm/10)) {
    for (i = 0; dataCgmLoyAtt[i].missed_votes >= tenPerLeaAttMinVal; i++) {
      tenPerLeaAttCgmLst.push(dataCgmLoyAtt[i]);
    };
  };



// ...and the ones who most often voted for the party
  dataCgmLoyAtt.sort(function(a, b) {
    return parseFloat(a.missed_votes) - parseFloat(b.missed_votes);
  });

  var tenPerMosMaxVal = dataCgmLoyAtt[10].missed_votes;
  while (tenPerMosAttCgmLst.length < (numCgm/10)) {
    for (i = 0; dataCgmLoyAtt[i].missed_votes <= tenPerMosMaxVal; i++) {
      tenPerMosAttCgmLst.push(dataCgmLoyAtt[i]);
    }
  };
statistics[2]['Ten_Percent_Least_Attending'] = tenPerLeaAttCgmLst;
statistics[2]['Ten_Percent_Most_Attending'] = tenPerMosAttCgmLst;
};

// 6. Create HTML Table to Display the Statistics
// Call your code in the Senate Party Loyalty HTML file and use console.log to check your answers on different test data.
function genHouAtAGla () {
  var houAtAGlaTab = document.getElementById("houAtAGla");
  houAtAGlaTab.innerHTML = "";

  var rowDemCgm = houAtAGlaTab.insertRow(0);

  var cellDemCgm1 = rowDemCgm.insertCell(0);
  cellDemCgm1.innerHTML = 'Democrats';
  var cellDemCgm2 = rowDemCgm.insertCell(1);
  cellDemCgm2.innerHTML = statistics[0]['Number_of_Democrats'];
  var cellDemCgm3 = rowDemCgm.insertCell(2);
  cellDemCgm3.innerHTML = statistics[1]['Average_Percentage_Democrats_voted_loyal_with_the_party'] + " %";


  var rowRepCgm = houAtAGlaTab.insertRow(1);

  var cellRepCgm1 = rowRepCgm.insertCell(0);
  cellRepCgm1.innerHTML = 'Republicans';
  var cellRepCgm2 = rowRepCgm.insertCell(1);
  cellRepCgm2.innerHTML = statistics[0]['Number_of_Republicans'];
  var cellRepCgm3 = rowRepCgm.insertCell(2);
  cellRepCgm3.innerHTML = statistics[1]['Average_Percentage_Republicans_voted_loyal_with_the_party'] + " %";


  var rowIndCgm = houAtAGlaTab.insertRow(2);

  var cellIndCgm1 = rowIndCgm.insertCell(0);
  cellIndCgm1.innerHTML = 'Independents';
  var cellIndCgm2 = rowIndCgm.insertCell(1);

  cellIndCgm2.innerHTML = statistics[0]['Number_of_Independent'];
  var cellIndCgm3 = rowIndCgm.insertCell(2);
  if (statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'] === null) {
    cellIndCgm3.innerHTML = "";
  } else {
    cellIndCgm3.innerHTML = statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'];
  };
  cellIndCgm3.innerHTML = statistics[1]['Average_Percentage_Independents_voted_loyal_with_the_party'] + " %";


  var rowTotCgm = houAtAGlaTab.insertRow(3);

  var cellTotCgm1 = rowTotCgm.insertCell(0);
  cellTotCgm1.innerHTML = 'Total';
  var cellTotCgm2 = rowTotCgm.insertCell(1);
  cellTotCgm2.innerHTML = statistics[0]['Number_of_Members'];
  var cellTotCgm3 = rowTotCgm.insertCell(2);
  cellTotCgm3.innerHTML = statistics[1]['Average_Percentage_Members_voted_loyal_with_the_party'] + " %";

};

function genTenPerDisCgmLst () {
    var mosDisCgmTab = document.getElementById("leastLoyalCgm");
    mosDisCgmTab.innerHTML = "";
    
    for (i = 0; i < tenPerDisCgmLst.length; i++) {
      var rowDisCgmTab = mosDisCgmTab.insertRow(0);
    
      var cellDisCgmLastName = rowDisCgmTab.insertCell(0);
      cellDisCgmLastName.innerHTML = tenPerDisCgmLst[i].last_name;
      
      var cellDisCgmFirstName = rowDisCgmTab.insertCell(1);
      cellDisCgmFirstName.innerHTML = tenPerDisCgmLst[i].first_name;
                  
      var cellDisCgmMiddleName = rowDisCgmTab.insertCell(2);
      if (tenPerDisCgmLst[i].middle_name === null) {
        cellDisCgmMiddleName.innerHTML = "";
      } else {
        cellDisCgmMiddleName.innerHTML = tenPerDisCgmLst[i].middle_name;
      };
      // Question : how to merge the three cells into one?
      
      var cellDisCgmTotVot = rowDisCgmTab.insertCell(3);
      cellDisCgmTotVot.innerHTML = tenPerDisCgmLst[i].total_votes;
    
      var cellDisCgmLoyVot = rowDisCgmTab.insertCell(4);
      cellDisCgmLoyVot.innerHTML = tenPerDisCgmLst[i].votes_with_party_pct + " %";
    };
};

function genTenPerLoyCgmLst () {
    var mosLoyCgmTab = document.getElementById("mostLoyalCgm");
    mosLoyCgmTab.innerHTML = "";
    
    for (i = 0; i < tenPerLoyCgmLst.length; i++) {
      var rowLoyCgmTab = mosLoyCgmTab.insertRow(0);
    
      var cellLoyCgmLastName = rowLoyCgmTab.insertCell(0);
      cellLoyCgmLastName.innerHTML = tenPerLoyCgmLst[i].last_name;
      
      var cellLoyCgmFirstName = rowLoyCgmTab.insertCell(1);
      cellLoyCgmFirstName.innerHTML = tenPerLoyCgmLst[i].first_name;
                  
      var cellLoyCgmMiddleName = rowLoyCgmTab.insertCell(2);
      if (tenPerLoyCgmLst[i].middle_name === null) {
        cellLoyCgmMiddleName.innerHTML = "";
      } else {
        cellLoyCgmMiddleName.innerHTML = tenPerLoyCgmLst[i].middle_name;
      };
      // Question : how to merge the three cells into one?
      
      var cellLoyCgmTotVot = rowLoyCgmTab.insertCell(3);
      cellLoyCgmTotVot.innerHTML = tenPerLoyCgmLst[i].total_votes;
    
      var cellLoyCgmLoyVot = rowLoyCgmTab.insertCell(4);
      cellLoyCgmLoyVot.innerHTML = tenPerLoyCgmLst[i].votes_with_party_pct + " %";
    };
};

function genTenPerMosEngCgmLst () {
  var mosEngCgmTab = document.getElementById("mosEngCgm");
  mosEngCgmTab.innerHTML = "";
  
  for (i = 0; i < tenPerMosAttCgmLst.length; i++) {
    var rowMosEngCgmTab = mosEngCgmTab.insertRow(0);
  
    var cellMosEngCgmLastName = rowMosEngCgmTab.insertCell(0);
    cellMosEngCgmLastName.innerHTML = tenPerMosAttCgmLst[i].last_name;
    
    var cellMosEngCgmFirstName = rowMosEngCgmTab.insertCell(1);
    cellMosEngCgmFirstName.innerHTML = tenPerMosAttCgmLst[i].first_name;
                
    var cellMosEngCgmMiddleName = rowMosEngCgmTab.insertCell(2);
    if (tenPerMosAttCgmLst[i].middle_name === null) {
      cellMosEngCgmMiddleName.innerHTML = "";
    } else {
      cellMosEngCgmMiddleName.innerHTML = tenPerMosAttCgmLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellMosEngCgmTotVot = rowMosEngCgmTab.insertCell(3);
    cellMosEngCgmTotVot.innerHTML = tenPerMosAttCgmLst[i].total_votes;
  
    var cellMosEngCgmLoyVot = rowMosEngCgmTab.insertCell(4);
    cellMosEngCgmLoyVot.innerHTML = tenPerMosAttCgmLst[i].votes_with_party_pct + " %";
  };
};
  
function genTenPerLeaEngCgmLst () {
  var leaEngCgmTab = document.getElementById("leaEngCgm");  
  leaEngCgmTab.innerHTML = "";
  
  for (i = 0; i < tenPerLeaAttCgmLst.length; i++) {
    var rowCgmEngSenTab = leaEngCgmTab.insertRow(0);
  
    var cellLeaEngCgmLastName = rowCgmEngSenTab.insertCell(0);
    cellLeaEngCgmLastName.innerHTML = tenPerLeaAttCgmLst[i].last_name;
    
    var cellLeaEngCgmFirstName = rowCgmEngSenTab.insertCell(1);
    cellLeaEngCgmFirstName.innerHTML = tenPerLeaAttCgmLst[i].first_name;
                
    var cellLeaEngCgmMiddleName = rowCgmEngSenTab.insertCell(2);
    if (tenPerLeaAttCgmLst[i].middle_name === null) {
      cellLeaEngCgmMiddleName.innerHTML = "";
    } else {
      cellLeaEngCgmMiddleName.innerHTML = tenPerLeaAttCgmLst[i].middle_name;
    };
    // Question : how to merge the three cells into one?
    
    var cellLeaEngCgmTotVot = rowCgmEngSenTab.insertCell(3);
    cellLeaEngCgmTotVot.innerHTML = tenPerLeaAttCgmLst[i].total_votes;
  
    var cellLeaEngCgmLoyVot = rowCgmEngSenTab.insertCell(4);
    cellLeaEngCgmLoyVot.innerHTML = tenPerLeaAttCgmLst[i].votes_with_party_pct + " %";
  };
};