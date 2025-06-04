import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default async function (eleventyConfig) {

	eleventyConfig.addPassthroughCopy({
		 "src/__passthrough": ".",
		 "node_modules/three/build": "node_modules/three/build",
		 "node_modules/three/examples": "node_modules/three/examples",
		//  "node_modules/three/build/three.core.min.js": "js/vendor/three/three.core.min.js",
		//  "node_modules/three/build/three.module.min.js": "js/vendor/three/three.module.min.js",
		//  "node_modules/three/build/three.tsl.min.js": "js/vendor/three/three.tsl.min.js",
		//  "node_modules/three/build/three.webgpu.min.js": "js/vendor/three/three.webgpu.min.js",
		//  "node_modules/three/build/three.webgpu.nodes.min.js": "js/vendor/three/three.webgpu.nodes.min.js"	
		});

    eleventyConfig.setServerOptions({
		// Whether the live reload snippet is used
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// The starting port number
		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Additional files to watch that will trigger server updates
		// Accepts an Array of file paths or globs (passed to `chokidar.watch`).
		// Works great with a separate bundler writing files to your output folder.
		// e.g. `watch: ["_site/**/*.css"]`
		watch: [],

		// Show local network IP addresses for device testing
		showAllHosts: false,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
			// key: "./localhost.key",
			// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",

		// Show the dev server version number on the command line
		showVersion: false,

		// Added in Dev Server 2.0+
		// The default file name to show when a directory is requested.
		indexFileName: "index.html",

		// Added in Dev Server 2.0+
		// An object mapping a URLPattern pathname to a callback function
		// for on-request processing (read more below).
		onRequest: {},
	});

	return {
		htmlTemplateEngine: "liquid",
		markdownTemplateEngine: "liquid",
		dir: {
			input: "src",
			data: "_includes/_data",
			output: "_build"
		},
	};
};

