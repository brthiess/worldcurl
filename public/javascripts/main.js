$(document).ready(function(){
	$(window).scroll(function (event) {
		var y = $(this).scrollTop();
		if (y >= 400)
		  $('.logo-container img').addClass('small');
		else
		  $('.logo-container img').removeClass('small');
	});
});

/* Scoreboard */
function showCompetition(listItem, competitionId){
	getScoresView(competitionId, function(viewHtml){
		$('.scores-container').replaceWith(viewHtml);
		$('.competition-list-item').removeClass('active');
		$(listItem).addClass('active');
		currentCompetitionId = competitionId;
		currentDrawId = $('.scores-container [data-draw-id]').attr('data-draw-id');
	});
}

function refreshDrawScores(){
	if(currentCompetitionId !== null && currentDrawId !== null && currentCompetitionId > 0 && currentDrawId > 0){
		console.log('refreshing scores');
		getDrawScoresJSON(currentCompetitionId, currentDrawId, function(data){
			for (var game in data.games){
				
				$("[data-game-id='" + game + "']").find("[data-score1]").html(data.games[game].score1);
				$("[data-game-id='" + game + "']").find("[data-score2]").html(data.games[game].score2);
				var end = (data.games[game].over ? "Final (" + data.games[game].end + ")" : ordinal_suffix_of(data.games[game].end) + " end");
				$("[data-game-id='" + game + "']").find("[data-end]").html(end);
			}
			setTimeout(refreshDrawScores, 10000);
		});
	}
	else {
		console.log('try again');
		setTimeout(refreshDrawScores, 10000);
	}
}
function showOnScoreboard(section) {
	$("[data-scoreboard-section]").removeClass('active');
	$("[data-scoreboard-section=" + section + "]").addClass('active');
}




/********
Functions 
*********/
function ordinal_suffix_of(i) {
	var j = i % 10,
		k = i % 100;
	if (j == 1 && k != 11) {
		return i + "st";
	}
	if (j == 2 && k != 12) {
		return i + "nd";
	}
	if (j == 3 && k != 13) {
		return i + "rd";
	}
	return i + "th";
}