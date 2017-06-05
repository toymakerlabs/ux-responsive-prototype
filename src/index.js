//import './styles/main.scss';
import navigation from './js/navigation.js';


$(document).ready(()=> {
    navigation();
    console.log("jquery here");

    $(window).scroll(()=> {
        let top = $(window).scrollTop();
        let height = $(window).height();
        let t_height = $(document).height();
    //    console.log(top+(height/2));

        $("#page").css({"perspective-origin":"50% " + (top+(height/2))+"px"})
    })

})





if(module.hot) {
	module.hot.accept();
}
