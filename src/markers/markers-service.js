const knex = require('knex')


const MarkersService = {
    getAllMarkers(knex) {
        return knex.select("*").from("markers");
      },
      insertMarker(knex, newLocation){
        return knex
        .insert(newLocation)
        .into('markers')
        .returning('*')
        .then(rows => {
          return rows[0]
        })
      },
      getById(knex, id) {
        return knex.from("markers").select("*").where("id", id).first();
      },
      deleteMarker(knex, id) {
        return knex("markers").where({ id }).delete();
      },
      updateMarker(knex, id, newMarkerFields) {
        return knex("markers").where({ id }).update(newMarkerFields);
      },
}

module.exports = MarkersService;