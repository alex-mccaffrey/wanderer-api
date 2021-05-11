const knex = require('knex')


const MarkersService = {
      insertMarker(knex, newMarker){
        return knex
        .insert(newMarker)
        .into('markers')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
      },
      getMarkersByUserId(knex, user_id) {
        return knex.from("markers").select("*").where("user_id", user_id);
      },
}

module.exports = MarkersService;