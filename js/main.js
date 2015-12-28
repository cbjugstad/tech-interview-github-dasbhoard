$(function(){
	//click event for refresh button
  $('#github-button').on('click', function(e){
  	e.preventDefault();
    var endPoint = 'https://api.github.com/events';
    getEvents(endPoint, 'githubPublic');
  });

  //click event for refresh button
  $('#log-in').on('click', function(e){
  	e.preventDefault();
  	var username = $('#username').val();
  	var password = $('#password').val();
  	getUser(username, password);
  });

  //Handles creation of html for events
  function processEvents(element, index, array) {
  	var eventHtml = '';
  	eventHtml += '<div class="event clearfix">';
  	eventHtml += '<div class="event-left">';
  	if(element.actor.hasOwnProperty('avatar_url')){
  		eventHtml += '<div class="event-field">';
  		eventHtml += '<img src="' + element.actor.avatar_url + '">';
  		eventHtml += '</div>';
  	}
  	eventHtml += '</div>';
  	eventHtml += '<div class="event-right">';
  	if(element.actor.hasOwnProperty('login')){
  		eventHtml += '<div class="event-field">';
  		eventHtml += '<h3>UserName: ' + element.actor.login + '</h3>';
  		eventHtml += '</div>';
  	}
  	if(element.hasOwnProperty('type')){
  		eventHtml += '<div class="event-field">';
  		eventHtml += '<p>Type of Event: ' + element.type + '</p>';
  		eventHtml += '</div>';
  	}
  	eventHtml += '<span>Click to show more details...</span>';
  	eventHtml += '<div class="event-details">';
  	if(element.hasOwnProperty('created_at')) {
  		var eventDate = convertDate(element.created_at);
  		eventHtml += '<div class="event-field">';
  		eventHtml += 'Date Created: ' + eventDate;
  		eventHtml += '</div>';
  	}
  	if(element.repo.hasOwnProperty('name')){
  		eventHtml += '<div class="event-field">';
  		eventHtml += '<p>Repo Name: ' + element.repo.name + '</p>';
  		eventHtml += '<a target="_blank" href="https://github.com/' + element.repo.name + '">Link to Repo</a>';
  		eventHtml += '</div>';
  	}
  	eventHtml += '</div>';
  	eventHtml += '</div>';
  	eventHtml += '</div>';

  	//checks where to place event for user or public github feed
  	if (array.typeOfRequest == 'githubPublic') {
  		$("#event-data").append(eventHtml);
  	}
  	else if (array.typeOfRequest == 'githubUser') {
  		$("#user-data").append(eventHtml);
  	}

  	$('.event').click(function(){
    	$(this).addClass("active");
		})
  }

  //handles date object event date field
  function convertDate(eventDate) {
  	var myDate = new Date(eventDate);
    return myDate;
  }

  //calls for json of events
	function getEvents(url, type) {
		var myEvents = $.ajax({ url: url,})
		myEvents.done(function(response) {
			if (type == 'githubPublic') {
				$('#event-data').html('');
			}
			else if(type == 'githubUser') {
				$('#user-data').html('');
			}
			response.typeOfRequest = type;
			response.forEach(processEvents);
		});
	}

	//authenticates user and calls for user events
	function getUser(username, password) {
		myUser = $.ajax({ 
	    url: 'https://api.github.com/user',
	    type: 'POST',
	    beforeSend: function(xhr) { 
	        xhr.setRequestHeader("Authorization", "Basic " + btoa(username + ':' + password)); 
	    },
	    statusCode: {
         401: function() {
            alert('Bad UserName or Password');
         },
         401: function() {
            alert('Bad UserName or Password');
         },
       },
		  data: '{"note":"This is for basic authentication"}'
		});

		if(myUser != '') {
			myUser.done(function(response) {
		    var userHtml = '';
		    userHtml += '<div class="user">';
		    userHtml += '<div class="user-image"><img src="' + response.avatar_url + '"></div>';
		    userHtml += '<p>' + response.login + '</p>';
		    userHtml += '</div>';
		    $(".user-area").append(userHtml);
		    $('#log-in-fields').html('');
		    getEvents(response.url + '/events', 'githubUser');
			});
		}
	}

	//calls feed on page load
	$("#github-button").click();
});

//uses jquery p2r to handle the pull down refresh of public events
$("body").ready(function _onbodyready() {
  $(".header-area").pullToRefresh()
  /*
   .on("start.pulltorefresh", function (evt, y){
    })
   .on("move.pulltorefresh", function (evt, percentage){
     })
   .on("end.pulltorefresh", function (evt){
    })
	*/
   .on("refresh.pulltorefresh", function (evt, y){
     $( "#github-button" ).click();
   });
});

