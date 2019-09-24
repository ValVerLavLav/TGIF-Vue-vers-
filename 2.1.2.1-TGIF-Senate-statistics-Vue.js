// Task 2.1 - Access and Display Public Data
let dataSenTab = [];


// Task 2.2 - Filters
var getDemocrats = document.getElementById("displayDemocrats");
var getRepublicans = document.getElementById("displayRepublicans");
var getIndependents = document.getElementById("displayIndependents");

var getStateOfOrigin = document.getElementById("stateOfOrigin");

// Vue();

var senDatApp = new Vue({
    el: '#senDatVueApp',
    // Senate Data App

    data: {
        senators: []
    },

    methods: {

    },

    computed: {

    }
});



// function disTab() {
//     // Display Tab
//     document.getElementById("TheLoader").style.display = "none";
//     document.getElementById("myDiv").style.display = "block";
// };



algSenSta();
// Algorithm Senate Statistics

async function algSenSta() {
    dataSenTab =
    await fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
        method: 'GET',
        headers: {
        'X-API-Key': 'hM5ZRK0mQfi7NHmXxHtClVnYSuuCMyaAtw7WiSLQ'
        }
        // console.log("It works!");



        // senDatApp.dataSenTab = senators;



    })

    .then(response => response.json())   
    .then(function (dataSen) {
        // disTab();
        return (dataSen.results[0].members);



        // senDatApp.dataSenTab = senators;
        // return (senators.results[0].members);

    })
    .catch(err => console.error(err))

    genSenTab(filterMembers());

    getDemocrats.addEventListener('click', function() {
        genSenTab(filterMembers());
    })
    
    getRepublicans.addEventListener('click', function() {
        genSenTab(filterMembers());
    })
    
    getIndependents.addEventListener('click', function() {
        genSenTab(filterMembers());
    })
    
    getStateOfOrigin.addEventListener('change', function () {
        genSenTab(filterMembers());
    })
    
    function filterMembers () {
        var getMembers = [];
        if (getDemocrats.checked == false && getRepublicans.checked == false && getIndependents.checked == false && getStateOfOrigin.value == "") {
            var getMembers = dataSenTab;
        } else {
            for (var i = 0; i < dataSenTab.length; i++) {
                if (getStateOfOrigin.value == dataSenTab[i].state || getStateOfOrigin.value == "") {
                    if (getDemocrats.checked && dataSenTab[i].party === "D") {
                        getMembers.push(dataSenTab[i]);
                        };
                        if (getRepublicans.checked && dataSenTab[i].party === "R") {
                        getMembers.push(dataSenTab[i]);
                        };
                        if (getIndependents.checked && dataSenTab[i].party === "ID") {
                        getMembers.push(dataSenTab[i]);
                        }; 
                        if (getDemocrats.checked == false && getRepublicans.checked == false && getIndependents.checked == false) {
                        getMembers.push(dataSenTab[i]);
                        };           
                };
            };
        };
        return getMembers;
    };
    
    function genSenTab(getMembers) {
        var senTab = document.getElementById("senate-data");
        senTab.innerHTML = "";
        for (j = 0; j < getMembers.length; j++) {
            var rowSenTab = senTab.insertRow(0);
            var cgmMidNam = "";
            if (getMembers[j].middle_name !== null) {
                cgmMidNam = ", " + getMembers[j].middle_name;
            };
    
            var cellSenFullName = rowSenTab.insertCell(0);
            cellSenFullName.innerHTML = (getMembers[j].last_name + ", " + getMembers[j].first_name + cgmMidNam).link(getMembers[j].url);
    
            var cellSenParty = rowSenTab.insertCell(1);
            cellSenParty.innerHTML = getMembers[j].party;
    
            var cellSenState = rowSenTab.insertCell(2);
            cellSenState.innerHTML = getMembers[j].state;
    
            var cellSenSeniority = rowSenTab.insertCell(3);
            cellSenSeniority.innerHTML = getMembers[j].seniority;
    
            var cellSenConsistencyWithParty = rowSenTab.insertCell(4);
            cellSenConsistencyWithParty.innerHTML = getMembers[j].votes_with_party_pct + " %";    
        };
    };
};