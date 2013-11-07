var apiget = {
	//What index is reaching in here for
	login: function(){

	},
	test: function(){
		var token = localStorage.getItem('key')
		if (localStorage.getItem('key') == null){
			window.location.href = '#mainpage';
		}else {
			$.ajax({
				beforeSend: function(xhr){
					xhr.setRequestHeader("Authorization", "Bearer " + token);
				},
				type: "get",
				url: "https://api.firehost.com/api/login",
				processData: false,
				async: false,
				//Authorization: {"Bearer " : token},
				success: function(s){
					alert('You have successfully been logged in.');
					window.location.href = '#dashboard';
				},
				error: function(e){
					alert('For security reasons, You have been logged out. Please login again.');
					window.location.href = '#mainpage';
				}
			});
		}
	},
	ticketlist: function(){
		var	token = localStorage.getItem('key');
		$.ajax({
			beforeSend:function(xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			type: "get",
			url: "https://api.firehost.com/api/ticket",
			processData: false,
			async: false,
			success: function(ticketlist){
				var allticketinfostring = JSON.stringify(ticketlist)
				console.log(allticketinfostring);
				console.log('>');
				console.log('>');
				var allticketinfo = $.parseJSON(allticketinfostring)
				console.log(allticketinfo);
				console.log('>');
				console.log('>');
				var allticketresults = allticketinfo.result
				console.log(allticketresults.id);
				console.log('>');
				console.log('>');
				var ticketitemstring = JSON.stringify(allticketresults);
				var ticketitem = $.parseJSON(ticketitemstring)
				var singleticketstring = JSON.stringify(allticketresults)
				var singleticket = $.parseJSON(singleticketstring)
									var oneticketstring = JSON.stringify(singleticket);
					var oneTicket = $.parseJSON(oneticketstring);
				$.each(oneTicket, function(){

					console.log(oneTicket.ticketNumber);
					$('#ticketitems').append('<li>' + ticketitem.ticketNumber + '</li>').trigger('create');
				});
			},
			error: function(ticketerror){
				alert ('There was an error, please try again later.');
			}
		});
	}
}


