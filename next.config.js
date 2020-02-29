const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");
const withImages = require("next-images");

module.exports = withImages({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));
    config.plugins.push(new webpack.IgnorePlugin(/^encoding$/, /node-fetch/));
    return config;
  },
  env: {
    PRISMIC_URL: process.env.PRISMIC_URL,
    PRISMIC_CLIENT_ID: process.env.PRISMIC_CLIENT_ID,
    PRISMIC_CLIENT_SECRET: process.env.PRISMIC_CLIENT_SECRET,
    PRISMIC_ACCESS_TOKEN: process.env.PRISMIC_ACCESS_TOKEN
  }
});
