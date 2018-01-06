module.exports = function(grunt) {
	require('jit-grunt')(grunt);

	grunt.initConfig({
		// Define variables
		pkg:	grunt.file.readJSON("package.json"),

		 // Compile the less files
		less: {
			less_grid: {
				options: {
					optimization: 2
				},
				files: {
					"dist/less-grid.css": "less/less-grid.less",
				}
			}
		},

		// Optimise the css file
		postcss: {
			less_grid: {
				options: {
					map: false,
					processors: [
						require('cssnano')({}),
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					]
				},
				files: {
					"dist/less-grid.min.css": "dist/less-grid.css"
				}
			}
		},

		// Watcher
		watch: {
			less_grid: {
				files: ['less/**/*.less'],
				tasks: ['deploy_grid'],
				options: {
					livereload: true,
				}
			}
		}
	});

	grunt.registerTask( 'deploy_grid', ['less:less_grid', 'postcss:less_grid'] );
}