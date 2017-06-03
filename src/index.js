//import './styles/main.scss';
import navigation from './js/navigation.js';

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");
  console.log("poop");
  console.log("sit");
  console.log("sit");
});

$(document).ready(function(){
    navigation();
    console.log("jquery here")
})






if(module.hot) {
	module.hot.accept();
}
