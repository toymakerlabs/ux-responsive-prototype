//https://stackoverflow.com/questions/33611812/javascript-es6-export-const-vs-export-default

export default function navigation() {
	const button = $("#sidebar-button")
	const main = $("#main-container");
	const close = $("#sidebar-close");

	button.on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log("clicked");
		main.toggleClass("open");
	})

	close.on("click",function(e){
		e.preventDefault();
		e.stopPropagation();
		console.log("clicked");
		main.removeClass("open");
	})

}

if(module.hot) {
	module.hot.accept();
}
