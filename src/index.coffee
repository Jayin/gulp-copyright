gutil = require 'gulp-util'
through = require 'through2'
PluginError = gutil.PluginError
path = require 'path'
license = require './license'


PLUGIN_NAME = 'gulp-copyright'
EOL = '\n'

module.exports = (opt={})->
    opt.owner = opt.owner or 'anonymous'
    opt.year = opt.year or new Date().getFullYear()
    opt.license = opt.license or 'MIT'

    if not license[opt.license]
        throw PluginError(PLUGIN_NAME, 'Not Support license '+ opt.license)

    through.obj (file, enc , cb)->
        if file.isNull()
            cb(null, file)
        if file.isStream()        
            throw PluginError(PLUGIN_NAME, 'Not Support Stream')
        

        copyright_contents = new String(license[opt.license]).split('\n')
        extname = path.extname(file.path)

        if extname in ['.js','.css']
            commen_start = '/**'
            comment_middle = ' * ' 
            comment_end = ' **/'

        else if extname in ['.coffee']
            commen_start = '#'
            comment_middle = '# ' 
            comment_end = '#'

        else
            # not support
            cb(null, file)

        res = [commen_start,
                 ([comment_middle+ c ] for c in copyright_contents).join(EOL),
                 comment_end,
                 EOL
               ].join(EOL)
                .replace('<YEAR>', opt.year)
                .replace('<OWNER>', opt.owner) 
        file.contents = Buffer.concat([new Buffer(res), file.contents])

        @push file
        cb()

