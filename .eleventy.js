// Official Eleventy Plugins
const pluginNavigation = require("@11ty/eleventy-navigation");
//const pluginRSS = require("@11ty/eleventy-plugin-rss");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const embedEverything = require("eleventy-plugin-embed-everything");

// markdown-it plugins
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFigures = require('markdown-it-image-figures');

// Other plugins
const { DateTime } = require("luxon");

module.exports = function(config) {

	// -------------------------------------------------------------------- //
	// Customised markdown library

	var md = markdownIt({html: true, breaks: true, linkify: true});

	md.use(markdownItAttrs, {});
	md.use(markdownItFigures, {
		// lazy: true,
		// async: true,
		figcaption: true
	});
	
	config.setLibrary('md', md);

	// -------------------------------------------------------------------- //
	// Collections

	// Projects by year
	config.addCollection("byYear", function(collection) {
		return collection.getFilteredByTag('projects').sort(function(a, b) {
			return Number(b.data.year) - Number(a.data.year);
		});
	});

	config.addCollection("featuredPosts", function(collection) {
		return collection.getFilteredByTag('Featured').sort(function(a, b) {
			return Date(b.date) - Date(a.date);
		});
	});

	config.addCollection("fiction", function(collection) {
		return collection.getFilteredByTag('Fiction').sort(function(a, b) {
			return Date(b.date) - Date(a.date);
		});
	});	

	// -------------------------------------------------------------------- //
	// Filters

	// Filter: Readable Date. Converts DateObject to "01 Jul 2023"
	config.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	// Filter: Markdown
	config.addFilter('md', (content) => md.render(content));

	// Nunjucks Globals
	let now = new Date();
	const currentYear = now.getFullYear();
	const currentMonth = now.getMonth();

	// -------------------------------------------------------------------- //
	// Plugins
	config.addPlugin(EleventyHtmlBasePlugin);
	config.addPlugin(pluginNavigation);
	config.addPlugin(embedEverything);
	//config.addPlugin(pluginRSS);

	// Passthrough
	config.addPassthroughCopy({"src/_": "."});
	config.addPassthroughCopy("src/img");

	// Set parsing option to look for excerpts '---'
	config.setFrontMatterParsingOptions({excerpt: true})

	// -------------------------------------------------------------------- //
	// Return config options
	return {
		markdownTemplateEngine: 'njk',
		dir: {
			input: "src",
			data: "_includes/_data",
			output: "build"
		}
	}

}