var circleOutSeconds = 0;
var circleInSeconds = 0;
var runningStatus = false;
var outStatus = false;
var inStatus = false;
var sessionTimeDef = 25;
var breakTimeDef = 5;

function showTimer(time, seconds) {
  var timeLeft = time - seconds;
  var minuteNum = Math.floor(timeLeft/60);
  if (minuteNum < 10) {
    minuteNum = "0" + minuteNum;
  }
  var secNum = timeLeft % 60;
  if (secNum < 10) {
    secNum = "0" + secNum;
  }
  $("#minute").text(minuteNum);
  $("#sec").text(secNum);
}

function circleTimeDegree(time, seconds) {
  var degPerSec = 360 * 1.0 / time;
  return 360-degPerSec*seconds;
}

function circleOutCss(degree) {
  if (degree > 180) {
    $(".circle-out").css("background-image", "linear-gradient("+(degree-90)+"deg, transparent 50%, #CD5C5C 50%), linear-gradient(90deg, #333333 50%, transparent 50%)")
  } else {
    $(".circle-out").css("background-image", "linear-gradient("+(degree+90)+"deg, transparent 50%, #333333 50%), linear-gradient(90deg, #333333 50%, transparent 50%)")
  }
}

function circleInnCss(degree) {
  if (degree > 180) {
    $(".circle-inne").css("background-image", "linear-gradient("+(degree-90)+"deg, transparent 50%, #98FB98 50%), linear-gradient(90deg, #333333 50%, transparent 50%)")
  } else {
    $(".circle-inne").css("background-image", "linear-gradient("+(degree+90)+"deg, transparent 50%, #333333 50%), linear-gradient(90deg, #333333 50%, transparent 50%)")
  }
}

var circleOutCountDown = function(){
  if ((!outStatus && !inStatus) || (outStatus && !inStatus)) {
    var totalTime = sessionTimeDef * 60;
    //var totalTime = 5;
    console.log(circleOutSeconds);
    $(".status-img").removeClass("animated pulse infinite");
    $("#status-icon").attr("src","https://image.ibb.co/goG05k/tomato.png");
    if (circleOutSeconds==0) {
      outStatus = true;
      console.log("hi");
      setTimeout(function(){
        $(".circle-out").removeClass("animated flash");
      }, 2000);
      $(".circle-out").addClass("animated flash");
      showTimer(totalTime, 0); 
      circleOutCss(circleTimeDegree(totalTime, circleOutSeconds));
      circleOutSeconds += 1;
      return 0;
    } 
    if (circleOutSeconds==totalTime+1) {
      //clearInterval(circleOutLoop);
      circleOutSeconds = 0;
      outStatus = false;
      inStatus = true;
      //runningStatus = false;
      //console.log("seconds:"+circleOutSeconds);
      circleOutCss(circleTimeDegree(totalTime, circleOutSeconds));
      return 0;
    } 
    showTimer(totalTime, circleOutSeconds); 
    circleOutCss(circleTimeDegree(totalTime, circleOutSeconds));
    circleOutSeconds += 1;
  } else {
    console.log("hello");
    circleInCountDown();
  }
}
var circleInCountDown = function(){
  var totalTime = breakTimeDef * 60;
  console.log("hi");
  $("#status-icon").attr("src","https://image.ibb.co/bY78bQ/juice.png");
  $(".status-img").addClass("animated pulse infinite");
  if (circleInSeconds==0) {
    setTimeout(function(){
      $(".circle-small").removeClass("animated pulse");
    }, 2000);
    $(".circle-small").addClass("animated pulse");
    showTimer(totalTime, 0); 
    circleInnCss(circleTimeDegree(totalTime, circleInSeconds));
    circleInSeconds += 1;
    return 0;
  } 
  if (circleInSeconds==totalTime+1) {
    //clearInterval(circleOutLoop);
    circleInSeconds = 0;
    inStatus = false;
    //runningStatus = false;
    //console.log("seconds:"+circleOutSeconds);
    circleInnCss(circleTimeDegree(totalTime, circleInSeconds));
    return 0;
  } 
  showTimer(totalTime, circleInSeconds); 
  circleInnCss(circleTimeDegree(totalTime, circleInSeconds));
  circleInSeconds += 1;
}

$(".circle-small").on("click", function(){
  if (!runningStatus) {
    $("#icon").removeClass("fa-play flash").addClass("fa-pause");
    runningStatus = true;
    circleOutLoop = setInterval(circleOutCountDown, 1000);
  } else {
    $("#icon").removeClass("fa-pause").addClass("fa-play flash");
    runningStatus = false;
    clearInterval(circleOutLoop);
  }
  console.log(runningStatus);
})
$(".btn-normal").on("click", function(){
  setTimeout(function(){$(".btn-normal").blur()}, 100);
});
$("#session-minus").on("click", function(){
  if (!runningStatus) {
    if (sessionTimeDef > 1) {
      sessionTimeDef -= 1;
    }
    console.log("hi");
    $("#session").text(sessionTimeDef);
    $("#minute").text(sessionTimeDef);
    initialSetup();
  }
})
$("#session-plus").on("click", function(){
  if (!runningStatus) {
    if (sessionTimeDef < 99) {
      sessionTimeDef += 1;
    }
    $("#session").text(sessionTimeDef);
    $("#minute").text(sessionTimeDef);
    initialSetup();
  }
})
$("#break-minus").on("click", function(){
  if (!runningStatus) {
    if (breakTimeDef > 1) {
      breakTimeDef -= 1;
    }
    $("#break").text(breakTimeDef);
  }
})
$("#break-plus").on("click", function(){
  if (!runningStatus) {
    if (breakTimeDef < 99) {
      breakTimeDef += 1;
    }
    $("#break").text(breakTimeDef);
  }
})
var initialSetup = function(){
  circleOutSeconds = 0;
  circleInSeconds = 0;
  outStatus = false;
  inStatus = false;
  $("#sec").text("00");
}