const express = require("express");
const path = require("path");
const xss = require("xss");
const LocationsService = require("./locations-service");
const locationsRouter = express.Router();
const jsonParser = express.json();

const serializeLocation = (location) => ({
  id: location.id,
  title: xss(location.title),
  modified: location.modified,
  notes: xss(location.notes),
});

locationsRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    LocationsService.getAllLocations(knexInstance)
      .then((locations) => {
        res.json(locations.map(serializeLocation));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { notes, title, modified } = req.body;
    const newLocation = { notes, title, modified };
    for (const field of ["title", "modified", "notes"]) {
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    LocationsService.insertLocation(req.app.get("db"), newLocation)
      .then((location) => {
        res
          .status(201)
          .location(`/locations/${location.id}`)
          .json(serializeSession(location));
      })
      .catch(next);
  });

module.exports = locationsRouter;
