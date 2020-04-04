~function() {
    var Period = {
        A: {
            name: "0 Period",
            color: "#e57373"
        },
        B: {
            name: "1st Period",
            color: "#4DB6AC"
        },
        C: {
            name: "2nd Period",
            color: "#4FC3F7"
        },
        D: {
            name: "3rd Period",
            color: "#AED581"
        },
        E: {
            name: "4th Period",
            color: "#FFF176"
        },
        F: {
            name: "5th Period",
            color: "#FF8A65"
        },
        G: {
            name: "6th Period",
            color: "#F06292"
        },
        H: {
            name: "7th Period",
            color: "#7986CB"
        },
        O: {
            name: "Teacher Office Hours",
            color: "#FFECB3"
        },
        Z: {
            name: "Professional Development",
            color: "#ffcdd2"
        },
        Assembly: {
            name: "Assembly",
            color: "#FFD54F"
        },
        Staff: {
            name: "Staff",
            color: "#FFD54F"
        },
        Done: {
            name: "School's out",
            color: "#000000"
        }
    };
    var Schedule = {
        "Monday": [
        ],
        "Tuesday": [
            {type: Period.B, start: '8:30', end: '9:30'},
            {type: Period.C, start: '9:30', end: '10:30'},
            {type: Period.D, start: '10:30', end: '10:30'},
            {type: Period.H, start: '11:30', end: '12:30'},
            {type: Period.O, start: '12:30', end: '24:00'},
            {type: Period.Done, start: '24:00', end: '24:00'}
        ],
        "Wednesday": [
            {type: Period.A, start: '7:30', end: '8:30'},
            {type: Period.E, start: '8:30', end: '9:30'},
            {type: Period.F, start: '9:30', end: '10:30'},
            {type: Period.G, start: '10:30', end: '11:30'},
            {type: Period.O, start: '11:30', end: '24:00'},
            {type: Period.Done, start: '24:00', end: '24:00'}
        ],
        "Thursday": [
            {type: Period.B, start: '8:30', end: '9:30'},
            {type: Period.C, start: '9:30', end: '10:30'},
            {type: Period.D, start: '10:30', end: '10:30'},
            {type: Period.H, start: '11:30', end: '12:30'},
            {type: Period.O, start: '12:30', end: '24:00'},
            {type: Period.Done, start: '24:00', end: '24:00'}
        ],
        "Friday": [
            {type: Period.A, start: '7:30', end: '8:30'},
            {type: Period.E, start: '8:30', end: '9:30'},
            {type: Period.F, start: '9:30', end: '10:30'},
            {type: Period.G, start: '10:30', end: '11:30'},
            {type: Period.O, start: '11:30', end: '24:00'},
            {type: Period.Done, start: '24:00', end: '24:00'}
        ]
    };
/*
    moment.locale('en', {
        relativeTime : {
            future: "in %s",
            s:  "secs",
            m:  "min",
            mm: "%d mins",
            h:  "an hour",
            hh: "%d hrs",
        }
    });
*/
    
    var currentPeriodElement = null;
    function choose() {
        return arguments[Math.floor(Math.random()*arguments.length)];
    }

    function update() {
        document.getElementById('progressbar-container').style.display = 'none';
        if (currentPeriodElement) {
            currentPeriodElement.className = 'period';
        }
        var now = moment();
        // var now = moment({hour: 11, minute: 16});
        var day = now.day();
        //var day = 3;
        if (day === 0 || day === 6) {
            return weekend();
        }
        var dayname = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
        ][day - 1];
        [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
        ].forEach(function(name) {
            document.getElementById(name+'-col').className = 'column';
        });
        document.getElementById(dayname+'-col').className += ' today';

        var schedule = Schedule[dayname];

        for (var i=0; i<schedule.length; i++) {
            if (moment(schedule[i].start, 'hh:mm').isAfter(now)) {
                break;
            }
        }

        if (i == 0) {
            // Day hasn't started yet
            currentPeriodElement = null;
            var nextP    = schedule[i];
            document.getElementById('current-period').textContent = "Early morning!";
            document.getElementById('current-period').style.textShadow = '0 0 0';
            document.getElementById('next-period').textContent = nextP.type.name;
            document.getElementById('next-period').style.textShadow = '0 0 0.2em '+nextP.type.color;
            document.getElementById('next-time').textContent = moment(nextP.start, 'hh:mm').from(now);
        } else if (i >= schedule.length) {
            // School's out
            currentPeriodElement = null;
            document.getElementById('current-period').textContent = "School's out!";
            document.getElementById('current-period').style.textShadow = '0 0 0';
            document.getElementById('next-period').textContent = 'Homework';
            document.getElementById('next-period').style.textShadow = '0 0 0';
            document.getElementById('next-time').textContent = '';
        } else if (now.isAfter(moment(schedule[i-1].end, 'hh:mm'))) {
            var currentP = schedule[i-1];
            var nextP    = schedule[i];
            document.getElementById('current-period').textContent = "Passing period";
            document.getElementById('current-period').style.textShadow = '0 0 0';
            document.getElementById('next-period').textContent = nextP.type.name;
            document.getElementById('next-period').style.textShadow = '0 0 0';
            document.getElementById('next-time').textContent = moment(nextP.start, 'hh:mm').from(now);
        } else {
            var currentP = schedule[i-1];
            var nextP    = schedule[i];
            document.getElementById('current-period').textContent = currentP.type.name;
//          document.getElementById('current-period').style.textShadow = '0 0 0.2em '+currentP.type.color;
            document.getElementById('next-period').textContent = nextP.type.name;
//          document.getElementById('next-period').style.textShadow = '0 0 0.2em '+nextP.type.color;
            document.getElementById('next-time').textContent = moment(currentP.end, 'hh:mm').from(now);
            currentPeriodElement = document.getElementById(dayname+'-col').childNodes[i+2];

            var delta = moment(nextP.start, 'hh:mm').diff(now, 'minutes', true);
            if (delta > 0 && delta < 10) {
                document.getElementById('progressbar-container').style.display = 'block';
                document.getElementById('progressbar').style.width = (100*(10-delta)/10)+'%';
            }
        }
        if (currentPeriodElement) {
            currentPeriodElement.className = 'period now';
        }
    }

    function weekend() {
        document.getElementById('current-period').textContent = 'Weekend';
        document.getElementById('next-period').textContent = choose(
            'AP Sleep'
        );
        document.getElementById('next-time').textContent = '';
    }

    window.addEventListener("load", function() {
        Object.keys(Schedule).forEach(function(day) {
            var container = document.getElementById(day+'-col');
            Schedule[day].forEach(function(period, idx) {
                if (idx === Schedule[day].length - 1) {
                    return;
                }
                var el = document.createElement("div");
                var name = document.createElement("div");
                name.textContent = period.type.name;
                name.className = 'name';
                var time = document.createElement("div");
                time.textContent = period.start + '-' + period.end;
                time.className = 'time';
                el.appendChild(name);
                el.appendChild(time);
                el.className = 'period';
                el.style.backgroundColor = period.type.color;
                container.appendChild(el);
            });
        });

        update();
        setInterval(update, 5000);
    });
}();
