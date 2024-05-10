// Official Eleventy Plugins
const pluginNavigation = require("@11ty/eleventy-navigation");
//const pluginRSS = require("@11ty/eleventy-plugin-rss");
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");

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
	md.use(markdownItAnchor, {
		permalink: markdownItAnchor.permalink.ariaHidden({
			placement: 'after',
			class: 'direct-link',
			symbol: '#',
			level: [1,2,3,4],
		}),
	});
	md.use(markdownItAttrs, {});
	md.use(markdownItFigures, {
		// lazy: true,
		// async: true,
		figcaption: 'alt'
	});
	
	config.setLibrary('md', md);

	// -------------------------------------------------------------------- //
	// Collections
	var current = new Date();
	current.setDate(current.getDate() - 1);

	config.addCollection("upcoming", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date > current;
		});
	});

	config.addCollection("past", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date < current;
		});
	});

	config.addCollection("recurring", (collection) => {
		return collection.getFilteredByTag('events').filter((item) => {
			return item.data.date == undefined;
		})
	});

	config.addCollection("byYear", (collection) => {
		const posts = collection.getFilteredByTag('events').reverse();
		const years = posts.map(post => post.date.getFullYear());
		const uniqueYears = [...new Set(years)];

		const postsByYear = uniqueYears.reduce((prev, year) => {
			const filteredPosts = posts.filter(post => post.date.getFullYear() === year);

			return [
				...prev,
				[year, filteredPosts]
			];
		}, []);

		return postsByYear;
	});

	// -------------------------------------------------------------------- //
	// Filters

	// Filter: Readable Date. Converts DateObject to "01 Jul 2023"
	config.addFilter('readableDate', (dateObj) => {
		return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
	});

	// Filter: Markdown
	config.addFilter('md', (content) => {
		return md.render(content);
	});


	// -------------------------------------------------------------------- //
	// CALENDAR BUSINESS

	// Filter: Get Date
	config.addNunjucksGlobal("getDate", (dateObj) => {
		return dateObj.getDate();
	});

	// Filter: Get Month
	config.addNunjucksGlobal("getMonth", (dateObj) => {
		return dateObj.getMonth();
	});

	// Nunjucks Globals
  	let now = new Date();
  	const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  	const firstDay = new Date(now.setDate(1)).getDay();
  	const lastDay = new Date(now.setDate(daysInMonth)).getDay();
  	const prevLastDate = new Date(now.setDate(0)).getDate();

	const currentMonthDays = [...Array(daysInMonth)].map((_, i) => i + 1);
  	const prevMonthDays = [...Array(firstDay - 1)].map((_, i) => prevLastDate - i).reverse();
  	const nextMonthDays = (lastDay < 7) ? [...Array(7 - lastDay)].map((_, i) => i + 1) : [];
	
	// Ints
	config.addNunjucksGlobal("currentMonth", now.getMonth() + 1);
	//config.addNunjucksGlobal("daysInMonth", daysInMonth);
	//config.addNunjucksGlobal("firstDay", firstDay);
	//config.addNunjucksGlobal("lastDay", lastDay);
	//config.addNunjucksGlobal("prevLastDate", prevLastDate);

	// Arrays
	config.addNunjucksGlobal("currentMonthDays", currentMonthDays);
	config.addNunjucksGlobal("prevMonthDays", prevMonthDays);
	config.addNunjucksGlobal("nextMonthDays", nextMonthDays);

	// -------------------------------------------------------------------- //
	// Plugins
	config.addPlugin(EleventyHtmlBasePlugin);
	config.addPlugin(pluginNavigation);
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
		},
		pathPrefix: "/sabby/"
	}

}