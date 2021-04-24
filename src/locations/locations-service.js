const knex = require('knex')


const LocationsService = {
    getAllLocations(knex) {
        return knex.select("*").from("locations");
      },
}

module.exports = LocationsService;