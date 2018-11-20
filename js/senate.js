var app = new Vue({
  el: "#senate",
  data() {
    return {
      originalMembers: [],
      members: [],

      checkFilter: ["R", "D", "I"],
      selectedState: ""
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
      // this.selectedState = this.distinctStatesArr;
      if (!this.members) return [];
      let filtered = this.members.filter(
        member =>
          this.checkFilter.includes(member.party) &&
          (this.selectedState === member.state ||
            this.selectedState === "All" ||
            this.selectedState === "")
      );
      this.members = filtered;
    }
  },
  created: function() {
    // Alias the component instance as `vm`, so that we
    // can access it inside the promise function
    let url = "https://api.propublica.org/congress/v1/115/senate/members.json";
    let header = { "X-API-Key": "ZlZ25b3xtchqkU2LCzIvnUJKgXXev7Z71IxHvTM2" };
    var vm = this;

    fetch(url, { headers: header })
      .then(function(response) {
        if (response.ok) {
          console.log("Request succeeded: " + response.statusText);
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(function(json) {
        vm.originalMembers = json.results[0].members;
        vm.members = json.results[0].members;
      })
      .catch(function(error) {
        console.log("Request failed: " + error.message);
      });
  }
});
