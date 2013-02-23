function showFront() {
 try{
          var id;
	  function watcher(acceleration)
          { 
            deviceapis.accelerometer.clearWatch(id);
            alert(acceleration.xAxis); 
	    alert(acceleration.yAxis);      
	    alert(acceleration.zAxis);      
          }
          function errcallback(error)
          {
           alert("An error occurred"+error.message);
          }
	  
         id=deviceapis.accelerometer.watchAcceleration(watcher, 
	        errcallback, {minNotificationInterval:10000} ); 
	 }
	 catch(e)
	 {
		alert(e.code+":"+e.message); 
	 }
}

function showBack() { 
	var p=null;
     try{
         alert("EARTH_GRAVITY: "+deviceapis.accelerometer.EARTH_GRAVITY);
         p = deviceapis.accelerometer.getCurrentAcceleration(curacceleration, errcallback);
	 if(p!=null)
            {
             if(confirm("Are you sure want to cancel the operation"))
             {  if(p.cancel())
                {
                  alert("pending operation is cancelled");
                }
               else{
                  alert("pending operation can not be cancelled");
               } 
             }
            }   
           else
          {
            alert("pending operation object is not initialized");
          }    
        function curacceleration(acceleration){
		alert("xAxis:" + acceleration.xAxis);
		alert("yAxis:" + acceleration.yAxis);
		alert("zAxis:" + acceleration.zAxis);
	}
	function errcallback(error){
		 alert("An error occurred"+error.code+":"+error.message);
		 }
	}
	catch(e)
	{
		alert(e.code+":"+e.message); 
	}

}

function showWatchAcceleration()
{
    try{
            var id;
	    function watcher(acceleration)
            {
             alert(acceleration.xAxis); 
	     alert(acceleration.yAxis);      
	     alert(acceleration.zAxis);      
	    }
	    function errcallback(error)
            {
	       alert("An error occurred"+error.code+":"+error.message);
	    }
	  
            id=deviceapis.accelerometer.watchAcceleration(watcher, 
	        errcallback, {minNotificationInterval:10000} ); 
	 }
	 catch(e)
	 {
		alert(e.code+":"+e.message); 
	 }
}