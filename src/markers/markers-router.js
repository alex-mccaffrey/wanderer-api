const express = require("express");
const path = require("path");
const xss = require("xss");
const MarkersService = require("./markers-service");
const markersRouter = express.Router();
const jsonParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth")


const serializeMarker= (marker) => (
{
  id: marker.id,
  userId: xss(marker.user_id),
  name: marker.name,
  notes: xss(marker.notes),
  latitude: xss(marker.latitude),
  longitude: xss(marker.longitude),
  timeAdded: marker.timeadded
});

markersRouter
  .route("/")
  .get(requireAuth, (req, res, next) => {
    const knexInstance = req.app.get("db");
    const user_id = req.user.id;
    MarkersService.getMarkersByUserId(knexInstance, user_id)
      .then((markers) => {
        res.json(markers.map(serializeMarker));
      })
      .catch(next);
  })

  .post(requireAuth, (req, res, next) => {
    const { name, notes, latitude, longitude, timeAdded } = req.body;
    const newMarker = { name, notes, latitude, longitude, timeadded:timeAdded };

    for (const [key, value] of Object.entries(newMarker))
      if (value == null)
        return res.status(400).json({
          error: { message: `'${key}' is required` },
        });
    newMarker.user_id = req.user.id;
    MarkersService.insertMarker(req.app.get("db"), newMarker)
      .then((marker) => {
        res.status(201).json(serializeMarker(marker));
      })
      .catch(next);
  });


  // markersRouter
  // .route("/:marker_id")
  // .all((req, res, next) => {
  //   const { marker_id } = req.params;
  //   MarkersService.getById(req.app.get("db"), marker_id)
  //     .then((marker) => {
  //       if (!marker) {
  //         return res.status(404).json({
  //           error: { message: `Marker not Found` },
  //         })
  //       }
  //       res.marker = marker;
  //       next();
  //     })
  //     .catch(next)
  // })


  // .get((req, res) => [
  //   res.json(serializeMarker(res.marker))
  // ])


module.exports = markersRouter;
