const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    const { techs, latitude, longitude } = req.query;

    const techarray = techs.split(",").map(tech => tech.trim());

    const devfind = await Dev.find({
      techs: {
        $in: techarray
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json(devfind);
  }
};
