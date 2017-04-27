var windowWidth = window.innerWidth;
var isMobile = windowWidth < 980 ? true : false;

function initTemplate(){
    initScroll()
}

function initScroll(){
    var windowHeight = window.innerHeight;
    var els = document.querySelectorAll('.facewall-item[data-loaded="false"]');
    var detailEls = document.querySelectorAll('.detail-item-container[data-loaded="false"]');
    window.addEventListener( 'scroll', debounce(function(){checkScrollHeight('mainView')}, 10) );
    if(isMobile){ document.querySelector('#detail-scroll-area').addEventListener('scroll', debounce(function(){checkScrollHeight('detailView')},10) ); }

    function checkScrollHeight(view){
        if(view === "mainView"){
            for(var i=0;i<els.length;i++){
                if(els[i].getBoundingClientRect().top < windowHeight * 1.5){ lazyLoadImage(i); }

                if(els[i].getBoundingClientRect().top < windowHeight - 5){
                    els[i].setAttribute('data-showed','true');
                }
            }
        }else if(view === "detailView" && isMobile){
            for(var i=0;i<detailEls.length;i++){
                if(detailEls[i].getBoundingClientRect().top < windowHeight * 2){ lazyLoadImage(i); }
            }
        }
    };   

    function lazyLoadImage(index){
        els[index].setAttribute('data-loaded','true');
        var baseUrl = "<%=path%>/assets/imgs/players/";
        if(isMobile) { baseUrl = "<%=path%>/assets/imgs/playersOpt/" }

        var itemPhoto = els[index].querySelector('.item-photo').getAttribute('data-src');
        els[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + encodeURIComponent(itemPhoto) + ")"
        console.log(baseUrl + encodeURIComponent(itemPhoto))
        if(isMobile){
           detailEls[index].setAttribute('data-loaded','true'); 
           detailEls[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + encodeURIComponent(itemPhoto) + ")"
        } 
    }

    checkScrollHeight('mainView');
}


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) { func.apply(context, args); }
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) { func.apply(context, args); }
    };
}

initTemplate();