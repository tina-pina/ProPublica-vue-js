/* NOTE

// countMembers("R", false)
// countMembers("D", false);
// countMembers("I", false);
// countMembers("", true);

Average of Votes: Republican, Democrat, Independence, All
// averageVotes("R", false);
// averageVotes("D", false);
// averageVotes("I", false);
// averageVotes("", true);

/*
Number of members: Republican, Democrat, Independence, All
*/

var app = new Vue({
  el: "#app",
  data() {
    return {
      firstTableStatistics: {},
      secondTableStatisticsAttendance: [],
      thirdTableStatisticsAttendance: [],
      secondTableStatisticsLoyalty: [],
      thirdTableStatisticsLoyalty: []
    };
  },

  methods: {
    countMembers(data, partyName, countAll) {
      let count = 0;
      for (let i = 0; i < data.results[0].num_results; i++) {
        let party = data.results[0].members[i].party;
        if (countAll || party === partyName) count++;
      }
      return count;
    },

    averageVotes(data, partyName, countAll) {
      //create empty array for specific party votes
      let votesArray = [];

      //iterate over all data to find all party
      for (let i = 0; i < data.results[0].num_results; i++) {
        let party = data.results[0].members[i].party;
        // if the party is the specific party
        if (countAll || party === partyName) {
          //loop over party to get the votes if the party is R, D or I
          let v = data.results[0].members[i]["votes_with_party_pct"];

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
      return sum / votesArray.length;
    },

    getTop10percent(data, field) {
      let sortedMembers = data.results[0].members
        .sort((x, y) => x[field] - y[field])
        .filter(m => m[field] !== 0);

      let tenPerMembersArr = sortedMembers.slice(
        sortedMembers.length - Math.floor(sortedMembers.length / 10),
        sortedMembers.length
      );

      // // Get min/max
      // //start with first Member of sorted array
      // let minValue = sortedMembers[0][field];
      // let maxValue = sortedMembers[sortedMembers.length - 1][field];
      // let difference = maxValue - minValue;

      // // Calculate the limit for 10%
      // let tenPerMembersArr = [];
      // // Get all the member`s in the top 10 %
      // let tenPercentLimit = maxValue - difference / 10;
      // for (let member of sortedMembers) {
      //   if (member[field] >= tenPercentLimit) tenPerMembersArr.push(member);
      // }
      return tenPerMembersArr.sort((x, y) => x[field] - y[field]);
    },

    getBottom10percent(data, field) {
      let sortedMembers = data.results[0].members
        .sort((x, y) => x[field] - y[field])
        .filter(m => m[field] !== 0);

      let tenPerMembersArr = sortedMembers.slice(
        0,
        Math.floor(sortedMembers.length / 10)
      );

      // // Get min/max
      // let minValue = sortedMembers[0][field];
      // let maxValue = sortedMembers[sortedMembers.length - 1][field];
      // let difference = maxValue - minValue;

      // // Calculate the limit for 10%
      // let tenPerMembersArr = [];
      // // Get all the member's in the bottom 10%
      // let tenPercentLimit = minValue + difference / 10;
      // for (let member of sortedMembers) {
      //   if (member[field] <= tenPercentLimit) tenPerMembersArr.push(member);
      // }
      return tenPerMembersArr.sort((x, y) => x[field] - y[field]);
    },

    getFirstTableStat(json) {
      return {
        Democrats: {
          count: this.countMembers(json, "D", false),
          averageVote: Number(this.averageVotes(json, "D", false).toFixed(2))
        },
        Republicans: {
          count: this.countMembers(json, "R", false),
          averageVote: Number(this.averageVotes(json, "R", false).toFixed(2))
        },
        Independents: {
          count: this.countMembers(json, "I", false),
          averageVote: Number(this.averageVotes(json, "I", false).toFixed(2))
        },
        Total: {
          count: this.countMembers(json, "", true),
          averageVote: Number(this.averageVotes(json, "", true).toFixed(2))
        }
      };
    },
    getBottom10percentAttendance(data) {
      let newArr = [];
      //people who missed most votes will show up on top of the array
      let arr = this.getTop10percent(data, "missed_votes_pct");

      for (let m of arr) {
        let computed_votes = Math.floor(
          Number((m.missed_votes_pct * m.total_votes) / 100)
        );

        if (!m.middle_name) m.middle_name = "";
        let full_name = m.first_name + " " + m.middle_name + " " + m.last_name;

        let newObj = {
          full_name: full_name,
          computed_votes: computed_votes,
          missed_votes_pct: m.missed_votes_pct
        };

        newArr.push(newObj);
      }
      return newArr;
    },

    getTop10percentAttendance(data) {
      let newArr = [];
      //people who missed the least votes will show up on the bottom when sorted

      let arr = this.getBottom10percent(data, "missed_votes_pct");

      for (let m of arr) {
        let computed_votes = Math.floor(
          Number((m.missed_votes_pct * m.total_votes) / 100)
        );

        if (!m.middle_name) m.middle_name = "";
        let full_name = m.first_name + " " + m.middle_name + " " + m.last_name;

        let newObj = {
          full_name: full_name,
          computed_votes: computed_votes,
          missed_votes_pct: m.missed_votes_pct
        };

        newArr.push(newObj);
      }
      return newArr;
    },
    getBottom10percentLoyalty(data) {
      let newArr = [];
      let arr = this.getBottom10percent(data, "votes_with_party_pct");
      for (let m of arr) {
        let computed_votes = Math.floor(
          Number((m.votes_with_party_pct * m.total_votes) / 100)
        );
        if (!m.middle_name) m.middle_name = "";
        let full_name = m.first_name + " " + m.middle_name + " " + m.last_name;

        let newObj = {
          full_name: full_name,
          computed_votes: computed_votes,
          votes_with_party_pct: m.votes_with_party_pct
        };

        newArr.push(newObj);
      }
      return newArr;
    },
    getTop10percentLoyalty(data) {
      let newArr = [];
      let arr = this.getTop10percent(data, "votes_with_party_pct");
      for (let m of arr) {
        let computed_votes = Math.floor(
          Number((m.votes_with_party_pct * m.total_votes) / 100)
        );
        if (!m.middle_name) m.middle_name = "";
        let full_name = m.first_name + " " + m.middle_name + " " + m.last_name;

        let newObj = {
          full_name: full_name,
          computed_votes: computed_votes,
          votes_with_party_pct: m.votes_with_party_pct
        };

        newArr.push(newObj);
      }
      return newArr;
    }
  },

  created: function() {
    // Alias the component instance as `vm`, so that we
    // can access it inside the promise function
    let url = "https://api.propublica.org/congress/v1/113/senate/members.json";
    let header = { "X-API-Key": "ZlZ25b3xtchqkU2LCzIvnUJKgXXev7Z71IxHvTM2" };

    fetch(url, { headers: header })
      .then(function(response) {
        if (response.ok) {
          console.log("Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(data => {
        this.firstTableStatistics = this.getFirstTableStat(data);
        this.secondTableStatisticsAttendance = this.getBottom10percentAttendance(
          data
        );
        this.thirdTableStatisticsAttendance = this.getTop10percentAttendance(
          data
        );
        this.secondTableStatisticsLoyalty = this.getBottom10percentLoyalty(
          data
        );
        this.thirdTableStatisticsLoyalty = this.getTop10percentLoyalty(data);
      })
      .catch(function(error) {
        console.log("Request failed: " + error.message);
      });
  }
});
