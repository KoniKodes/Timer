$(document).ready(function () {
    'use strict';

    var wcntmin = 25,
        ctmn = wcntmin * 60,
        pcntmin = 5,
		ptmn = pcntmin * 60,
        worktime = false, 
        playtime = false,
	    paused = false,
		timerId = "0",
        sessionType = "",
        workSession,
        playSession,
        display = $("#ctmn");
		$("#pause").hide();
		$("#continue").hide();
		
//display
    $("#wcntmin").text(wcntmin);
    $("#pcntmin").text(pcntmin);
    $("#ctmn").text(wcntmin);


// set worktime
    $("#wdnarr").click(function () {
        if (wcntmin > 1) {
            wcntmin -= 1;
            $("#wcntmin").text(wcntmin);
            $("#ctmn").text(wcntmin);
        } else {
            alert("Cannot Count Minutes Below 1");
            wcntmin = 1;
            $("#wcntmin").text(wcntmin);
            $("#ctmn").text(wcntmin);
        }
    });

    $("#wuparr").click(function () {
         if (wcntmin < 60) { 
		 wcntmin += 1;
        $("#wcntmin").text(wcntmin);
        $("#ctmn").text(wcntmin);
		} else {
            alert("Do Not Work more than 1 hour without a break");
            wcntmin = 59;
            $("#wcntmin").text(wcntmin);
            $("#ctmn").text(wcntmin);
        }
    });
                       
//set playtime
    $("#pdnarr").click(function () {
        if (pcntmin > 1) {
            pcntmin -= 1;
            $("#pcntmin").text(pcntmin);
        } else {
            alert("Cannot Count Minutes Below 1");
            pcntmin = 1;
            $("#pcntmin").text(pcntmin);
        }
    });
    
    $("#puparr").click(function () {
         if (pcntmin < 60) { 
		 pcntmin += 1;
        $("#pcntmin").text(pcntmin);
       	} else {
            alert("Do Not Take More than a 1 hour Break");
            pcntmin = 59;
        $("#pcntmin").text(pcntmin);
		}
});

    
function workSession() {
    display = $('#ctmn');
	$("#work").css({"color": "#004f69"});
    $("#plmin").css({"color": "#fbf2ea"});	
    playtime = false;
	worktime = true;
    sessionType = "work";
    startCtmnr(wcntmin * 60, display);

}
    
function playSession() {
    worktime = false;
    $("#plmin").css({"color": "#004f69"});
	$("#work").css({"color": "#fbf2ea"});
   $("#ctmn").text(pcntmin);
    playtime = true;
    sessionType = "play";
    startCtmnr(pcntmin * 60, display);

}


//start countdown function//
    function startCtmnr(duration, display) {
        var ctmnr = duration,
            minutes,
            seconds;
        display = $('#ctmn');

        timerId = setInterval(function () {
       if(paused === false){
            minutes = parseInt(ctmnr / 60, 10);
            seconds = parseInt(ctmnr % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

			
            
            document.getElementById("ctmn").innerHTML = minutes + ":" + seconds;

            if (--ctmnr < 0) {
                ctmnr = duration;
				clearInterval(timerId);
				
		        if (sessionType === "work") {
                    $("#work").css({"color": "#fbf2ea"});
                    playsound.play();
					console.log("It's Playtime!");
		            setTimeout(playSession, 8000);                  
             } else {
				   $("#plmin").css({"color": "#fbf2ea"});	
				    worksound.play();
					console.log("It's Worktime!");
		            setTimeout(workSession, 8000);  
                   }
				 }
           }   
        }, 1000);
    }

$("#start").click(function () {
	    $("#reset").prop("disabled", true);
		$("#wdnarr").css("pointer-events", "none");
		$("#wuparr").css("pointer-events", "none");
		$("#pdnarr").css("pointer-events", "none");
		$("#puparr").css("pointer-events", "none");
		$(this).hide();
		$("#pause").show();
		paused = false;
		workSession();

});   
                 
//Pause button
$("#pause").on("click", function(){
  $(this).hide();
  $("#continue").show();
  $("#reset").prop("disabled", false);
  paused = true;
});      
                      

//Continue button
$("#continue").on("click", function(){
  $(this).hide();
  $("#pause").show();
  $("#reset").prop("disabled", true);
  paused = false;

});
    
    $("#reset").click(function () {
	        clearInterval(timerId);
			$("#work").css({"color": "#fbf2ea"}); 
		    $("#wcntmin").text(25);
            $("#pcntmin").text(5);
            $("#ctmn").text(25);
			$("#wdnarr").css("pointer-events", "auto");
		    $("#wuparr").css("pointer-events", "auto");
		    $("#pdnarr").css("pointer-events", "auto");
		    $("#puparr").css("pointer-events", "auto");
			$("#continue").hide();
			$("#start").show();
			$("#start").prop("disabled", false);
			paused = true;

    });

 });
