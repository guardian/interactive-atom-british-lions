var fs = require('fs-extra');
var nsg = require('node-sprite-generator');
var curl = require('curlrequest');
var path = require('path');


var sheets;
var input_folder = 'players/';
var output_folder = 'output/';
var sprites = 'sprites/';
var sprite_imgs = sprites + 'img';
var sprite_css = sprites + 'css';

var data_folder = 'team_data'

var final_src = '../src/';
var final_css = final_src + 'css/teams/';
var final_imgs = final_src + 'assets/imgs/teams/';

var team;
var action;


var team_data = {
  'all': '1F-yKs6ij4c1uLMRLWVtzIyzp3PZEgR_iZouKUM5fsf4'
}




//sheets = fs.readJsonSync('data.json', 'utf8').sheets;

// sheets = fs.readFile('data.json', 'utf-8', function(err, data ) {
//    console.log( data );
// });

function init(){

	process.argv.forEach(function (val, index, array) {
	  if(index == 2) { action = val };
	});



	if(action == 'fetch'){
		fetchData();
		rewriteFileNames();
	} else if(action == 'create') {
		makeImages();
	}
}

function fetchData(){

	fs.emptyDirSync( data_folder );

	var base = __dirname;

	for( team in team_data){

		//console.log(team)
		var url = 'https://interactive.guim.co.uk/docsdata-test/' + team_data[team] + '.json';

		curlData(url, team);

	}
}

function curlData(url, team){

	curl.request( {url: url}, function (err, data) {
		console.log(team)
		fs.writeFileSync(data_folder + '/' + team.replace(/ /g, '') + '.json', data);

	});
}

function rewriteFileNames(){

	//re-write the files names
	fs.emptyDirSync(output_folder, function (err) { })
	fs.emptyDirSync( sprite_imgs );
	fs.emptyDirSync( sprites + '/css');

	//rename files
	var base = __dirname;
	var items = [] // files, directories, symlinks, etc
	fs.walk(input_folder)
	  .on('data', function (item) {

	  	if(item.stats.isFile()){
	  		items.push(item.path.replace(base + '/', ''))
	  	}

	  })
	  .on('end', function () {
		   // console.dir(items) // => [ ... array of files]
		    items.forEach(function(f){

		    	var new_file = f.split('/');

		    	new_file[new_file.length - 1] = new_file[new_file.length - 1]
										    	.replace(/å/g, '')
										    	.replace(/ä/g, '')
		    									.replace(/é/g, '')
		    									.replace(/è/g, '')
		    									.replace(/ë/g, '')
		    									.replace(/î/g, '')
		    									.replace(/í/g, '')
		    									.replace(/ü/g, '')
		    									.replace(/Ö/g, '')
		    									.replace(/ö/g, '')
		    									.replace(/ø/g, '')
		    									.replace(/ç/g, '')
		    									.replace(/Ç/g, '')
		    									.replace(/ /g, '')
		    									.replace(/'/g, '')
		    									.replace(/-/g, '');



		    	new_file = new_file.join('/')

		    	if( new_file != f){
		    		//console.log(new_file, f)
		    		fs.copySync(f, new_file );
		    	}

		    })
	  })
}








function makeImages(){


	for( team in team_data){


			var players = fs.readJsonSync( data_folder + '/' + team.replace(/ /g, '') +  '.json', 'utf-8').sheets.Players
			createTeam(team, players);

	}




}


function createTeam(team, players){

	console.log('creates team: ' + team)

	//console.log(team, players)
	var orig_src = 'players/';
	var src = output_folder + '/orig/';



	fs.emptyDirSync( src );



	//create folder


	players.forEach(function(p, i){
		//console.log(p.name)

		var file = p.name.trim().replace(/[^a-zA-Z 0-9.]+/g,'').replace(/ /g, '').replace(/-/g, '')

		//console.log('file' + file)

    console.log(orig_src + file + '.jpg')
		if( fs.existsSync(orig_src + file + '.jpg') ){
			fs.copySync(orig_src + file + '.jpg', src + file + '.jpg', { clobber: true} );
		} else {
			console.log( 'FAILED TO FIND IMAGE: ' + team + '   ' +file )
		}

	})




	makeTeamSprite(team, players, 180, src, function(){
		makeTeamSprite(team, players, 240, src, function(){
			makeTeamSprite(team, players, 260, src);
		});
	});



}

function makeTeamSprite(team, players, size, src, callback){

	var orig_width = 400;
	var multiplier_width = size / 400;

	var css_path = 'sprites/css/' + team + '-' + size + '.css';
	var img_path = 'sprites/img/' + team + '-' + size + '.jpg';

	nsg({
	    src: [
	        src + '/*.jpg'
	    ],
	    spritePath: img_path,
	    stylesheet: 'prefixed-css',
	    stylesheetPath: css_path,
	    layout: 'packed',
	    compositor: 'gm',
	    compositorOptions: {
			compressionLevel: 6
		},
	    layoutOptions: {
	        scaling: multiplier_width

	    },
	    stylesheetOptions: {
	    	pixelRatio : 2
	    }
	}, function (err) {
	    console.log(err);
	    	if(callback){
	    		callback();
	    	}

			fs.readFile(css_path, 'utf8', function (err,data) {
			  if (err) {
			    return console.log(err);
			  }
			  var result = data.replace('../img/', 'assets/imgs/teams/');

			  fs.writeFile(css_path, result, 'utf8', function (err) {
			     if (err) return console.log(err);

			     moveIntoPlace( css_path, img_path, team + '-' + size );
			  });
			});


	});


}

function moveIntoPlace(css_path, img_path, filename){

	try {
	  fs.copySync(css_path , final_css + filename + '.scss')
	  console.log("success!" + filename + ' css');
	} catch (err) {
		if(err){
			console.error(err)
		}

	}

	try {
	  fs.copySync(img_path , final_imgs + filename + '.jpg')
	  console.log("success:" + filename + ' jpg');
	} catch (err) {
		if(err){
			console.error(err)
		}

	}



}


console.log('hi')
init();
