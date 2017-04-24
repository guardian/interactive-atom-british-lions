import Mustache from 'mustache'
import fs from 'file-system'
import rp from 'request-promise'
import groupArray from 'group-array'

import {
    uniq as _uniq
} from 'lodash';

import mainTemplate from './src/templates/main.html!text'
import facewallTemplate from './src/templates/facewall.html!text'

export async function render() {
    let data = formatData(await rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1F-yKs6ij4c1uLMRLWVtzIyzp3PZEgR_iZouKUM5fsf4.json',
        json: true
    }));

    let facewallHTML = Mustache.render(facewallTemplate, { "sections": data.sections });

    console.log(data.sections)

    return `${facewallHTML}`;

}

function formatData(data) {

    let players = data.sheets.Players;
    let count = 0;
    players.map((player) => {
    	player.id = "player-"+count;
    	player.flag = 'Ireland.svg';
    	player.photo_filename = 'Sam_Warburton.jpg';
    	player.homeNation = player["Home nation"];
    	count++;

    })

    let sectionTitles = getUniques(players, 'position');

    let sectionsArr = getSections(sectionTitles, players, 'position')

    players.sections = sectionsArr;

    return players;
}



function getSections(a, b, s) {
    let d = [];

    // set array framework
    for (var i = 0; i < a.length; i++) {
        let o = { key: a[i], items: [] }
        d.push(o)
    }

    for (var i = 0; i < d.length; i++) {

        let tempArr = [];
        for (var k = 0; k < b.length; k++) {

            if (d[i].key == b[k][s]) {
                tempArr.push(b[k]);
            }
        }

        d[i].items = tempArr;
    }

    return d;

}

// function initScroll(){
//     var windowHeight = window.innerHeight;
//     var els = document.querySelectorAll('.facewall-item[data-loaded="false"]');
//     var detailEls = document.querySelectorAll('.detail-item-container[data-loaded="false"]');
//     window.addEventListener( 'scroll', debounce(function(){checkScrollHeight('mainView')}, 10) );
//     if(isMobile){ document.querySelector('#detail-scroll-area').addEventListener('scroll', debounce(function(){checkScrollHeight('detailView')},10) ); }

//     function checkScrollHeight(view){
//         if(view === "mainView"){
//             for(var i=0;i<els.length;i++){
//                 if(els[i].getBoundingClientRect().top < windowHeight * 1.5){ lazyLoadImage(i); }

//                 if(els[i].getBoundingClientRect().top < windowHeight - 5){
//                     els[i].setAttribute('data-showed','true');
//                 }
//             }
//         }else if(view === "detailView" && isMobile){
//             for(var i=0;i<detailEls.length;i++){
//                 if(detailEls[i].getBoundingClientRect().top < windowHeight * 2){ lazyLoadImage(i); }
//             }
//         }
//     };   

//     function lazyLoadImage(index){
//         els[index].setAttribute('data-loaded','true');
//         var baseUrl = "https://interactive.guim.co.uk/2016/08/olympics-athletes-photos/";
//         if(isMobile) { baseUrl = "https://interactive.guim.co.uk/2016/08/olympics-athletes-photos/optim/" }

//         var itemPhoto = els[index].querySelector('.item-photo').getAttribute('data-src');
//         els[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + encodeURIComponent(itemPhoto) + ")"
        
//         if(isMobile){
//            detailEls[index].setAttribute('data-loaded','true'); 
//            detailEls[index].querySelector('.item-photo').style.backgroundImage = "url(" + baseUrl + encodeURIComponent(itemPhoto) + ")"
//         } 
//     }

//     checkScrollHeight('mainView');
// }

function getUniques(a, s) {
    let t = []

    for (var i = 0; i < a.length; i++) {
        t.push(a[i][s])
    }

    let newArr = _uniq(t, s);

    return newArr;
}


