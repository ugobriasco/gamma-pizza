/*
* fancy log colors
*/

// External Dependancies

// log.purple = text => console.log(`\x1b[35m%s\x1b[0m`, text);
// log.purple = text => console.log("\x1b[36m%s\x1b[0m", text);

const style = {
  reset: `\x1b[0m`,
  bugright: `\x1b[1m$`,
  dim: `\x1b[2m`,
  underscore: `\x1b[4m`,
  blink: `\x1b[5m`,
  reverse: `\x1b[7m`,
  hidden: `\x1b[8m`
};

const foreground = {
  black: `\x1b[30m` + style.reset,
  red: `\x1b[31m` + style.reset,
  green: `\x1b[32m` + style.reset,
  yellow: `\x1b[33m` + style.reset,
  blue: `\x1b[34m` + style.reset,
  magenta: `\x1b[35m` + style.reset,
  cyan: `\x1b[36m` + style.reset,
  white: `\x1b[37m` + style.reset
};

const background = {
  bgBlack: `\x1b[40m`,
  bgRed: `\x1b[41m`,
  bgGreen: `\x1b[42m`,
  bgYellow: `\x1b[43m`,
  bgBlue: `\x1b[44m`,
  bgMagenta: `\x1b[45m`,
  bgCyan: `\x1b[46m`,
  bgWhite: `\x1b[47m`
};

const colors = {
  ...foreground
};

module.exports = colors;
