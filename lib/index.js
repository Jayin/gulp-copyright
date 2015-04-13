(function() {
  var EOL, PLUGIN_NAME, PluginError, gutil, license, path, through;

  gutil = require('gulp-util');

  through = require('through2');

  PluginError = gutil.PluginError;

  path = require('path');

  license = require('./license');

  PLUGIN_NAME = 'gulp-copyright';

  EOL = '\n';

  module.exports = function(opt) {
    if (opt == null) {
      opt = {};
    }
    opt.owner = opt.owner || 'anonymous';
    opt.year = opt.year || new Date().getFullYear();
    opt.license = opt.license || 'MIT';
    if (!license[opt.license]) {
      throw PluginError(PLUGIN_NAME, 'Not Support license ' + opt.license);
    }
    return through.obj(function(file, enc, cb) {
      var c, commen_start, comment_end, comment_middle, copyright_contents, extname, res;
      if (file.isNull()) {
        cb(null, file);
      }
      if (file.isStream()) {
        throw PluginError(PLUGIN_NAME, 'Not Support Stream');
      }
      copyright_contents = new String(license[opt.license]).split('\n');
      extname = path.extname(file.path);
      if (extname === '.js' || extname === '.css') {
        commen_start = '/**';
        comment_middle = ' * ';
        comment_end = ' **/';
      } else if (extname === '.coffee') {
        commen_start = '#';
        comment_middle = '# ';
        comment_end = '#';
      } else {
        cb(null, file);
      }
      res = [
        commen_start, ((function() {
          var i, len, results;
          results = [];
          for (i = 0, len = copyright_contents.length; i < len; i++) {
            c = copyright_contents[i];
            results.push([comment_middle + c]);
          }
          return results;
        })()).join(EOL), comment_end, EOL
      ].join(EOL).replace('<YEAR>', opt.year).replace('<OWNER>', opt.owner);
      file.contents = Buffer.concat([new Buffer(res), file.contents]);
      this.push(file);
      return cb();
    });
  };

}).call(this);
