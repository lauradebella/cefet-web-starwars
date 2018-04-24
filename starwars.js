// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.co/
// para carregar:
//  - A lista de filmes
//  - A introdução de cada filme, quando ele for clicado
$(document).ready(() => {
	let episode = localStorage.getItem('episode');
	if(episode)
		introduction(episode);
});

const episodeNumbers = id => {
	let episodes = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
	return episodes[parseInt(id)];
}

const introduction = text => {
	localStorage.setItem('episode', text);
	$('.reading-animation').html(text);
}

$.ajax({
	url: 'http://swapi.co/api/films',
	method: 'get',
	success: response => {
		let $ul = $('#movies ul');

		let films = response.results.sort((first, second) => first.episode_id > second.episode_id)
		
		films.forEach(film => {
			let $li = $('<li>', {
				'data-episode-url': film.url, 
				'text': 'Episode ' + episodeNumbers
			(film.episode_id)
			});

			$ul.append($li);
		});
	}
});


$("#movies ul").on('click', 'li', function(e){
	let url = $(e.target).data('episode-url');

	$.ajax({
		url: url,
		method: 'get',
		success: response => {
			let episode = episodeNumbers
		(response.episode_id);
			let text = 'Episode ' + episode + '\n' +
					 	response.title + '\n\n' +
			 		    response.opening_crawl;

			introduction(text);
		}
	});
});