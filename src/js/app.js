import Mustache from 'mustache';

var detailTemplate = '<div class="detail-item-container" data-id="{{{id}}}" data-loaded="false"><div class="item-photo" style="background-image:url(<%= path %>/assets/imgs/players/{{{photo_filename}}});"></div><h5>{{{name}}} </h5><ul>    <li><strong>Country</strong> {{{homeNation}}}</li><li><strong>Sport</strong> </li><li><strong>Event</strong></li></ul><p class="detail-item-description">{{{Description}}}</p></div>';
var closeBtnHTML = '<div class="close-overlay-btn"></div>';

//import detailTemplate from '<%=path%>/templates/share.html!text'
var windowWidth = window.innerWidth;
var isMobile = windowWidth < 980 ? true : false;

let dataset;
// let itemDetailHTML = Mustache.render(itemDetailTemplate);  
// Mustache.registerPartial('itemDetail',itemDetailHTML);


function initTemplate(){

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            dataset = JSON.parse(xhr.responseText);

           // for (var i = 0; i < dataset.attendances.length; i++) {
           //      dataset.attendances[i].d3Date = parseTime(new Date(dataset.attendances[i].date));
           //      //dataset.attendances[i].homeTeam == "Arsenal" ? arsenal.push(dataset.attendances[i]) : spurs.push(dataset.attendances[i]) ;
           //  }

            //localData = dataset.attendances;

            //console.log(dataset);
                
            initScroll();
            initEvents();
            updatePageTexts();

        }
    }

    xhr.open('GET', '<%= path %>/assets/data/players.json', true);
    xhr.send(null);

    //  if(!isMobile){
    //     moveDetailBox(document.querySelectorAll('.facewall-item')[0]);
    // } 
}

function initScroll(){
    var windowHeight = window.innerHeight;
    var els = document.querySelectorAll('.facewall-item[data-loaded="false"]');
    var detailEls = document.querySelectorAll('.detail-item-container[data-loaded="false"]');
    window.addEventListener( 'scroll', debounce(function(){checkScrollHeight('mainView')}, 10) );
   // if(isMobile){ document.querySelector('#detail-scroll-area').addEventListener('scroll', debounce(function(){checkScrollHeight('detailView')},10) ); }

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
        //if(isMobile) { baseUrl = "<%=path%>/assets/imgs/playersOpt/" }

        var itemPhoto = els[index].querySelector('.item-photo').getAttribute('data-src');
        els[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + itemPhoto + ")"
        //console.log(baseUrl + encodeURIComponent(itemPhoto))
        // if(isMobile){
        //    detailEls[index].setAttribute('data-loaded','true'); 
        //    detailEls[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + encodeURIComponent(itemPhoto) + ")"
        // } 
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

function initEvents(){

     [].slice.apply(document.querySelectorAll('.facewall-item')).forEach(el => {
        if(!isMobile){
            el.addEventListener('mouseover', () => moveDetailBox(el));
            //el.addEventListener('mouseout', () => hideDetail(el));
        }
        if(isMobile){
            el.addEventListener('click', () => moveDetailBox(el));

        }
          
    });
    //els[index].setAttribute('data-loaded','true');

}

function getPlayerData(r){
    let o;
    [].slice.apply(dataset).forEach(el => {
        if(el.id==r){o=el}
    });
    return o;

}

function moveDetailBox(pEl){
    let playerData = getPlayerData(pEl.getAttribute("data-id"));
    let detailHTML = Mustache.render(detailTemplate, playerData);

    if(!isMobile){
        document.querySelector('.detail-box').innerHTML = detailHTML;
        document.querySelector('.mobile-detail-box').style.display = 'none';
    }

    if(isMobile){
         document.querySelector('.mobile-detail-box').innerHTML = closeBtnHTML+detailHTML;
         document.querySelector('.mobile-detail-box').style.display = 'block';
         document.querySelector('.detail-box').display = 'none';
         document.querySelector('.close-overlay-btn').addEventListener('click', function(){ hideMobileDetail()});
    }
  
    var pOffset = pEl.getBoundingClientRect();
    var projectOffset = document.querySelector('.interactive-container').getBoundingClientRect();
    var elPosition = pOffset.top - projectOffset.top;   

    var totalOffset = elPosition + document.querySelector('#detail-box-container').getBoundingClientRect().height;
    var teamContainerHeight = document.querySelector('.interactive-container').getBoundingClientRect().height;
    var isOffscreen = totalOffset > teamContainerHeight;
    
    if(isOffscreen){
        var updatedOffset = teamContainerHeight - document.querySelector('#detail-box-container').getBoundingClientRect().height - 40;
        document.querySelector('#detail-box-container').style.transform = 'translateY(' + updatedOffset + 'px)';
        document.querySelector('#detail-box-container').style.webkitTransform = 'translateY(' + updatedOffset + 'px)';
    }
    

    // Move lines
    var itemChildEls = pEl.parentNode.querySelectorAll('.facewall-item');
    var lineWidth = 10;
    var columnCount = 4;
    var boxOffset = document.querySelector('#detail-box-container').getBoundingClientRect();
    var diff = boxOffset.left - pOffset.left - pOffset.width - lineWidth + 10;
    var playerIndex;

    for(var i=0; i<itemChildEls.length; i++){
        if(itemChildEls[i].getAttribute('data-id') === pEl.getAttribute('data-id')){
            playerIndex = i + 1;
        }
    }

    if(!isMobile){ 
        document.querySelector('#detail-box-container').style.transform = 'translateY(' + elPosition + 'px)';
        document.querySelector('#detail-box-container').style.webkitTransform = 'translateY(' + elPosition + 'px)';
        document.querySelector('#line-container').style.top = elPosition + ((pOffset.width/2)-10) + "px";
        document.querySelector('#line-container').style.left = pOffset.left + pOffset.width - projectOffset.left - 10 + "px"
    }
    

    if(playerIndex < itemChildEls.length && playerIndex%columnCount !== 0){
        document.querySelector('#player-line').style.width = lineWidth + "px";
        document.querySelector('#line-box').style.width = diff + "px";
        document.querySelector('#line-box').style.left = lineWidth + "px";
        document.querySelector('#line-box').style.height = (pOffset.width/2) + lineWidth + 20 + "px";
    }else{
        document.querySelector('#player-line').style.width = diff + lineWidth + "px";
        document.querySelector('#line-box').style.width = 0;
        document.querySelector('#line-box').style.height = 0;
    }
}



function hideMobileDetail(){
    document.querySelector('.mobile-detail-box').style.display = 'none';
}

function hideDetail(el){
    document.querySelector('#line-container').style.top = "0px";
    document.querySelector('#line-container').style.left = "-1000px";

  //  console.log("hide")
}

function updatePageTexts(){
    updatePageDate();
}

function updatePageDate(){
    let pubDate = new Date(window.guardian.config.page.webPublicationDate)
    let pubDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', timeZone : 'UTC', timeZoneName : 'short'};
    let dateStr = pubDate.toLocaleDateString('en-GB',pubDateOptions).split(",").join(" ").split("  ").join(" ");

    document.querySelector(".time-stamp").innerHTML = dateStr;
}

console.log(window.guardian.config.page); //.shortUrl

initTemplate();