function makeMarkersArray() {
    return [
        {
            id: 1,
            user_id: 1, 
            name: "Buck",
            notes: "this is a note",
            latitude: "39.780899",
            longitude: "-105.0273788",
            timeadded: '2021-05-11T15:49:45.329Z',
        },
        {
            id: 2,
            user_id: 1,
            name: "Alex",
            notes: "this is also a note", 
            latitude: "39.778888",
            longitude: "-104.8721969",
            timeadded: '2021-05-11T15:49:45.329Z',
    
        },
        {
            id: 3,
            user_id: 1, 
            name: "Mike",
            notes: "this is another note",
            latitude: "39.714322",
            longitude: "-104.949101259",
            timeadded: '2021-05-11T15:49:45.329Z',   
        },
    ];
  }

  
  module.exports = {
    makeMarkersArray
  };