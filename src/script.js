const app = Vue.createApp({
  el: "#database-website",
  data() {
    return {
      searchInput: "",
      dataColumns: ["title", "topic", "views"],
      dataset:  [
       { title: 'Intro to HTML | Basics and Semantics', topic: "Web Development", views: 35 },
       { title: 'Styling Websites with CSS', topic: "Web Development", views: 27 },
       { title: 'Creating a Single Page Application with React.js', topic: "Web Development", views: 30 },
       { title: 'Intro to Python', topic: "General Programming", views: 63 },
       { title: 'Intro to JavaScript', topic: "General Programming", views: 51 },
       { title: 'Static HTML or SPA?', topic: "Web Development", views: 15},
       { title: 'Learning to Use Visual Code', topic: "General Programming", views: 48 },
       { title: 'Create a Website with Wordpress', topic: "Web Development", views: 31 }
     ]
    }
  }
}) 
 
app.component("database-website-component", {
  template: "#grid-template",
  props: {
    entries: Array,
    columns: Array,
    filterKey: String
  },
  data: function() {
    return {
      sortKey: ""
    }
  },
  computed: {
    filteredTitles: function() {
      const sortKey = this.sortKey
      
      const filterKey = this.filterKey && this.filterKey.toLowerCase()

      const order = this.sortColumns[sortKey] || 1

      let entries = this.entries

      if (filterKey) {
        entries = entries.filter(function(row) {
          return Object.keys(row).some(function(key) {
            return (
              String(row[key])
              .toLowerCase()
              .indexOf(filterKey) > -1
            )
          })
        })
      }
      if (sortKey) {
        entries = entries.slice().sort(function(x, y) {
          x = x[sortKey]
          y = y[sortKey]
          return (x === y ? 0 : x > y ? 1 : -1) * order
        })
      }
      return entries
    },
      sortColumns() {
        const sortedColumns = {}

        this.columns.forEach(function(key) {
          sortedColumns[key] = 1
        })

        return sortedColumns
      }
    },
    methods: {
      capitalize(inputString) {
        return inputString.charAt(0).toUpperCase() + inputString.slice(1)
      },
      sortBy(key) {
        this.sortKey = key
        this.sortColumns[key] = this.sortColumns[key] * -1
      }
    }
  })

app.mount("#database-website")