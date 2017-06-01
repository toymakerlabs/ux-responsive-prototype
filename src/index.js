import './styles/main.scss';
import './js/butt.js';

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log("poop");
  console.log("sit");
  console.log("sit");
});

$(document).ready(function(){
    console.log("jquery here")
})


if(module.hot) {
	module.hot.accept();
}
