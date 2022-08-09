//check localStorage before starting the page
var oldMode = localStorage.getItem("mode");
if(oldMode){
    setMode("."+oldMode);
};
let Random = "Start";
//to determined if the last choose from use is change or stop change the bg of landing page
if(localStorage.getItem("random")){
    Random = localStorage.getItem("random");
    $(".options span").removeClass("active");
    if($($(".options span")[0]).text() == Random){
        $($(".options span")[0]).addClass("active");
    }else{
        $($(".options span")[1]).addClass("active");
    }
}
//disapper and show the menu
let scrollTest = 0; 
$(window).scroll(() =>{
    if(!($('.main ul')[0].classList.contains("open"))){
        if(scrollTest - window.pageYOffset < 0){
            $(".main").css({
            "transition":"0.5s",
            "top":"-95px"
            });
        }else {
            $(".main").css({
            "top":"0px"
            });
        }
        scrollTest = window.pageYOffset;
    }
})

$(".main ul li a").click(function(){
    $(".main ul li a[class = active").removeClass("active")
    $(this).addClass("active");
});

//make gear spin and stop && open / close the setting bar
var spin = "off";
$(".setting .gear i").click(function(){
    if(spin == "off"){
        spin = "on";
        $(this).addClass("rotate");
        $(".setting").css("right","0");
    }else{
        spin = "off";
        $(this).removeClass("rotate");
        window.matchMedia("(max-width:769px)").matches?
            $(".setting").css("right","-60vw") : $(".setting").css("right","-30vw") ;
    }
});
$(".setting").click(e => {
    e.stopPropagation();
})
//changing page mode

function setMode (button){
    $(".options div").css("border","");
    $(button).css("border","3px dodgerblue solid")
    $(":root").css("--background-color",$(button).css("background-color")) ;
    $(":root").css("--font-color",$(button).css("color")) ;

    if($(button).attr("class") == "dMode"){
        $(".landing .layer").css("background-color","rgb(0 0 0 / 45%)");
        $(".main").css("box-shadow","0 5px 20px rgba(0, 0, 0, 0.897)");
    }else{
        $(".landing .layer").css("background-color","rgb(255 255 255 / 10%)");
        $(".main").css("box-shadow","0 8px 15px rgb(255 255 255 / 56%)");
    }
    localStorage.setItem("mode",$(button).attr("class"));
    
}

$(".options div").click(function(){setMode(this);});

//set random backgrond img 

let imgTest = 0;
let randomImg ;
function changeImg(){
        randomImg = setInterval(function(){
            let randomNum = (Math.floor(Math.random()*4))+1;
            for (let x = 0; imgTest == randomNum; x++){//to prevent repeate the same image
                randomNum = (Math.floor(Math.random()*4))+1;
            }
            imgTest = randomNum ;
            $(".landing").css("background-image",'url("img/'+randomNum+'.jpg")');
        },5000);
}

if(Random == "Start"){
    changeImg();
}

//control the changing of background img

$(".options span").click(e => {
    if(e.target.innerHTML != Random){
        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            $(element).removeClass("active");
        });
        $(e.target).addClass("active");
        if(e.target.innerHTML == "Stop"){
        Random = "Stop";
        clearInterval(randomImg);
        $(".landing").css("background-image",'url("img/1.jpg")');
        }else{
            Random = "Start";
            changeImg();
        }
    }
    localStorage.setItem("random",Random);
});

//show about us content
$(window).scroll(function(){
    if(window.pageYOffset > ($(".about-us .container")[0].offsetHeight)){
        $(".about-us .box-info").css({
            right: '0',
            opacity: '1'
        });
        $(".about-us .box-img").css({
            right: '0',
        });
            $(".about-us .box-img img").css({
                opacity: '1'
            })

        //check changing on media
        window.matchMedia("(max-width:769px)").onchange = e =>{
            spin = "off";
            $(".setting .gear i").removeClass("rotate");
            if(e.matches){
                $(".setting").css("right","-60vw")
            }else{
                $(".setting").css("right","-30vw")
            }
        }
    }
})

// start the loader of skills 
$(window).scroll(function(){
    for(let a = 0; a < $(".skills .skill").length; a++){
        let skillOffsetTop = $(".skills .skill")[a].offsetTop;
        let skillOffsetHeight = $(".skills .skill")[a].offsetHeight;
        let windowHeight = this.innerHeight;
        if(window.pageYOffset > (skillOffsetTop - windowHeight + skillOffsetHeight)){
            $(".skill-progress .s"+a).css("width",$(".skill-progress .s"+a).data("progress"))
            let updatePersentage= setInterval(()=>{
                let persentage = $(".skill-progress .s"+a)[0].offsetWidth*100/$(".skill-progress")[0].offsetWidth;
                if(parseInt($(".skill-progress .s"+a).text()) != parseInt($(".skill-progress .s"+a).data("progress")) ){
                    $(".skill-progress .s"+a).text(Math.round(persentage) +"%")
                } else {
                    $(".skill-progress .s2").text($(".skill-progress .s2").data("progress"))
                    clearInterval(updatePersentage);
                }; 
            }); 
        }else{
            $(".skill-progress .s"+a).css("width","0%");
        }
    }
})

//make the popup when click any image in gallery
let that;
$(".gallery-box img").click(function(){
    if(!(window.matchMedia("(max-width:750px)").matches)){
        that = this;
        $(".popup-p").css("display","block");
        $(this).addClass("img-click");
        $(this).parent().addClass("clicked");
        setTimeout(() => {
            $(".blur").css({"filter":"blur(8px)",'transition': '0.5s'});
            $(".popup-p").addClass("popup-backgr");
            $(".popup-ch").addClass("popup");
            $(".popup-backgr .popup div").before(this) ;
            //close function
            $(".popup-backgr .popup div").click(function(){
            $(".blur").css("filter","none");
            $(that).removeClass("img-click");
            $(".popup-p").removeClass("popup-backgr");
            $(".popup-ch").removeClass("popup ");
            $(".popup-p").css("display","none");
            $(".gallery .gallery-box div.clicked").append(that);
            $(that).parent().removeClass("clicked");
        });
        }, 1000);
    }
});

$(".main ul li a").click(e =>{
    e.preventDefault();
    $(e.target.dataset.section)[0].scrollIntoView({behavior:'smooth'});
});
//open & close mobile menu

$(".menu").click(e => {
    e.stopPropagation();
    $('.main ul').toggleClass("open");
    $(".menu").toggleClass("pointer");
})
$(".main ul").click(e =>{
    e.stopPropagation();
})
$(document).click(e => {
    //close menu
    if(e.target != $(".menu")[0] && e.target != $(".open")[0]){
        if($('.main ul')[0].classList.contains("open")){
            $('.main ul').removeClass("open");
            $(".menu").removeClass("pointer");
        }
    }
    //close setting bar
    if(e.target != $(".setting")[0]){
        if(spin == "on"){
            spin = "off";
            $(".setting .gear i").removeClass("rotate");
            window.matchMedia("(max-width:769px)").matches?
                $(".setting").css("right","-60vw") : $(".setting").css("right","-30vw") ;
        }
    }
});
window.matchMedia("(min-width:1024px)").onchange = e =>{
    if(e.matches){
        if($(".main ul").hasClass("open")){
            $('.main ul').removeClass("open");
            $(".menu").removeClass("pointer");
        }
    }
}
//footer copey rigte year
document.querySelector(".footer .date").innerText = new Date().getFullYear();

//footer animation
let nameWords = " Ahmed Magdy.".split("");
let foHeight = document.querySelector(".footer").offsetHeight;
let addChar;
let count = 0;
document.querySelector(".footer pre").innerHTML += `<span class="movable">|</span>`;
window.onscroll = function() {
    if(window.pageYOffset > (document.querySelector("body").offsetHeight - foHeight - window.innerHeight)){
        document.querySelector(".footer pre").style.left = "0";
    }
}
addChar = setInterval(function(){
    if(count < nameWords.length){
        document.querySelector(".footer pre a").innerHTML += nameWords[count];
        count++;
    }else{
        setTimeout(()=>{
            count = 0;
            document.querySelector(".footer pre a").innerHTML = "";
        },500)
    }
},250)

$(window).scroll(function(){
    for(let c = 0; c < $(".cut").length; c++){
        if(window.pageYOffset >= ($(".cut")[c].offsetTop - window.innerHeight)){
            $(".main ul li a[class ~= active]").removeClass("active")
            $(".main ul li a")[(c+1)].classList.add("active");
        }
        if(window.pageYOffset <= 50){
            $(".main ul li a[class ~= active]").removeClass("active")
            $(".main ul li a")[0].classList.add("active");
        }
    }
})
