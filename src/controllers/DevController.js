const axios = require("axios");
const Dev = require("../models/Dev");

module.exports = {
  async index(req, res) {
    const devfind = await Dev.find();

    return res.json(devfind);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    const devfind = await Dev.findOne({ github_username });

    if (!devfind) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name = login, avatar_url, bio } = response.data;
      const techsArray = techs.split(",").map(tech => tech.trim());
      console.log(name, avatar_url, bio, github_username, techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      return res.json(dev);
    } else {
      return res.json({ message: "dev ja existe" });
    }
  }
};
