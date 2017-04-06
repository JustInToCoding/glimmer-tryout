const { GlimmerApp } = require('@glimmer/application-pipeline');
const compileSass = require('broccoli-sass');
const mergeTrees = require('broccoli-merge-trees');

var _broccoliFunnel = require('broccoli-funnel');

var _broccoliFunnel2 = _interopRequireDefault(_broccoliFunnel);

var _broccoliConcat = require('broccoli-concat');

var _broccoliConcat2 = _interopRequireDefault(_broccoliConcat);

var _path = require('path');

var path = _interopRequireWildcard(_path);

var _fs = require('fs');

var fs = _interopRequireWildcard(_fs);

var _broccoliSass = require('broccoli-sass');

var _broccoliSass2 = _interopRequireDefault(_broccoliSass);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function(defaults) {
  var app = new GlimmerApp(defaults, {
    // Add options here
  });

	app.cssTree = function() {
		let nodeModulesPath = 'node_modules';
		let stylesPath = path.join(this.srcPath, 'ui', 'styles');
		if (fs.existsSync(stylesPath)) {
			// Compile SASS if app.scss is present
			// (this works with imports from app.scss)
			let scssPath = path.join(stylesPath, 'app.scss');
			if (fs.existsSync(scssPath)) {
					return (0, _broccoliSass2.default)([stylesPath, nodeModulesPath], 'app.scss', 'app.css', {
							annotation: 'Funnel: scss'
					});
			}
			// Otherwise concat all the css in the styles dir
			return (0, _broccoliConcat2.default)(new _broccoliFunnel2.default(stylesPath, {
					include: ['**/*.css'],
					annotation: 'Funnel: css'
			}), { outputFile: 'app.css' });
		}
	}

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

	//let nodeSass = compileSass(['node_modules'], )

  return app.toTree();
};
