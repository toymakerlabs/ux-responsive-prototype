# Overview
This project uses a combination of build tools to streamline front-end prototyping. Gulp4 is used to build the markup. Zurb's _Panini_ plugin helps keep markup DRY and makes use of Handlebars templating to enable composition of HTML pages from smaller partials. Pages and layouts can be easily and quickly added. Gulp's _watch_ task monitors the markup and code changes and automatically rebuilds when it detects changes.

Webpack2 runs alongside gulp via a middleware component and builds the front-end javascript and SCSS. Webpack HOT module reloading rebuilds the front-end on changes. Boostrap loader gives tight control over the boostrap modules that are loaded into the project. Additionally, webpack provides excellent  

### Compiling
1. `npm install` install dependencies using NPM from package.json

2. `gulp  develop` initiates the gulp dev task, which starts webpack dev server and compiles the markup, and copies imaages to the dist/ directory.

3. `gulp production` runs the production gulp and wepback config. The end result is a compressed version in the dist/ directory.
