var gps = {
	//What index is reaching in here for
	acquire: function(){
		//we are setting the variables that the GPS will call
		/*
		Success is what the GPS function will call if all is well
		The GPS returns 'position' on success so we need to have a function of that
		*/
		var status = document.getElementById("acqstatus");
		var map = document.getElementById("map");
		var success = function(position){
			//Doing some stuff with the position here.
			//Update the DOM
			status.innerHTML=('Your GPS coordinates have been acquired');
			$('#gpsinfo').append('Timestamp: '+ position.timestamp).trigger('create');
			$('#gpsinfo').append('</br>Latitude: ' + position.coords.latitude).trigger('create');
			$('#gpsinfo').append('</br>Longitude: '+ position.coords.longitude).trigger('create');
			$('#gpsinfo').append('</br>Altitude: ' + position.coords.altitude).trigger('create');
			$('#gpsinfo').append('</br>Accuracy: ' + position.coords.accuracy).trigger('create');
			$('#gpsinfo').append('</br>Altitude Accuracy: ' + position.coords.altitudeAccuracy).trigger('create');
			$('#gpsinfo').append('</br>Heading: ' + position.coords.heading).trigger('create');
			$('#gpsinfo').append('</br>Speed: ' + position.coords.speed).trigger('create');
			//Let's get a map!
			var lat = position.coords.latitude
			var long = position.coords.longitude
			lat = lat.toFixed(6);
			long = long.toFixed(6);
			map.src=("https://maps.googleapis.com/maps/api/staticmap?size=288x200&sensor=false&zoom=13&center=" 
				+ lat + "," + long + "&markers=color:red%7Clabel:A%7C" + lat + "," + long);
		}
		
		/*
		Failure is what the GPS function will call if it fails
		The GPS returns 'error' on a failure so we need to have a function of that
		*/
		var failure = function(error){
			//Doing some error handling here.
			header.innerHTML="Could not acquire GPS";
			status.innderHTML="Your GPS coordinates could not be acquired";
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


