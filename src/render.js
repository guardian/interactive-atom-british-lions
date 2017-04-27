import Mustache from 'mustache'
import fs from 'file-system'
import rp from 'request-promise'
import groupArray from 'group-array'

import {
    uniq as _uniq
} from 'lodash';

import mainTemplate from './src/templates/main.html!text'
import headerTemplate from './src/templates/header.html!text'
import facewallTemplate from './src/templates/facewall.html!text'
import footerTemplate from './src/templates/footer.html!text'
import shareTemplate from './src/templates/share.html!text'
//import itemDetailTemplate from './src/templates/itemDetail.html!text'


export async function render() {
    let data = formatData(await rp({
        uri: 'https://interactive.guim.co.uk/docsdata-test/1F-yKs6ij4c1uLMRLWVtzIyzp3PZEgR_iZouKUM5fsf4.json',
        json: true
    }));

    let strStart = "<div class='interactive-container'>";

    let strEnd = "</div>" 

    let shareHTML = Mustache.render(shareTemplate);

    let headerHTML = Mustache.render(headerTemplate);

    let footerHTML = Mustache.render(footerTemplate);

    let facewallHTML = Mustache.render(facewallTemplate, { "sections": data.sections });

    //let itemDetailHTML = Mustache.render(itemDetailTemplate);  

    //Mustache.registerPartial('itemDetail',itemDetailHTML);

    return `${headerHTML}${strStart}${shareHTML}${facewallHTML}${footerHTML}${strEnd}`;

}



function formatData(data) {
    let players = data.sheets.Players;
    let sectionsCopy = data.sheets.sectionHeads;
    let count = 0;
    players.map((player) => {


    	player.id = "player-"+count;
    	player.flag = 'Ireland.svg';
    	player.photo_filename = player.name.replace(/'/,'')+'.jpg';
    	player.homeNation = player["Home nation"];
    	count++;

    })

    let sectionTitles = getUniques(players, 'detailed position');

    let sectionsArr = getSections(sectionTitles, players, 'detailed position', sectionsCopy)

    players.sections = sectionsArr;

    return players;
}



function getSections(a, b, s, copyArr) {
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

        for (var k = 0; k < copyArr.length; k++) {

            if (d[i].key == copyArr[k]['position']) {
                d[i].head = copyArr[k]['title']
                d[i].description = copyArr[k]['description']
                tempArr.push(b[k]);
            }
        }

        d[i].items = tempArr;
    }

    return d;

}



function getUniques(a, s) {
    let t = []

    for (var i = 0; i < a.length; i++) {
        t.push(a[i][s])
    }

    let newArr = _uniq(t, s);

    return newArr;
}




