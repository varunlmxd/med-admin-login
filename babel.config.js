module.exports = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        node: "current" // Or specify the specific version you need
      }
    }],
    "@babel/preset-react"
  ]
};