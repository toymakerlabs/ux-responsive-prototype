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


$(window).scroll(function(){
    var top = $(window).scrollTop();
    var height = $(window).height();
    var t_height = $(document).height();
    console.log(top+(height/2));

    $("#page").css({"perspective-origin":"50% " + (top+(height/2))+"px" })
})



if(module.hot) {
	module.hot.accept();
}
