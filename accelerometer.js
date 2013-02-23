var threshold = 20;
var above = false;
var nb_of_skips = 0;
function start (event) {
	this.removeEventListener("click", start);
	this.classList.remove('start');
	this.classList.add('stop');
	this.addEventListener('click', stop);
	nb_of_skips = 0;
	above = false;
	document.getElementById('skips').textContent = nb_of_skips;
	window.addEventListener("devicemotion", count, true);
}

function stop() {
	window.removeEventListener("devicemotion", count, true);
	this.removeEventListener("click", stop);
	this.classList.remove('stop');
	this.classList.add('start');
	this.addEventListener('click', start);
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

