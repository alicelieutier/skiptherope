var threshold = 8;
var above = false;
var nb_of_skips = 0;
var started = false;

function start(event) {
	nb_of_skips = 0;
	above = false;
	document.getElementById('skips').textContent = 0;
	window.addEventListener("devicemotion", count);
}

function stop(event) {
	window.removeEventListener("devicemotion", count);
}

function control(event) {
	if (!started) {
		start();
		this.textContent = "STOP";
		this.classList.add('stop');
	} else {
		stop();
		this.textContent = "Start skipping!";
		this.classList.remove('stop');
	}	
}

function count(event) {
	if (event.acceleration.y > 8) {
		above = true;
		return;
	}
	// if we are here, then we are underneath the threshold
	if (above) {
		nb_of_skips += 1;
		above = false;
		document.getElementById('skips').textContent = nb_of_skips;
	}
	return;	
}
document.addEventListener("DOMContentLoaded", function () {
   document.getElementById('control').addEventListener('click', start);
});

