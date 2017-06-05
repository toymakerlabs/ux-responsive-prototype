//https://stackoverflow.com/questions/33611812/javascript-es6-export-const-vs-export-default

export default function navigation() {
	const button = $("#drawer-button");
	const close = $("#drawer-close");
	const main = $("#main");
	const nav = $("#main-nav");
	const page = $("#page");
	const drawer = $("#mobile-nav");
	const search_button = $("#search-button");
	const search = $("#search");

	button.on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log("clicked");
		main.toggleClass("open");
		nav.toggleClass("open");
		page.toggleClass("open");
		drawer.toggleClass("open");
	})

	close.on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		main.removeClass("open");
		nav.removeClass("open");
		page.removeClass("open");
		drawer.removeClass("open");
	})

	search_button.on("click",function(e){
		console.log("clicked");
		e.preventDefault();
		e.stopPropagation();
		search.toggleClass('open');
	})

}

if(module.hot) {
	module.hot.accept();
}
