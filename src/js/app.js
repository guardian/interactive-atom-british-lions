import Mustache from 'mustache';
import { share } from '../lib/share.js';

var playerCircles = '<circle r="2" class="player-circle" data-id="player-0" cx="143.33333333333334" cy="59.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-1" cx="130" cy="91.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-2" cx="120" cy="83.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-3" cx="126.66666666666666" cy="83.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-4" cx="140" cy="95.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-5" cx="136.66666666666666" cy="103.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-6" cx="93.33333333333334" cy="91.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-7" cx="100" cy="103.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-8" cx="96.66666666666666" cy="83.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-9" cx="126.66666666666666" cy="31.999999999999886"></circle><circle r="2" class="player-circle" data-id="player-10" cx="120" cy="43.9999999999999"></circle><circle r="2" class="player-circle" data-id="player-11" cx="126.66666666666666" cy="31.999999999999886"></circle><circle r="2" class="player-circle" data-id="player-12" cx="130" cy="31.999999999999886"></circle><circle r="2" class="player-circle" data-id="player-13" cx="126.66666666666666" cy="19.999999999999943"></circle><circle r="2" class="player-circle" data-id="player-14" cx="76.66666666666667" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-15" cx="100" cy="67.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-16" cx="86.66666666666666" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-17" cx="93.33333333333334" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-18" cx="90" cy="59.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-19" cx="113.33333333333334" cy="83.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-20" cx="73.33333333333333" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-21" cx="50" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-22" cx="43.33333333333333" cy="91.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-23" cx="23.333333333333336" cy="119.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-24" cx="30" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-25" cx="53.33333333333333" cy="79.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-26" cx="40" cy="67.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-27" cx="80" cy="79.99999999999989"></circle><circle r="2" class="player-circle" data-id="player-28" cx="46.66666666666667" cy="87.9999999999999"></circle><circle r="2" class="player-circle" data-id="player-29" cx="66.66666666666667" cy="59.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-30" cx="36.666666666666664" cy="91.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-31" cx="50" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-32" cx="86.66666666666666" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-33" cx="126.66666666666666" cy="51.99999999999993"></circle><circle r="2" class="player-circle" data-id="player-34" cx="50" cy="91.99999999999991"></circle><circle r="2" class="player-circle" data-id="player-35" cx="46.66666666666667" cy="71.99999999999996"></circle><circle r="2" class="player-circle" data-id="player-36" cx="96.66666666666666" cy="47.9999999999999"></circle><circle r="2" class="player-circle" data-id="player-37" cx="23.333333333333336" cy="103.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-38" cx="16.666666666666668" cy="111.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-39" cx="43.33333333333333" cy="103.99999999999994"></circle><circle r="2" class="player-circle" data-id="player-40" cx="23.333333333333336" cy="83.99999999999989"></circle>';

var svgChartSm = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 140 120" xml:space="preserve"><g transform="translate(30,20)"><line id="yaLine" class="chart-marker-line" x1="-24" y1="10" x2="0" y2="10"></line><line id="xaLine" class="chart-marker-line" x1="-24" y1="10" x2="0" y2="10"></line><circle r="2" class="player-circle" data-id="player-0" cx="72.15686274509804" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-1" cx="87.84313725490196" cy="91.99999999999991"/><circle r="2" class="player-circle" data-id="player-2" cx="94.11764705882354" cy="103.99999999999994"/><circle r="2" class="player-circle" data-id="player-3" cx="75.29411764705883" cy="79.99999999999989"/><circle r="2" class="player-circle" data-id="player-4" cx="28.23529411764706" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-5" cx="134.90196078431373" cy="59.99999999999994"/><circle r="2" class="player-circle" data-id="player-6" cx="43.92156862745098" cy="87.9999999999999"/><circle r="2" class="player-circle" data-id="player-7" cx="94.11764705882354" cy="67.99999999999994"/><circle r="2" class="player-circle" data-id="player-8" cx="50.19607843137255" cy="79.99999999999989"/><circle r="2" class="player-circle" data-id="player-9" cx="122.35294117647058" cy="91.99999999999991"/><circle r="2" class="player-circle" data-id="player-10" cx="15.686274509803921" cy="111.99999999999994"/><circle r="2" class="player-circle" data-id="player-11" cx="119.2156862745098" cy="31.999999999999886"/><circle r="2" class="player-circle" data-id="player-12" cx="62.745098039215684" cy="59.99999999999994"/><circle r="2" class="player-circle" data-id="player-13" cx="40.78431372549019" cy="103.99999999999994"/><circle r="2" class="player-circle" data-id="player-14" cx="112.94117647058825" cy="43.9999999999999"/><circle r="2" class="player-circle" data-id="player-15" cx="34.50980392156863" cy="91.99999999999991"/><circle r="2" class="player-circle" data-id="player-16" cx="119.2156862745098" cy="31.999999999999886"/><circle r="2" class="player-circle" data-id="player-17" cx="122.35294117647058" cy="31.999999999999886"/><circle r="2" class="player-circle" data-id="player-18" cx="119.2156862745098" cy="19.999999999999943"/><circle r="2" class="player-circle" data-id="player-19" cx="112.94117647058825" cy="83.99999999999989"/><circle r="2" class="player-circle" data-id="player-20" cx="119.2156862745098" cy="83.99999999999989"/><circle r="2" class="player-circle" data-id="player-21" cx="81.56862745098039" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-22" cx="47.05882352941177" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-23" cx="90.98039215686273" cy="47.9999999999999"/><circle r="2" class="player-circle" data-id="player-24" cx="21.96078431372549" cy="103.99999999999994"/><circle r="2" class="player-circle" data-id="player-25" cx="87.84313725490196" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-26" cx="84.70588235294117" cy="59.99999999999994"/><circle r="2" class="player-circle" data-id="player-27" cx="90.98039215686273" cy="83.99999999999989"/><circle r="2" class="player-circle" data-id="player-28" cx="47.05882352941177" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-29" cx="37.64705882352941" cy="67.99999999999994"/><circle r="2" class="player-circle" data-id="player-30" cx="47.05882352941177" cy="91.99999999999991"/><circle r="2" class="player-circle" data-id="player-31" cx="131.76470588235293" cy="95.99999999999991"/><circle r="2" class="player-circle" data-id="player-32" cx="106.66666666666666" cy="83.99999999999989"/><circle r="2" class="player-circle" data-id="player-33" cx="81.56862745098039" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-34" cx="69.01960784313727" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-35" cx="144.31372549019608" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-36" cx="128.62745098039215" cy="103.99999999999994"/><circle r="2" class="player-circle" data-id="player-37" cx="43.92156862745098" cy="71.99999999999996"/><circle r="2" class="player-circle" data-id="player-38" cx="40.78431372549019" cy="91.99999999999991"/><circle r="2" class="player-circle" data-id="player-39" cx="21.96078431372549" cy="83.99999999999989"/><circle r="2" class="player-circle" data-id="player-40" cx="21.96078431372549" cy="119.99999999999996"/><circle r="3" id="highlightCircle" class="hl-circle" cx="300" cy="300" style="fill: rgba(0,86,137,1); stroke: rgba(0,86,137,0.5); stroke-width: 6"></circle><g transform="translate(0,140)"><g marker-end="url(#markerArrowRight)"><g><line class="st1" x1="-23.1" y1="13.5" x2="151.9" y2="13.5"/><g><polygon class="st2" points="150.2 19.2 160.1 13.5 150.2 7.8 "/></g></g></g></g><g><g marker-end="url(#markerArrowTop)"><g><line class="st1" x1="-23.1" y1="153.5" x2="-23.1" y2="1.5"/><g><polygon class="st2" points="-17.4 3.1 -23.1 -6.8 -28.8 3.1 "/></g></g></g></g></g><text transform="matrix(1 0 0 1 153.3332 161.6663)" id="weight-text" class="st2 st3 st4">weight</text><text transform="matrix(1 0 0 1 18.6665 23.6663)" id="height-text" class="st2 st3 st4">height</text></svg>';

var svgChart = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 210 180" xml:space="preserve" enable-background="new 0 0 210 180"><g transform="translate(30,20)"><line id="yaLine" class="chart-marker-line" x1="-24" y1="10" x2="0" y2="10"></line><line id="xaLine" class="chart-marker-line" x1="-24" y1="10" x2="0" y2="10"></line>'+playerCircles+'<circle r="3" id="highlightCircle" class="player-circle-hl" cx="300" cy="300" style="fill: rgba(0,86,137,1); stroke: rgba(0,86,137,0.5); stroke-width: 6"></circle><g transform="translate(0,140)"><g marker-end="url(#markerArrowRight)"><g><line class="st1" x1="-23.1" y1="13.5" x2="151.9" y2="13.5"/><g><polygon class="st2" points="150.2 19.2 160.1 13.5 150.2 7.8 "/></g></g></g></g><g><g marker-end="url(#markerArrowTop)"><g><line class="st1" x1="-23.1" y1="153.5" x2="-23.1" y2="1.5"/><g><polygon class="st2" points="-17.4 3.1 -23.1 -6.8 -28.8 3.1 "/></g></g></g></g></g><text transform="matrix(1 0 0 1 153.3332 161.6663)" id="weight-text" class="st2 st3 st4">weight</text><text transform="matrix(1 0 0 1 18.6665 23.6663)" id="height-text" class="st2 st3 st4">height</text></svg>';

var detailImgDiv = '<div class="item-photo-detail" style="background-image:url(<%= path %>/assets/imgs/players/{{{photo_filename}}});"></div>';

var svgDiv = '<div class="item-chart-detail">'+svgChart+'</div>'
var shareFn = share('The Guardian player-by-player guide to the British & Irish Lions 2017 squad','https://gu.com/p/4dzzp');
var closeBtnHTML = '<div class="close-overlay-btn"></div>';

var detailMobileTemplate = '<div class="detail-item-container" data-id="{{{id}}}" data-loaded="false"><div class="mobile-head-area">'+detailImgDiv+'<div class="mobile-head-area-text"><h5>{{{name}}} </h5><ul> <li><strong>Height</strong>{{{heightMetric}}}</li> <li><strong>Weight</strong>{{{weightMetric}}}</li> <li><strong>Age</strong>{{{Age}}}</li></ul></div></div>'+svgDiv+'<p class="detail-item-description">{{{Description}}}</p></div>'+closeBtnHTML;
var detailDesktopTemplate = '<div class="detail-item-container" data-id="{{{id}}}" data-loaded="false"><h5>{{{name}}} </h5><ul><li><strong>Height</strong>{{{heightMetric}}}</li> <li><strong>Weight</strong>{{{weightMetric}}}</li> <li><strong>Age</strong>{{{Age}}}</li></ul>'+svgDiv+'<p class="detail-item-description">{{{Description}}}</p></div>';


//import detailTemplate from '<%=path%>/templates/share.html!text'
let appPublicationDate = new Date(1493977421000);

let windowWidth;
let isInApp = false;

if(!window){
    windowWidth = 970;
    isInApp = true;
}else{
    windowWidth = window.innerWidth;
}
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

            console.log(dataset)

        }
    }



    xhr.open('GET', '<%= path %>/assets/players.json', true);
    xhr.send(null);

    //  if(!isMobile){
    //     moveDetailBox(document.querySelectorAll('.facewall-item')[0]);
    // } 

    [].slice.apply(document.querySelectorAll('.gv-share-container button')).forEach(shareEl => {
        var network = shareEl.getAttribute('data-network');

        shareEl.addEventListener('click',() => shareFn(network));
    });



}

function initScroll(){
    var windowHeight = window.innerHeight;
    var els = document.querySelectorAll('.facewall-item[data-loaded="false"]');
    var detailEls = document.querySelectorAll('.detail-item-container[data-loaded="false"]');
    //window.addEventListener( 'scroll', debounce(function(){checkScrollHeight('mainView')}, 10) );
   // if(isMobile){ document.querySelector('#detail-scroll-area').addEventListener('scroll', debounce(function(){checkScrollHeight('detailView')},10) ); }

    function checkScrollHeight(view){
        if(view === "mainView"){
            for(var i=0;i<els.length;i++){
                lazyLoadImage(i);

                // if(els[i].getBoundingClientRect().top < windowHeight - 5){
                //     els[i].setAttribute('data-showed','true');
                // }
            }
        }else if(view === "detailView" && isMobile){
            for(var i=0;i<detailEls.length;i++){
                 lazyLoadImage(i);
            }

            
        }

        if(isMobile){
            checkMobileDetail();
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


function hightlightPosition(posi){

    let a = [];

    [].slice.apply(dataset).forEach(el => {
        if(el.detailedPos == posi){ a.push(el.id)}

    });

    [].slice.apply(document.querySelectorAll('.player-circle')).forEach(el => {
        for (var i = 0; i < a.length; i++){
            if(el.getAttribute('data-id') == a[i]){
                el.classList.add("circle-position-hl");

            }
    
        }
    })

    //console.log(a)

    //<circle r="2" class="player-circle" data-id="player-35" cx="144.31372549019608" cy="71.99999999999996"></circle>


}

function moveDetailBox(pEl){
    let playerData = getPlayerData(pEl.getAttribute("data-id"));
    let detailTemplate;
    isMobile ? detailTemplate = detailMobileTemplate : detailTemplate = detailDesktopTemplate;

    let detailHTML = Mustache.render(detailTemplate, playerData);

    hightlightPosition(playerData.detailedPos);

    if(!isMobile){
        document.querySelector('.detail-box').innerHTML = detailHTML;
        document.querySelector('.mobile-detail-box').style.display = 'none';
    }

    if(isMobile){
         document.querySelector('.mobile-detail-box').innerHTML = detailHTML;
         document.querySelector('.mobile-detail-box').style.display = 'block';
         document.querySelector('.detail-box').display = 'none';
         document.querySelector('.close-overlay-btn').addEventListener('click', function(){ hideMobileDetail()});
    }
  
    var pOffset = pEl.getBoundingClientRect();
    var projectOffset = document.querySelector('.interactive-container').getBoundingClientRect();

    //console.log(pOffset, projectOffset)

    var elPosition = pOffset.top - projectOffset.top;   

    var totalOffset = elPosition + document.querySelector('#detail-box-container').getBoundingClientRect().height;
    var teamContainerHeight = document.querySelector('.interactive-container').getBoundingClientRect().height;
    var isOffscreen = totalOffset > teamContainerHeight;
        

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
        document.querySelector('#line-container').style.top = elPosition + ((pOffset.width/2)-10) + "px";
        document.querySelector('#line-container').style.left = pOffset.left + pOffset.width - projectOffset.left - 10 + "px"
        if(isOffscreen){ elPosition = elPosition - pOffset.height - 127; }
        document.querySelector('#detail-box-container').style.transform = 'translateY(' + elPosition + 'px)';
        document.querySelector('#detail-box-container').style.webkitTransform = 'translateY(' + elPosition + 'px)';
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

    let posiRef;

    [].slice.apply(document.querySelectorAll('.player-circle')).forEach(el => {
    
        let idRef = el.getAttribute('data-id').split("-")[1];  

        el.setAttribute('position-ref',dataset[idRef]['detailedPos'] ); 

            
            if(el.getAttribute('data-id') == playerData.id){  
                // el.setAttribute("r", "3");
                // el.setAttribute("style", "fill: rgba(0,86,137,1); stroke: rgba(0,86,137,0.5); stroke-width: 6");
                let oRef = el.getAttribute('data-id').split("-")[1];  
                let dataObj = dataset[oRef];

                posiRef = dataObj['detailedPos'];

                
                
                document.getElementById('xaLine').setAttribute("y1", 150)
                document.getElementById('xaLine').setAttribute("x1", el.getAttribute("cx"))
                document.getElementById('xaLine').setAttribute("y2", el.getAttribute("cy"))
                document.getElementById('xaLine').setAttribute("x2", el.getAttribute("cx"))

                document.getElementById('yaLine').setAttribute("y1", el.getAttribute("cy"))
                document.getElementById('yaLine').setAttribute("x2", el.getAttribute("cx"))
                document.getElementById('yaLine').setAttribute("y2", el.getAttribute("cy"))

                document.getElementById('highlightCircle').setAttribute("cx", el.getAttribute("cx"))
                document.getElementById('highlightCircle').setAttribute("cy", el.getAttribute("cy"))
            }
            //el.addEventListener('mouseover', () => moveDetailBox(el));
            //el.addEventListener('mouseout', () => hideDetail(el));    
    });

    [].slice.apply(document.querySelectorAll('.player-circle')).forEach(el => {
             if (el.getAttribute('position-ref') == posiRef){
             
                    el.classList.add("circle-position-hl");
             }   

        
    });

}

function checkMobileDetail(){

    if (document.querySelector('.mobile-detail-box')){
        if(document.querySelector('.mobile-detail-box').style.display=='block'){
           hideMobileDetail(); 
        }
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
    let pubDate = appPublicationDate;    

    if (!isInApp){ pubDate = new Date(window.guardian.config.page.webPublicationDate) } 
    let pubDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric', timeZone : 'UTC', timeZoneName : 'short'};
    let dateStr = pubDate.toLocaleDateString('en-GB',pubDateOptions).split(",").join(" ").split("  ").join(" ");

    document.querySelector(".time-stamp").innerHTML = dateStr;

    //console.log(pubDate);
}

 //.shortUrl

initTemplate();