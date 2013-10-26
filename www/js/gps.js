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
		var header = document.getElementById("header");
		var status = document.getElementById("acqstatus");
		var success = function(position){
			//Doing some stuff with the position here.
			//Update the DOM
			header.innerHTML="Acquired GPS";
			status.innerHTML=('Your GPS coordinates have been acquired' + '</br>' + '</br>' + 'Latitude: ' + position.coords.latitude  + '</br>' + 
			'Longitude: '+ position.coords.longitude         + '</br>' +
			'Altitude: '          + position.coords.altitude          + '</br>' +
			'Accuracy: '          + position.coords.accuracy          + '</br>' +
			'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '</br>' +
			'Heading: '           + position.coords.heading           + '</br>' +
			'Speed: '             + position.coords.speed             + '</br>' +
			'Timestamp: '         + position.timestamp                + '</br>');
		}
		
		/*
		Failure is what the GPS function will call if it fails
		The GPS returns 'error' on a failure so we need to have a function of that
		*/
		var failure = function(error){
			//Doing some error handling here.
			alert('There was an error acquiring your GPS location');
			header.innerHTML="Could not acquire GPS";
			status.innderHTM="Your GPS coordinates could not be acquired";
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


