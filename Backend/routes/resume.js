const controller = require('../controller/resume')
const express = require('express');
const routes = express.Router();

routes.get("/", controller.getResume );

routes.get("/:id", controller.getResumeByID);

routes.post("/", controller.postResume);

routes.put("/:id", controller.putResumeByID);

routes.delete("/:id", controller.deleteResumeByID);

module.exports = routes;