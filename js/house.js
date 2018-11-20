var app = new Vue({
  el: "#house",
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
      let distinctStatesArr = [];
      let allStates = this.originalMembers.map(m => m.state);
      for (let s of allStates) {
        if (!distinctStatesArr.includes(s)) distinctStatesArr.push(s);
      }
      return distinctStatesArr.sort();
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
    let url = "https://api.propublica.org/congress/v1/115/house/members.json";
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
