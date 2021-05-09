const express = require("express");
const path = require("path");
const xss = require("xss");
const MarkersService = require("./markers-service");
const markersRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth")


const serializeMarker= (marker) => ({
  id: marker.id,
  title: xss(marker.title),
  modified: marker.modified,
  notes: xss(marker.notes),
});

markersRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");
    MarkersService.getAllMarkerss(knexInstance)
      .then((markers) => {
        res.json(markers.map(serializeMarker));
      })
      .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { notes, modified, user_id, member, longitude, latitude } = req.body;
    const newLocation = { notes, title, modified, user_id, member, longitude, latitude };
    for (const field of ["user_id", "modified", "member", "latitude", "longitude"]) {
      if (!req.body[field]) {
        return res.status(400).send({
          error: { message: `'${field}' is required` },
        });
      }
    }
    markersService.insertMarker(req.app.get("db"), newMarker)
      .then((marker) => {
        res
          .status(201)
          .marker(`/markers/${marker.id}`)
          .json(serializeMarker(marker));
      })
      .catch(next);
  });


  markersRouter
  .route("/:marker_id")
  .all((req, res, next) => {
    const { marker_id } = req.params;
    MarkersService.getById(req.app.get("db"), marker_id)
      .then((marker) => {
        if (!marker) {
          return res.status(404).json({
            error: { message: `Marker not Found` },
          })
        }
        res.marker = marker;
        next();
      })
      .catch(next)
  })


  .get((req, res) => [
    res.json(serializeMarker(res.marker))
  ])


module.exports = markersRouter;
