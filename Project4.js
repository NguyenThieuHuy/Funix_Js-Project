//General
const loadingIcons = 
`<div class="spinner-border text-info" role="status">
<span class="visually-hidden">Loading...</span>
</div>`;

function backToTop() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
};

function add_post(contents,place){
	var publishedAt = new Date(contents.publishedAt)
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = 
    `<div class="row mt-4">
	<div class="col-md-7 order-md-2">
	  <h4><a href="${contents.url}" target="_blank" style="text-decoration: none; color: rgb(0, 109, 109);">${contents.title}</a></h4>
	  <span class="text-muted">${publishedAt.toString()}</span>
	  <blockquote>
	  ${contents.content}<br>
	  </blockquote>
	</div>
	<div class="col-md-5 order-md-1">
	  <img class="img-fluid mx-auto" src="${contents.image}" alt="thump-nail">
	</div>
  	</div>`;
    document.querySelector(place).append(post);
};

function loadKeyWords(keys){
	keys.forEach(key => {
		const post = document.createElement('div');
        post.innerHTML = `<li><a class="key">${key}</a></li>`;
        document.querySelector('#keyWords').append(post);
	});
};

function random_item(items){
	return items[Math.floor(Math.random()*items.length)];   
};
function loadRandom(query){
	document.querySelector('#random-news').innerHTML = loadingIcons;
    fetch(`https://gnews.io/api/v4/search?q=${query}&token=b48370c234eb2f147ac2a67e9fa7f5d7&max=5&lang=${lang}`)
    .then(response => response.json())
    .then(data => {
		if(data.articles != []){
			data.articles.forEach(art => {
				const post = document.createElement('div');
				post.className = 'randomNews';
				post.innerHTML =
				`<div class="feature col mt-2">
				<div class="feature-icon bg-primary bg-gradient">
				<img class="img-fluid mx-auto" src="${art.image}" alt="thump-nail">
				</div>
				<h5>${art.title}</h5>
				<p>${art.description}</p>
				<a target="_blank" href="${art.url}" class="icon-link">
				  Go to page
				  <i class="fa fa-angle-right bi"></i>
				</a>
				  </div>`;
				document.querySelector('#random-news').append(post);
			})
		}
		else{
			document.querySelector('#random-news').innerHTML = "<h4>Oops! There is no news at the moment...</h4>";
		}
    })
	.then(function() {document.querySelector('#random-news .spinner-border').remove()})
};

function loadSearchNews(query,place){
	document.querySelector(place).innerHTML = loadingIcons;
	fetch(`https://gnews.io/api/v4/search?q=${query}&token=a51f9228351d10de768dc0f630fc0ce9&max=5&lang=${lang}`)
    .then(response => response.json())
    .then(data => {
		if (data.articles != []) {
			data.articles.forEach(art =>{
				add_post(art,place)
			})	
		}
		else{
			document.querySelector(place).innerHTML = "<h3>Oops! There is no news at the moment...</h3>";
		}
	})
	.then(function() {document.querySelector(`${place} .spinner-border`).remove()})
}

//End General


//Function for Home page
var lang = "en";
function load(){
	document.querySelector('#posts').innerHTML = loadingIcons;
    fetch(`https://gnews.io/api/v4/top-headlines?&token=b48370c234eb2f147ac2a67e9fa7f5d7&lang=${lang}&from=${fromd}&to=${tod}`)
    .then(response => response.json())
    .then(data => {
		if (data.articles != []) {
			data.articles.forEach(art => {
				add_post(art,'#posts');
			});				
		}
		else{
			document.querySelector('#posts').innerHTML = "<h3>Oops! There is no news at the moment...</h3>";
		}
    })
	.then(function() {document.querySelector('#posts .spinner-border').remove()})
};
// document.addEventListener('DOMContentLoaded',load,loadRandom,loadKeyWords);
// window.onscroll = ()=>{
//     while(window.innerHeight + window.scrollY >= document.body.offsetHeight){
//         tod = fromd;
//         fromd.setDate(fromd.getDate() - 1);
//         load();
//     }
// };
function loadKeyWordsContents(query){
	document.querySelector('#posts').innerHTML = loadingIcons;
    fetch(`https://gnews.io/api/v4/search?q=${query}&token=a51f9228351d10de768dc0f630fc0ce9&lang=${lang}`)
    .then(response => response.json())
    .then(data => {
		if (data.articles != []) {
			data.articles.forEach(art => {
				add_post(art,'#posts');
			});
		}
		else{
			document.querySelector('#posts').innerHTML = "<h3>Oops! There is no news at the moment...</h3>";
		}
    })
	.then(function() {document.querySelector('#posts .spinner-border').remove()})
};
//End Home page


//Functions for My News page
var fromd = new Date();
var tod = new Date();
fromd.setHours(0,0,0);
const myNewsParam = {
	'q' : 'example',
	'lang' : 'any',
	'country' : 'any',
	'from' : fromd.toISOString(),
	'to' : tod.toISOString(),
	'sortby' : 'publishedAt',
	'max' : 10,
}
function myNewsSetting(q, lang, country, from, to, sortby, max){
	myNewsParam.q = q;
	myNewsParam.lang = lang;
	myNewsParam.country = country;
	myNewsParam.from = from;
	myNewsParam.to = to;
	myNewsParam.sortby = sortby;
	myNewsParam.max = max;
}
function loadMyNews(){
	document.querySelector('#mynews').innerHTML = loadingIcons;
    fetch(`https://gnews.io/api/v4/search?q=${myNewsParam.q}&token=a51f9228351d10de768dc0f630fc0ce9&lang=${myNewsParam.lang}&country=${myNewsParam.country}&max=${myNewsParam.max}&from=${myNewsParam.from}&to=${myNewsParam.to}&sortby=${myNewsParam.sortby}`)
    .then(response => response.json())
    .then(data => {
		if (data.articles != []) {
			data.articles.forEach(art => {
				add_post(art,'#mynews');
			});
		} else {
			document.querySelector('#mynews').innerHTML = "<h3>Oops! There is no news at the moment...</h3>";
		}
    })
	.then(function() {document.querySelector('#mynews .spinner-border').remove()})
}
//End My News


//JQuery to manage events and functions

$(function(){
	//onStart actions
	load();
	loadMyNews();
	loadRandom();
	//Get Google_Trend XML || Json file for keyWords
	// keyWords = [];
	// const keyWordsRequest = request('Project4.json'||'https://trends.google.com/trends/trendingsearches/daily?geo=US');
	// const items = keyWordsRequest.item;
	// items.forEach(i => {
	// 	keyWords.push(i.title);
	// });
	//Use Bingnews API for keyWords
	// const settings = {
	// 	"async": true,
	// 	"crossDomain": true,
	// 	"url": "https://bing-news-search1.p.rapidapi.com/news?safeSearch=Off&textFormat=Raw",
	// 	"method": "GET",
	// 	"headers": {
	// 		"X-BingApis-SDK": "true",
	// 		"X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
	// 		"X-RapidAPI-Key": "617723578bmshc9ac236fceafec8p1cfcdejsn804787135476"
	// 	}
	// };
	// $.ajax(settings).done(function (response) {
	// 	console.log(response);
	// 	response.value.forEach(v => {
	// 		keyWords.push(v.name);
	// 	});
	// });

	const keyWords = ["Morbius","Jordan Poole","Rob Kardashian","Chris Pine","Aphasia","USMNT","Bruce Arians","Tom Parker","Tornado Watch","Paul Herman","Hunter Biden","Wears Valley Fire","Eric Church","Mexico","Foo Fighters drummer Taylor Hawkins","World Cup 2022","House of the Dragon","Malcolm Jenkins","Sixers","Naomi Irion",]
	loadKeyWords(keyWords);

	//Fetch data from form to customize My News
	$("#form").submit(function(){
		$('#mynews').empty();
		var q = $('#form-keywords').val();
		q.replace(/ /g,'+');
		var lang = $('#form-lang').val();
		var country = $('#form-country').val();
		var from = $('#form-from').val();
		var to = $('#form-to').val();
		var sortby = $('#form-sort').val();
		var max = $('#form-max').val();
		myNewsSetting(q, lang, country, from, to, sortby, max);
		$('.main:visible').css('display','none');
		$(`#mynews`).slideDown(1000);
		loadMyNews();
	})

	//Back to top
	$('.topbtn').click(function(){
		backToTop();
	})

	//Load recommented keywords
	$('.key').click(function(){
		var query = $(this).html().replace(/ /g,'+');
		$('.main:visible').css('display','none');
		$(`#posts`).slideDown(1000);
		loadKeyWordsContents(query);
		$("#posts").empty();
	});

	//Nav-bar page toggle
    $('.page').click(function (){
		$('.main:visible').css('display','none');
		$(`#${$(this).data("page")}`).slideDown(1000);
	});

	//Change language
	$('.lang').click(function(){
		lang = $(this).attr('name');
		$("#posts").empty();
		$("#random-news").empty();
		load();
		loadRandom();
	});

	//Feature news box
	$("#ref-btn").click(function(){
		$("#random-news").empty();
		var query = random_item(keyWords).replace(/ /g,'+');
		$("#ref-btn i").addClass("spin");
		setTimeout(
			function() 
			{
				$("#ref-btn i").removeClass("spin");
			}, 1000);
		loadRandom(query);
	});

	//Load more keywords
	$(".key:hidden").slice(0, 5).css("display", "block");
	$("#loadMore").click(function(){
		$(".key:hidden").slice(0,3).fadeIn().css("display", "block");
		if($(".key:hidden").length == 0) {
		$("#loadMore").fadeOut();
		}
	});

	//LoadSearchBar
	$('#search-form').submit(function(){
		var query = $('#searchBar').val();
		if (query != '') {
			$('#posts').empty();
			$('.main:visible').css('display','none');
			$(`#posts`).slideDown(1000);
			loadSearchNews(query,'#posts');
		}
		else{
			alert('Please input something before search!')
		}
	})

	//LoadSearchBarModel
	$('#search-form-modal').submit(function(){
		var query = $('#searchBarModal').val();
		if (query != '') {
			$('#searchModal').empty();
			loadSearchNews(query,'#searchModal');
		}
		else{
			alert('Please input something before search!')
		}
	})
});