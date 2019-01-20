// Wrapping JSON.parse to avoid the app to crash
module.exports = str => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};
