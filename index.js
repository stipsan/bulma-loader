const HEADER = `
@import "~bulma/sass/utilities/functions";
@import "~bulma/sass/utilities/mixins";
@import "~bulma/sass/utilities/animations";


@import "~bulma/sass/utilities/variables";
`;
const FOOTER = `
@import "~bulma/sass/base/helpers";
@import "~bulma/sass/elements/elements";
@import "~bulma/sass/components/components";
@import "~bulma/sass/layout/layout";
`
var DEFAULT_NAME = 'theme.scss';
var path = require('path');
var fs = require('fs');
var count = 0;

module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  var callback  = this.async();
  var options   = this.options.bulma || {};
  var fromBuild = options.fromBuild || true;
  var themeName = options.theme || DEFAULT_NAME;
  var themePath = path.resolve(themeName);

  var themeExists = fs.existsSync(themePath);
  if (!themeExists) {
    // if themePath is not readable, load bulma with default variables
    return callback(null, HEADER + FOOTER);
  }

  this.addDependency(themePath);

  fs.readFile(themePath, "utf-8", function(err, theme) {
    if(err) return callback(err);
    callback(null, heading + '\n' + theme + '\n' + source);
  });
};