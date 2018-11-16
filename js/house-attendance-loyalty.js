// function countMembers(partyName, countAll) {
//   let count = 0;
//   for (let i = 0; i < data.results[0].num_results; i++) {
//     let party = data.results[0].members[i].party;
//     if (countAll || party === partyName) count++;
//   }
//   return count;
// }

// function averageVotes(partyName, countAll) {
//   //create empty array for specific party votes
//   let votesArray = [];

//   //iterate over all data to find all party
//   for (let i = 0; i < data.results[0].num_results; i++) {
//     let party = data.results[0].members[i].party;

//     if (countAll || party === partyName) {
//       //loop over party to get the votes if the party is R, D or I
//       let v = data.results[0].members[i]["votes_with_party_pct"];
//       votesArray.push(v);
//     }
//   }
//   if (votesArray.length === 0) return 0.0;

//   // calculate average
//   let sum = 0.0;
//   for (let voteNum of votesArray) sum += voteNum;
//   return sum / votesArray.length;
// }

// //Party Loyalty Page for Senate and House
// //calculation for the 10 % percent limit of members;

// function get10percent(bottom, field) {
//   let sortedMembers = data.results[0].members.sort(
//     (x, y) => x[field] - y[field]
//   );

//   // Get min/max
//   let minValue = sortedMembers[0][field];
//   let maxValue = sortedMembers[sortedMembers.length - 1][field];

//   // Calculate the limit for 10%
//   let tenPerMembersArr = [];
//   if (bottom) {
//     // Get all the member's in the bottom 10%
//     let tenPercentLimit = minValue + ((maxValue - minValue) / 100) * 10;
//     for (let member of sortedMembers) {
//       if (member[field] <= tenPercentLimit) tenPerMembersArr.push(member);
//     }
//   } else {
//     // Get all the member`s in the top 10 %
//     let tenPercentLimit = maxValue - ((maxValue - minValue) / 100) * 10;
//     for (let member of sortedMembers) {
//       if (member[field] >= tenPercentLimit) tenPerMembersArr.push(member);
//     }
//   }

//   return tenPerMembersArr;
// }

// function get10percentLoyalty(bottom) {
//   return get10percent(bottom, "votes_with_party_pct");
// }

// function get10percentMissedVotesPercent(bottom) {
//   return get10percent(bottom, "missed_votes_pct");
// }

// function getTop10percentLoyalty() {
//   return get10percentLoyalty(false);
// }

// function getButtom10percentLoyalty() {
//   return get10percentLoyalty(true);
// }

// function getTop10percentAttendance() {
//   return get10percentMissedVotesPercent(true);
// }

// function getButtom10percentAttendance() {
//   return get10percentMissedVotesPercent(false);
// }

// /*
//   create first table for loyalty page
// */
// function populateStatisticsTable(statistics) {
//   let senateLoyalBody = document.getElementById("senate-statistics");

//   //first row
//   let row = document.createElement("tr");
//   let column = document.createElement("td");
//   column.innerHTML = "Democrats";
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.numberOfDemocrats;
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.averageVotesDemocrats;
//   row.appendChild(column);

//   senateLoyalBody.appendChild(row);

//   //second row
//   row = document.createElement("tr");
//   column = document.createElement("td");
//   column.innerHTML = "Republicans";
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.numberOfRepublicans;
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.averageVotesRepublicans;
//   row.appendChild(column);

//   senateLoyalBody.appendChild(row);

//   //third row
//   row = document.createElement("tr");
//   column = document.createElement("td");
//   column.innerHTML = "Independents";
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.numberOfIndependents;
//   row.appendChild(column);

//   column = document.createElement("td");
//   if (statistics.averageVotesIndependents !== 0) {
//     column.innerHTML = statistics.averageVotesIndependents;
//   } else {
//     column.innerHTML = "-";
//   }
//   row.appendChild(column);

//   senateLoyalBody.appendChild(row);

//   //fourth row

//   row = document.createElement("tr");
//   column = document.createElement("td");
//   column.innerHTML = "Total";
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.totalNumberOfMembers;
//   row.appendChild(column);

//   column = document.createElement("td");
//   column.innerHTML = statistics.averageVotesAll;
//   row.appendChild(column);

//   senateLoyalBody.appendChild(row);
// }

// function loyaltyBottomTable(statistics) {
//   let senateLoyalBody = document.getElementById("senate-bottom-loyalty");
//   if (!senateLoyalBody) return;

//   for (let m of statistics.leastLoyalMembers) {
//     let row = document.createElement("tr");

//     // first column - Name
//     let column = document.createElement("td");

//     let firstName = m.first_name;
//     let middleName = m.middle_name;
//     let lastName = m.last_name;
//     if (!middleName) middleName = "";

//     column.innerHTML = firstName + " " + middleName + " " + lastName;
//     row.appendChild(column);

//     //second column - No. Party Votes
//     let numberPartyVotes = Math.floor(
//       (m.votes_with_party_pct * m.total_votes) / 100
//     );
//     column = document.createElement("td");
//     column.innerHTML = numberPartyVotes;
//     row.appendChild(column);

//     //third column - % Party Votes
//     column = document.createElement("td");
//     column.innerHTML = m.votes_with_party_pct;
//     row.appendChild(column);

//     senateLoyalBody.appendChild(row);
//   }
// }

// function loyaltyTopTable(statistics) {
//   let senateLoyalBody = document.getElementById("senate-top-loyalty");
//   if (!senateLoyalBody) return;

//   for (let m of statistics.mostLoyalMembers) {
//     let row = document.createElement("tr");

//     // first column - Name
//     let column = document.createElement("td");

//     let firstName = m.first_name;
//     let middleName = m.middle_name;
//     let lastName = m.last_name;
//     if (!middleName) middleName = "";

//     column.innerHTML = firstName + " " + middleName + " " + lastName;
//     row.appendChild(column);

//     //second column - No. Party Votes
//     let numberPartyVotes = Math.floor(
//       (m.votes_with_party_pct * m.total_votes) / 100
//     );
//     column = document.createElement("td");
//     column.innerHTML = numberPartyVotes;
//     row.appendChild(column);

//     //third column - % Party Votes
//     column = document.createElement("td");
//     column.innerHTML = m.votes_with_party_pct;
//     row.appendChild(column);

//     senateLoyalBody.appendChild(row);
//   }
// }

// function attendanceBottomTable(statistics) {
//   let senateAttendanceBody = document.getElementById(
//     "senate-bottom-attendance"
//   );
//   if (!senateAttendanceBody) return;

//   for (let m of statistics.leastAttendanceMembers) {
//     let row = document.createElement("tr");
//     // first column - Name
//     let column = document.createElement("td");
//     let firstName = m.first_name;
//     let middleName = m.middle_name;
//     let lastName = m.last_name;
//     if (!middleName) middleName = "";
//     column.innerHTML = firstName + " " + middleName + " " + lastName;
//     row.appendChild(column);
//     //second column - No. Missed Votes
//     let numberMissedVotes = Math.floor(m.missed_votes);
//     column = document.createElement("td");
//     column.innerHTML = numberMissedVotes;
//     row.appendChild(column);
//     //third column - % Party Votes
//     column = document.createElement("td");
//     column.innerHTML = m.missed_votes_pct;
//     row.appendChild(column);
//     senateAttendanceBody.appendChild(row);
//   }
// }

// function attendanceTopTable(statistics) {
//   let senateAttendanceBody = document.getElementById("senate-top-attendance");
//   if (!senateAttendanceBody) return;

//   for (let m of statistics.mostAttendanceMembers) {
//     let row = document.createElement("tr");
//     // first column - Name
//     let column = document.createElement("td");
//     let firstName = m.first_name;
//     let middleName = m.middle_name;
//     let lastName = m.last_name;
//     if (!middleName) middleName = "";
//     column.innerHTML = firstName + " " + middleName + " " + lastName;
//     row.appendChild(column);
//     //second column - No. Missed Votes
//     let numberMissedVotes = Math.floor(m.missed_votes);
//     column = document.createElement("td");
//     column.innerHTML = numberMissedVotes;
//     row.appendChild(column);
//     //third column - % Party Votes
//     column = document.createElement("td");
//     column.innerHTML = m.missed_votes_pct;
//     row.appendChild(column);
//     senateAttendanceBody.appendChild(row);
//   }
// }

// let statistics = {
//   // Number of members
//   numberOfDemocrats: countMembers("D", false),
//   numberOfRepublicans: countMembers("R", false),
//   numberOfIndependents: countMembers("I", false),
//   totalNumberOfMembers: countMembers("", true),

//   // Votes Percentage
//   averageVotesDemocrats: Number(averageVotes("D", false).toFixed(2)),
//   averageVotesRepublicans: Number(averageVotes("R", false).toFixed(2)),
//   averageVotesIndependents: Number(averageVotes("I", false).toFixed(2)),
//   averageVotesAll: Number(averageVotes("", true).toFixed(2)),

//   // Loyalty
//   leastLoyalMembers: getButtom10percentLoyalty(),
//   mostLoyalMembers: getTop10percentLoyalty(),

//   // Attendance
//   leastAttendanceMembers: getButtom10percentAttendance(),
//   mostAttendanceMembers: getTop10percentAttendance()
// };

// // Shared table
// populateStatisticsTable(statistics);

// // Loyalty tables
// loyaltyBottomTable(statistics);
// loyaltyTopTable(statistics);

// // Attendance tables
// attendanceBottomTable(statistics);
// attendanceTopTable(statistics);

/* NOTE
1.the number of Democrats, Republicans and Independents - DONE!
2.how Democrats and Republicans compare, on average, for voting with their party - DONE!
3.which members most often do not vote with their party, which ones most often do vote with their party

// sort based on total_votes, from small to big or opposite (change position of x and y)
data.results[0].members.sort((x, y) => x.total_votes - y.total_votes) 


e.g. .sort((x, y) => x.total_votes - y.total_votes) is build-in
let sortedArrTotalVotesAsc = data.results[0].members.sort((x, y) => x.total_votes - y.total_votes)

4.which members have missed the most votes, which have missed the least

// countMembers("R", false)
// countMembers("D", false);
// countMembers("I", false);
// countMembers("", true);

Average of Votes: Republican, Democrat, Independence, All
// averageVotes("R", false);
// averageVotes("D", false);
// averageVotes("I", false);
// averageVotes("", true);

*/

/*
Number of members: Republican, Democrat, Independence, All
*/

/* NOTE
1.the number of Democrats, Republicans and Independents - DONE!
2.how Democrats and Republicans compare, on average, for voting with their party - DONE!
3.which members most often do not vote with their party, which ones most often do vote with their party

// sort based on total_votes, from small to big or opposite (change position of x and y)
data.results[0].members.sort((x, y) => x.total_votes - y.total_votes) 


e.g. .sort((x, y) => x.total_votes - y.total_votes) is build-in
let sortedArrTotalVotesAsc = data.results[0].members.sort((x, y) => x.total_votes - y.total_votes)

4.which members have missed the most votes, which have missed the least

// countMembers("R", false)
// countMembers("D", false);
// countMembers("I", false);
// countMembers("", true);

Average of Votes: Republican, Democrat, Independence, All
// averageVotes("R", false);
// averageVotes("D", false);
// averageVotes("I", false);
// averageVotes("", true);

*/

/*
Number of members: Republican, Democrat, Independence, All
*/

let url = "https://api.propublica.org/congress/v1/115/house/members.json";
let header = {
  "X-API-Key": "ZlZ25b3xtchqkU2LCzIvnUJKgXXev7Z71IxHvTM2"
};

fetch(url, { headers: header })
  .then(function(response) {
    if (response.ok) {
      console.log("Request succeeded: " + response.statusText);
      return response.json();
    }

    throw new Error(response.statusText);
  })
  .then(function(json) {
    console.log(json); // raw data

    let statistics = calculateStatistics(json);

    populateStatisticsTable(statistics);
    // Attendance tables
    attendanceBottomTable(statistics);
    attendanceTopTable(statistics);
    loyaltyBottomTable(statistics);
    loyaltyTopTable(statistics);
  })
  .catch(function(error) {
    console.log("Request failed: " + error.message);
  });

function countMembers(data, partyName, countAll) {
  let count = 0;
  for (let i = 0; i < data.results[0].num_results; i++) {
    let party = data.results[0].members[i].party;
    if (countAll || party === partyName) count++;
  }
  return count;
}

function averageVotes(data, partyName, countAll) {
  //create empty array for specific party votes
  let votesArray = [];

  //iterate over all data to find all party
  for (let i = 0; i < data.results[0].num_results; i++) {
    let party = data.results[0].members[i].party;
    // if the party is the specific party
    if (countAll || party === partyName) {
      //loop over party to get the votes if the party is R, D or I
      let v = data.results[0].members[i]["votes_with_party_pct"];
      // console.log("this should be votes only for the republicans" + v);

      if (v === undefined) v = 0.0;

      votesArray.push(v);
    }
  }
  if (votesArray.length === 0) return 0.0;
  for (let votes of votesArray) {
    if (votes === undefined) votes = 0.0;
  }

  // calculate average
  let sum = 0.0;
  for (let voteNum of votesArray) sum += voteNum;
  console.log(votesArray);
  return sum / votesArray.length;
}

//Party Loyalty Page for Senate and House
//calculation for the 10 % percent limit of members;

function get10percent(data, bottom, field) {
  let sortedMembers = data.results[0].members.sort(
    (x, y) => x[field] - y[field]
  );

  // Get min/max
  let minValue = sortedMembers[0][field];
  let maxValue = sortedMembers[sortedMembers.length - 1][field];

  // Calculate the limit for 10%
  let tenPerMembersArr = [];
  if (bottom) {
    // Get all the member's in the bottom 10%
    let tenPercentLimit = minValue + ((maxValue - minValue) / 100) * 10;
    for (let member of sortedMembers) {
      if (member[field] <= tenPercentLimit) tenPerMembersArr.push(member);
    }
  } else {
    // Get all the member`s in the top 10 %
    let tenPercentLimit = maxValue - ((maxValue - minValue) / 100) * 10;
    for (let member of sortedMembers) {
      if (member[field] >= tenPercentLimit) tenPerMembersArr.push(member);
    }
  }

  return tenPerMembersArr;
}

function get10percentLoyalty(data, bottom) {
  return get10percent(data, bottom, "votes_with_party_pct");
}

function get10percentMissedVotesPercent(data, bottom) {
  return get10percent(data, bottom, "missed_votes_pct");
}

function getTop10percentLoyalty(data) {
  return get10percentLoyalty(data, false);
}

function getButtom10percentLoyalty(data) {
  return get10percentLoyalty(data, true);
}

function getTop10percentAttendance(data) {
  return get10percentMissedVotesPercent(data, true);
}

function getButtom10percentAttendance(data) {
  return get10percentMissedVotesPercent(data, false);
}

/*
  create first table for loyalty page
*/
function populateStatisticsTable(statistics) {
  let senateLoyalBody = document.getElementById("senate-statistics");

  //first row
  let row = document.createElement("tr");
  let column = document.createElement("td");
  column.innerHTML = "Democrats";
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.numberOfDemocrats;
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.averageVotesDemocrats;
  row.appendChild(column);

  senateLoyalBody.appendChild(row);

  //second row
  row = document.createElement("tr");
  column = document.createElement("td");
  column.innerHTML = "Republicans";
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.numberOfRepublicans;
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.averageVotesRepublicans;
  row.appendChild(column);

  senateLoyalBody.appendChild(row);

  //third row
  row = document.createElement("tr");
  column = document.createElement("td");
  column.innerHTML = "Independents";
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.numberOfIndependents;
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.averageVotesIndependents;
  row.appendChild(column);

  senateLoyalBody.appendChild(row);

  //fourth row

  row = document.createElement("tr");
  column = document.createElement("td");
  column.innerHTML = "Total";
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.totalNumberOfMembers;
  row.appendChild(column);

  column = document.createElement("td");
  column.innerHTML = statistics.averageVotesAll;
  row.appendChild(column);

  senateLoyalBody.appendChild(row);
}

function loyaltyBottomTable(statistics) {
  let senateLoyalBody = document.getElementById("senate-bottom-loyalty");
  if (!senateLoyalBody) return;

  for (let m of statistics.leastLoyalMembers) {
    let row = document.createElement("tr");

    // first column - Name
    let column = document.createElement("td");

    let firstName = m.first_name;
    let middleName = m.middle_name;
    let lastName = m.last_name;
    if (!middleName) middleName = "";

    column.innerHTML = firstName + " " + middleName + " " + lastName;
    row.appendChild(column);

    //second column - No. Party Votes
    let numberPartyVotes = Math.floor(
      (m.votes_with_party_pct * m.total_votes) / 100
    );
    column = document.createElement("td");
    column.innerHTML = numberPartyVotes;
    row.appendChild(column);

    //third column - % Party Votes
    column = document.createElement("td");
    column.innerHTML = m.votes_with_party_pct;
    row.appendChild(column);

    senateLoyalBody.appendChild(row);
  }
}

function loyaltyTopTable(statistics) {
  let senateLoyalBody = document.getElementById("senate-top-loyalty");
  if (!senateLoyalBody) return;

  for (let m of statistics.mostLoyalMembers) {
    let row = document.createElement("tr");

    // first column - Name
    let column = document.createElement("td");

    let firstName = m.first_name;
    let middleName = m.middle_name;
    let lastName = m.last_name;
    if (!middleName) middleName = "";

    column.innerHTML = firstName + " " + middleName + " " + lastName;
    row.appendChild(column);

    //second column - No. Party Votes
    let numberPartyVotes = Math.floor(
      (m.votes_with_party_pct * m.total_votes) / 100
    );
    column = document.createElement("td");
    column.innerHTML = numberPartyVotes;
    row.appendChild(column);

    //third column - % Party Votes
    column = document.createElement("td");
    column.innerHTML = m.votes_with_party_pct;
    row.appendChild(column);

    senateLoyalBody.appendChild(row);
  }
}

function attendanceBottomTable(statistics) {
  let senateAttendanceBody = document.getElementById(
    "senate-bottom-attendance"
  );
  if (!senateAttendanceBody) return;

  for (let m of statistics.leastAttendanceMembers) {
    let row = document.createElement("tr");
    // first column - Name
    let column = document.createElement("td");
    let firstName = m.first_name;
    let middleName = m.middle_name;
    let lastName = m.last_name;
    if (!middleName) middleName = "";
    column.innerHTML = firstName + " " + middleName + " " + lastName;
    row.appendChild(column);
    //second column - No. Missed Votes
    let numberMissedVotes = Math.floor(m.missed_votes);
    column = document.createElement("td");
    column.innerHTML = numberMissedVotes;
    row.appendChild(column);
    //third column - % Party Votes
    column = document.createElement("td");
    column.innerHTML = m.missed_votes_pct;
    row.appendChild(column);
    senateAttendanceBody.appendChild(row);
  }
}

function attendanceTopTable(statistics) {
  let senateAttendanceBody = document.getElementById("senate-top-attendance");
  if (!senateAttendanceBody) return;

  for (let m of statistics.mostAttendanceMembers) {
    let row = document.createElement("tr");
    // first column - Name
    let column = document.createElement("td");
    let firstName = m.first_name;
    let middleName = m.middle_name;
    let lastName = m.last_name;
    if (!middleName) middleName = "";
    column.innerHTML = firstName + " " + middleName + " " + lastName;
    row.appendChild(column);
    //second column - No. Missed Votes
    let numberMissedVotes = Math.floor(m.missed_votes);
    column = document.createElement("td");
    column.innerHTML = numberMissedVotes;
    row.appendChild(column);
    //third column - % Party Votes
    column = document.createElement("td");
    column.innerHTML = m.missed_votes_pct;
    row.appendChild(column);
    senateAttendanceBody.appendChild(row);
  }
}

function calculateStatistics(data) {
  let statistics = {
    // Number of members
    numberOfDemocrats: countMembers(data, "D", false),
    numberOfRepublicans: countMembers(data, "R", false),
    numberOfIndependents: countMembers(data, "I", false),
    totalNumberOfMembers: countMembers(data, "", true),

    // Votes Percentage
    averageVotesDemocrats: Number(averageVotes(data, "D", false).toFixed(2)),
    averageVotesRepublicans: Number(averageVotes(data, "R", false).toFixed(2)),
    averageVotesIndependents: Number(averageVotes(data, "I", false).toFixed(2)),
    averageVotesAll: Number(averageVotes(data, "", true).toFixed(2)),

    // Loyalty
    leastLoyalMembers: getButtom10percentLoyalty(data),
    mostLoyalMembers: getTop10percentLoyalty(data),

    // Attendance
    leastAttendanceMembers: getButtom10percentAttendance(data),
    mostAttendanceMembers: getTop10percentAttendance(data)
  };
  return statistics;
}

// // Loyalty tables
// loyaltyBottomTable(statistics);
// loyaltyTopTable(statistics);

// // Attendance tables
// attendanceBottomTable(statistics);
// attendanceTopTable(statistics);
