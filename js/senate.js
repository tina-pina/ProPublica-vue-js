var app = new Vue({
  el: "#senate",
  data() {
    return {
      originalMembers: [],
      members: [],

      checkFilter: [],
      selectedState: "All"
    };
  },
  computed: {
    distinctStatesArr: function() {
      let distinctState = [];
      let allState = this.originalMembers.map(m => m.state);
      for (let s of allState) {
        if (!distinctState.includes(s)) distinctState.push(s);
      }
      distinctState = distinctState.sort();
      return distinctState;
    }
  },
  methods: {
    filterMembers: function(event) {
      this.members = this.originalMembers;
      if (!this.members) return [];
      let filtered = this.members.filter(
        member =>
          (this.checkFilter.length === 0 ||
            this.checkFilter.includes(member.party)) &&
          (this.selectedState === member.state ||
            this.selectedState === "All" ||
            this.selectedState === "")
      );
      this.members = filtered;
    }
  },
  created: function() {
    let url = "https://api.propublica.org/congress/v1/115/senate/members.json";
    let header = { "X-API-Key": "ZlZ25b3xtchqkU2LCzIvnUJKgXXev7Z71IxHvTM2" };

    fetch(url, { headers: header })
      .then(response => {
        if (response.ok) {
          console.log("Request succeeded: " + response.statusText);
          return response.json();
        }

        throw new Error(response.statusText);
      })
      .then(json => {
        this.originalMembers = json.results[0].members;
        this.members = json.results[0].members;
      })
      .catch(error => {
        console.log("Request failed: " + error.message);
      });
  }
});
