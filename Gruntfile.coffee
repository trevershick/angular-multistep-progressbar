module.exports = ->
	config=
		coffee:
			compile:
				expand: true
				flatten: false
				cwd: 'client/'
				src: '**/*.coffee'
				ext: '.js'
				dest: 'client/'
		less:
			src:
				files: [{
					expand: true
					cwd: 'client/css'
					src: '**/*.less'
					dest: 'client/css'
					ext: '.css'
				}]
		'node-inspector':
			options:
				'save-live-edit': true
		nodemon:
			dev:
				script: 'server.js'
				options:
					callback: (nodemon) ->
						nodemon.on 'log', (event) ->
							console.log('->>' + event.colour)
					nodeArgs: ['--debug']
					cwd: __dirname
					ignore: ['node_modules/', 'build/public/']
					ext: 'js'
					watch: 'build'
					delay: 1
					legacyWatch: true
		watch:
			all:
				files: ['client/**']
				options:
					livereload: 3006
				tasks: ['coffee', 'less']
		concurrent:
			tasks: ['nodemon:dev', 'node-inspector', 'watch']
			options:
				logConcurrentOutput: true
				limit: 3


	@initConfig config

	# Load the tasks

	require('matchdep').filterDev('grunt-*').forEach @loadNpmTasks
	@registerTask 'default', ['bower:install',  'coffee', 'less']

	@registerTask('bower:install', ->
		done = @async()
		require('bower').commands.install()
			.on('log', (result) ->
				require('grunt').log.writeln("#{result.id } #{result.message}")
			)
			.on('error', (err) ->
				require('grunt').fail.fatal(err)
			)
			.on('end', done)
	)
