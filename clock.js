var INITIAL = 0;
var RUNNING = 1;
var PAUSED  = 2;

var sessionLength = 25;
var breakLength = 5;
var state = INITIAL;
var mode = "Session";

var secondsGlobal = 0;
var minutesGlobal = 25;

var alarm = new Audio('alarm.wav');

function increaseBreak() {
    if (breakLength < 30) {
        breakLength++;
    }
    $("#break-length").text(breakLength);
}

function decreaseBreak() {
    if (breakLength > 1) {
        breakLength--;
    }
    $("#break-length").text(breakLength);
}

function increaseSession() {
    if (sessionLength < 100) {
        sessionLength++;
    }
    $("#session-length").text(sessionLength);
    $("#timer").text(sessionLength);
}

function decreaseSession() {
    if (sessionLength > 1) {
        sessionLength--;
    }
    $("#session-length").text(sessionLength);
    $("#timer").text(sessionLength);
}

function countdown(minutes, seconds) {
    countInt = setInterval(function() {
        if (minutes === 0 && seconds === 0) {
            clearInterval(countInt);
            if (mode == "Session") {
                mode = "Break";
                $("#mode").text(mode);
                countdown(breakLength, 0);
            }
            else {
                mode = "Session";
                $("#mode").text(mode);
                countdown(sessionLength, 0);
            }
            alarm.play();
        }
        else if (seconds !== 0) {
            if (seconds <= 10) {
                seconds -= 1;
                secondsGlobal -= 1;
                $("#timer").text(minutes + ":0" + seconds);
            }
            else {
                seconds -= 1;
                secondsGlobal -= 1;
                $("#timer").text(minutes + ":" + seconds);
            }
        }
        else if (seconds === 0) {
            seconds = 59;
            secondsGlobal = 59;
            minutes -= 1;
            minutesGlobal -= 1;
            $("#timer").text(minutes + ":" + seconds);
        }
    }, 1000);
}

function reset() {
    clearInterval(countInt);
    state = INITIAL;
}


$(document).ready(function() {
    $(".control").on("click", function(event) {
        if (state == INITIAL) {
            switch(event.target.id) {
                case("break-add"):
                    increaseBreak();
                    break;
                case("break-minus"):
                    decreaseBreak();
                    break;
                case("sess-add"):
                    increaseSession();
                    break;
                case("sess-minus"):
                    decreaseSession();
                    break;
            }
        }
        else if (state == PAUSED) {
            switch(event.target.id) {
                case("break-add"):
                    increaseBreak();
                    reset();
                    break;
                case("break-minus"):
                    decreaseBreak();
                    reset();
                    break;
                case("sess-add"):
                    increaseSession();
                    reset();
                    break;
                case("sess-minus"):
                    decreaseSession();
                    reset();
                    break;
            }
        }
    });

    $(".clock").on("click", function() {
        if (state == INITIAL) {
            countdown(sessionLength, 0);
            state = RUNNING;
        }
        else if (state == RUNNING) {
            clearInterval(countInt);
            state = PAUSED;
        }
        else if (state == PAUSED) {
            countdown(minutesGlobal, secondsGlobal);
            state = RUNNING;
        }
    });
});
