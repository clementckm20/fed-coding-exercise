# Assumptions

[LIST ASSUMPTIONS HERE]

Assumptions:
Environment:
Chrome browser Version 71.0.3578.98 (Official Build) (64-bit)
node v8.10.0 (npm v5.6.0)
- react-scripts isn't available, install react-scripts ("react-scripts": "1.1.5") in package.json to get the app started.
- Encountered problem with SCSS compilation, added SCSS loader to webpack config as follows.
					{
						test: /\.scss$/,
						loaders:[
							require.resolve('style-loader'),
							require.resolve('css-loader'),
							require.resolve('sass-loader')
						]
					}

Server side:
- couldn't find server.js, I have created a simple server, with minimum server side features, body and headers. Facing a problem of CORS (Cross Origin Resources Sharing) when triggering localhost api calls.
	- Workaround: Attempted to solve the problem in client side, but didn't go so well. Enabled CORS in server side and listing localhost in origin.

Client side:
- Couldn't find any entry points, added index.js as entry point.
- Used Grid System from Material UI ("@material-ui/core": "^3.5.1"), which can be replaced by bootstrap, or any other Grid system)for easier spacing and wrapping react components.
- Assume assets(such as pictures) will store on same directory.
- Splitted the app into top and bottom part, namely App.js (background and containers) and Search.js (for api calls and displaying search result, which should be separated ideally) respectively.
- Assume only 'GET' API calls is required and do not need to post/update. Otherwise, componentDidUpdate or redux for proper store and async actions management
- Dropdown fields are generated dynamically based on the API calls, for easier future update in data.

# Still to do

[LIST WHAT IS STILL TO DO HERE]
Part 1A: Functional Specification part 1A is not scrolling perfectly to the search section. Still need to get the 'offsetTop Position for Search Component'. The logic is detecting the search component offsetTop Position and set the window the scroll to that position. Will need more time to look into React Refs, DOM.
Part 2E: Missing a small part of 2E: If an invalid year range has been selected, an alert should be presented to the user. This check can be done with the following:
	1) After 'Apply' Button is clicked, onClick function will be triggered, check should be passed before triggering the filter.
	2) checking the state of the selected value against the rule, e.g. minYear should be small than maxYear.
	3) triggered CSS changes, with conditional className and alert wording.
Part 4C: Have used the site_name instead of the launch pad full_name, will need to use the (nested follow loop, for i and j) for each of the launches.site_id in launches.json to match the key of corresponding object of launchpads.json and obtain the field launchpads.full_name. Populate the new field to the launches object(as a new object), so you can do a mapping with the corresponding field easily.

- Still need to ensure experience across phones and other browsers. For mobile devices, need to detect screen break points and render components in a different way or use Grid to wrap elements with props of "sm, xs, lg".
- Need to test out the app against Safari and IE
- Need to fine tune the color, spacing, size and etc to be pixel perfect or color perfect with the design.png

- Still need to add loader class to the application when it is busy or loading, it can be used as a top layer wrapping the rendered DOM.
- Still need to add the check when API calls fails and no result, it needs to show no result properly.

# Changes to the starter project

[WHAT DID/WOULD YOU CHANGE, AND WHY]
Environment:
- Some empty folders should be cleaned up, e.g. config, scripts as this will block the code when doing npm run eject.
- the version of node being 8.x and package-lock.json are a bit outdated, which may lead to some version issues when bring in outside packages to finish the project.
- package-lock, didn't include react-scripts in the beginning, which needs to reintsll and update the package.json, may lead to some potential node version issue.
- SCSS may not be compulsory, suggest using CSS to avoid potential compiling issue, as one will need go to webpack to add SCSS loader, which may not be obvious.

Client-side:
App.js and index.js are missing as an entry points in the beginning. Suggest to use create-react-app (but need to control which version to be used) as a backbone, or even ask the user the generate the app themselves as the project is almost starting from scratch.

Server-side:
- server.js is missing and not able to run initially, which extra work is required to build out the whole server and apis.
- suggest to provide a completed server.js and some documentations around CORS.
