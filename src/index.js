import './styles/main.scss';
import './js/butt.js';

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log("poop");
  console.log("sit");
  console.log("sit");
});


if(module.hot) {
	module.hot.accept();
}
