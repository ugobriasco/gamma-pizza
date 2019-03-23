const render = require("./render-view");
const getStaticAsset = require("./get-static-asset");

const ui = {};

// Expose static assets
ui.assets = (req, res) => {
  const trimmedAssetName = data.trimmedPath.replace("assets/", "").trim();

  return getStaticAsset(trimmedAssetName)
    .then(asset => {
      // Determine the content type (default to plain text)
      let _contentType = "plain";
      if (asset.indexOf(".css") > -1) {
        _contentType = "css";
      }

      if (asset.indexOf(".css") > -1) {
        _contentType = "css";
      }

      if (asset.indexOf(".png") > -1) {
        _contentType = "png";
      }

      if (asset.indexOf(".jpg") > -1) {
        _contentType = "jpg";
      }

      if (asset.indexOf(".ico") > -1) {
        _contentType = "ico";
      }
      if (asset.indexOf(".js") > -1) {
        _contentType = ".js";
      }
      res({
        statusCode: 200,
        data: asset,
        contentType: _contentType
      });
    })
    .catch(err =>
      res({
        statusCode: 404,
        data: err,
        contentType: "json"
      })
    );
};

// Expose homepage
ui.index = (req, res) => {
  return render("index").then(str =>
    res({
      statusCode: 200,
      data: str,
      contentType: "html"
    })
  );
};

module.exports = ui;
