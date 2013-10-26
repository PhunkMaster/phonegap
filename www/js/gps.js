var gps = {
/* 	acquire: function(){
	receivedEvent: function(id) {
	var parentElement = document.getElementById(id);
	var listeningElement = parentElement.querySelector('.acquiring');
	var receivedElement = parentElement.querySelector('.acquired');

	acquiringElement.setAttribute('style', 'display:none;');
	acquiredElement.setAttribute('style', 'display:block;');
	
	console.log('Received Event: ' + id);
	} */
	/*acquire: function(){
		//var parentElement = document.getElementById(id);
		//var acquiringElement = parentElement.querySelector('.acquiring');
		//var acquiredElement = parentElement.querySelector('.acquired');
		//acquiringElement.setAttribute('style', 'display:none;');
	}*/
	

	//What index is reaching in here for
	acquire: function(){
		//we are setting the variables that the GPS will call
		/*
		Success is what the GPS function will call if all is well
		The GPS returns 'position' on success so we need to have a function of that
		*/
		var success = function(position){
			//Doing some stuff with the position here.
			alert('Latitude: ' + position.coords.latitude  + '\n' + 
			'Longitude: '+ position.coords.longitude         + '\n' +
			'Altitude: '          + position.coords.altitude          + '\n' +
			'Accuracy: '          + position.coords.accuracy          + '\n' +
			'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
			'Heading: '           + position.coords.heading           + '\n' +
			'Speed: '             + position.coords.speed             + '\n' +
			'Timestamp: '         + position.timestamp                + '\n');
		}
		
		/*
		Failure is what the GPS function will call if it fails
		The GPS returns 'error' on a failure so we need to have a function of that
		*/
		var failure = function(error){
			//Doing some error handling here.
			alert('There was an error acquiring your GPS location');
		}
		
		/*
		Set some GPS options to get a better fix
		*/
		navigator.geolocation.getCurrentPosition.Options = { maximumAge: 100, timeout: 5000, enableHighAccuracy: true };
		
		/*
		We need to get the GPS to return information, this calls the GPS function
		with success if it gets 'position'
		and faulire if it gets 'error'
		*/
		navigator.geolocation.getCurrentPosition(success, failure);
	}
/*
To Do:
	Update the DOM with my values
	
Things I have learned here:
	The web page will call the correct var from the file 
		It will then need to know what to do in the file
		Need to call which function of the var in the file
	Alert will provide a popup
	Console.log is useless on android

Questions:
	Can I call acquire: differently?
*/
}


