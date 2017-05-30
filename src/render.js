import Mustache from 'mustache'
import fs from 'fs'
import rp from 'request-promise-native'
import groupArray from 'group-array'

import {
    uniq as _uniq
} from 'lodash';

import mainTemplate from './src/templates/main.html!text'
import headerTemplate from './src/templates/header.html!text'
import facewallTemplate from './src/templates/facewall.html!text'
import footerTemplate from './src/templates/footer.html!text'
import shareTemplate from './src/templates/share.html!text'
// import itemDetailTemplate from './src/templates/itemDetail.html!text';


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

    return `${headerHTML}${strStart}${shareHTML}${facewallHTML}${footerHTML}${strEnd}`;

}



function formatData(data) {
    let players = data.sheets.Players;
    let sectionsCopy = data.sheets.sectionHeads;
    let count = 0;

    players.map((player) => {
        player.id = "player-" + count;
        player.photo_filename = encodeURIComponent(player.name.replace(/'/, '') + '.jpg');
        player.homeNation = player["Home nation"];
        player.Description = player.description;
        player.Age = getPlayerAge(player["date of birth"]);
        player.detailedPos = player["detailed position"];
        player.heightMetric = player.Height.split(" / ")[0].toLowerCase();
        player.weightMetric = player.Weight.split(" / ")[0].replace(/\s/g, "").toLowerCase();
        player.heightMetricNumber = Number( player.heightMetric.substring(0, player.heightMetric.length - 1) );
        player.weightMetricNumber = Number( player.weightMetric.substring(0, player.weightMetric.length - 2) );
        count++;
    })

    let sectionTitles = getUniques(players, 'detailedPos');

    let sectionsArr = getSections(sectionTitles, players, 'detailedPos', sectionsCopy)

    players.sections = sectionsArr;

    fs.writeFileSync("./.build/assets/data/players.json", JSON.stringify(players));

    return players;
}



function getPlayerAge(d) {

    let playerAge = calculateAge(d.split('/')[1], d.split('/')[0], d.split('/')[2]);

    return playerAge;
}


function calculateAge(birthMonth, birthDay, birthYear) {
    var currentDate = new Date('2017/06/03');
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth();
    var currentDay = currentDate.getDate();
    var calculatedAge = currentYear - birthYear;

    if (currentMonth < birthMonth - 1) {
        calculatedAge--;
    }
    if (birthMonth - 1 == currentMonth && currentDay < birthDay) {
        calculatedAge--;
    }
    return calculatedAge;
}


//(sectionTitles, players, 'detailedPos', sectionsCopy)

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

                        // another for loop to add pla
                        for (var nn = 0; nn < b.length; nn++){
                            if(b[nn]['detailedPosition'] == copyArr[k]['position']) { tempArr.push(b[nn])}
                        }

                    //if(b[k]['detailedPosition'] == copyArr[k]['position']) { tempArr.push(b[k])}

                }
            }

            tempArr = _uniq(tempArr);

              for (var k = 0; k < tempArr.length; k++) {

                    console.log(d[i]['key'],tempArr[k]['name'], tempArr[k]['detailedPos'], )
              }

            d[i].items = tempArr;
        }

    //console.log(d)

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
