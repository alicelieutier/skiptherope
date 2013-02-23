function start () {
	window.addEventListener("devicemotion", logAcceleration, true);
}

function stop() {
	window.removeEventListener("devicemotion", logAcceleration);
}

function logAcceleration(event) {
  var row = document.createElement('tr');
	row.innerHTML = "<tr>
		<td> " + Date.now() + " </td>
		<td> " + event.acceleration.toString() + " </td>
		<td> " + event.accelerationIncludingGravity.toString() + " </td>
		<td> " + event.interval.toString() + " </td>
		</tr>"
	document.getElementById('results').appendChild(row);
}
