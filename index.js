var path = require('path');
var fs = require('fs');

module.exports = function (source) {
  if (this.cacheable) this.cacheable();
  var callback  = this.async();
  var options   = this.options.bulma || {};
  var themeName = options.theme;
  
  if (!themeName) {
    // @TODO return error and advice how to configure the plugin
    return callback(new Error('Plugin not configured!'))
  }
  
  var themePath = path.resolve(themeName);

  var themeExists = fs.existsSync(themePath);
  if (!themeExists) {
    // @TODO return error and advice how to configure the plugin
    return callback(new Error(`The path ${themePath} does not exist!`))
  }

  this.addDependency(themePath);

  fs.readFile(themePath, "utf-8", function(err, theme) {
    if(err) return callback(err);
    callback(null, theme + '\n' + source);
  });
};