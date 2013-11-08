var apiget = {
	//What index is reaching in here for
	login: function(username, password, tenant){
		$.ajax({
			type : "post", 
			url : "https://api.firehost.com/api/login", 
			data : JSON.stringify({
				userName : $('#username').val(), 
				password: $('#password').val(), 
				tenant : $('#tenant').val().toUpperCase()}), 
			processData: false, 
			async: false,
			contentType: "application/json",
			success: function(s){
		  		var loginresponse = JSON.stringify(s)
		  		var stringresponse = $.parseJSON(loginresponse);
		  		var token = stringresponse.result.token
		  		localStorage.setItem('key', token);
		  		//alert(localStorage.getItem('key'));
		  		window.location.replace("#tickets")
		  	},
		  	error: function(e){
		  		var loginresponse = JSON.stringify(e)
		  			console.log('loginresponse ' + loginresponse);
		  		var stringresponse = $.parseJSON(loginresponse);
		  			console.log('stringresponse' + stringresponse);
		  		var errorresponse = stringresponse.responseText
		  			console.log('errorresponse ' + errorresponse)
		  		var stringerrorresponse = $.parseJSON(errorresponse);
		  			console.log('stringerrorresponse ' + stringerrorresponse);
		  		var errormsg = JSON.stringify(stringerrorresponse.error)
		  			console.log('error ' + errormsg)
		  		var stringerrormsg = $.parseJSON(errormsg);
		  			console.log('stringerrormsg ' + stringerrormsg);
		  		var errormsgmsg = JSON.stringify(stringerrormsg)
		  			console.log('errormsgmsg ' + errormsgmsg);
		  		var stringerrormsgmsg = $.parseJSON(errormsg);
		  			console.log('stringerrormsgmsg ' + stringerrormsgmsg.message);
		  		alert (stringerrormsg.message);
		  	}
		});
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
				success: function(s){
					//alert('You have successfully been logged in.');
					window.location.href = '#tickets';
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
		var i = 0
		$.ajax({
			beforeSend:function(xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			type: "get",
			url: "https://api.firehost.com/api/ticket",
			processData: false,
			async: false,
			success: function(ticketlist){
				var ticketliststring = JSON.stringify(ticketlist)
				var ticketlistparsed = $.parseJSON(ticketliststring)
				var ticketlist1string = JSON.stringify(ticketlistparsed.result)
				var ticketlist1parsed = $.parseJSON(ticketlist1string)
				for (var i = 0; i < ticketlist1parsed.length; i++){
					$('#ticketList').append("<a class='ticketbutton' id='" + ticketlist1parsed[i].ticketNumber + "' data-role='button'>" +  ticketlist1parsed[i].ticketNumber +"</a>").trigger("create")
					//$('#ticketList').append("<a id='ticketbutton_" + ticketlist1parsed[i].ticketNumber + "' data-role='button'>" +  ticketlist1parsed[i].ticketNumber +"</a>").trigger("create")
					$('#tickets').trigger("refresh")

				}
			},
			error: function(ticketerror){
				alert ('There was an error, please try again later.');
			}
		});
	},
	ticketdetail: function(tn){
		$('#ticketdetailcomments').empty();
		$('#statustext').empty();
		var header = document.getElementById("ticketdetailheader")
		var	token = localStorage.getItem('key');
		$.ajax({
			beforeSend:function(xhr){
				xhr.setRequestHeader("Authorization", "Bearer " + token);
			},
			type: "get",
			url: "https://api.firehost.com/api/ticket/" + tn,
			processData: false,
			async: false,
			success: function(ticketdetails){
				var ticketdetailsstring = JSON.stringify(ticketdetails.result);
				var ticketdetailparse = $.parseJSON(ticketdetailsstring)
				header.innerHTML=("<h1>" + ticketdetailparse.title + "</h1>");
				if (ticketdetailparse.status == "Closed") {
					var icon = 'icon_resolved.png'
					$('#statustext').append('Closed').trigger('create');
					$('#statusicon').attr('src', 'icon_resolved.png');
				}else if (ticketdetailparse.status == "Open") {
					var icon = 'icon_open.png'
					$('#statustext').append('Open').trigger('create');
					$('#statusicon').attr('src', 'icon_open.png');
				}else{
					var icon = 'icon_flag.png'
					$('#statustext').append('Awaiting Response').trigger('create');
					$('#statusicon').attr('src', 'icon_flag.png');
				};
				var ticketdetailcomments = ticketdetailparse.comments
				var ticketdetailcommentsstring = JSON.stringify(ticketdetailcomments)
				var ticketdetailcommentsparse = $.parseJSON(ticketdetailcommentsstring)
				for (var i = 0; i < ticketdetailcommentsparse.length; i++){
					var dt = new Date(ticketdetailcommentsparse[i].dateCreated);
					var comment = ticketdetailcommentsparse[i].comment.replace(/\n/g, "</br>")
					$('#ticketdetailcomments').append("<div data-role='collapsible' data-iconpos='right'>" + "<h3>" + dt + "</h3>" +"<li>" + comment + "</li>" + "</div>").trigger("create")
					$('#ticketdetailcomments').trigger('create');
				}
			},
			error: function(ticketerror){
				alert ('There was an error, please try again later.');
				window.location.href = '#tickets';
			}
		});
	}
}


