const render = require("./render-view");
const getStaticAsset = require("./get-static-asset");

const ui = {};

// Expose static assets
ui.assets = (req, res) => {
  const trimmedAssetName = req.path.replace("assets/", "").trim();

  return getStaticAsset(trimmedAssetName)
    .then(asset => {
      // Determine the content type (default to plain text)
      let _contentType = "plain";
      if (trimmedAssetName.indexOf(".css") > -1) {
        _contentType = "css";
      }

      if (trimmedAssetName.indexOf(".css") > -1) {
        _contentType = "css";
      }

      if (trimmedAssetName.indexOf(".png") > -1) {
        _contentType = "png";
      }

      if (trimmedAssetName.indexOf(".jpg") > -1) {
        _contentType = "jpg";
      }

      if (trimmedAssetName.indexOf(".ico") > -1) {
        _contentType = "ico";
      }
      if (trimmedAssetName.indexOf(".js") > -1) {
        _contentType = "js";
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
