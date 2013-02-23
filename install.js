function Install() {
   this.state = "idle";

   // trigger events registration
   var events = new Object();
   this.on = function(name, func) {
      events[name] = (events[name] || []).concat([func]);
   };
   this.off = function(name, func) {
      if (events[name]) {
         var res = [];
         for (var i=0, l=events[name].length; i<l; ++i) {
            var f = events[name][i];
            if (f != func) res.push();
         }
         events[name] = res;
      }
   };
   this.trigger = function(name) {
      var args = Array.prototype.slice.call(arguments, 1);
      if (events[name]) {
         for (var i=0, l=events[name].length; i<l; ++i) {
            events[name][i].apply(this, args);
         }
      }
   };
   this.triggerChange = function(state) {  // helper
      //var msg = "State: " + this.state + " -> " + state;
      //if (typeof this.error !== "undefined") msg += "\n" + this.error;
      //alert(msg);
      this.state = state;
      this.trigger("change", this.state);
   }

   if (navigator.mozApps) {
      var request = navigator.mozApps.getSelf();
      var that = this;
      request.onsuccess = function () {
         if (!this.result) {
            that.triggerChange("uninstalled");
            that.installUrl = (
               location.href.substring(0, location.href.lastIndexOf("/")) +
               "/manifest.webapp"
            );
            that.doIt = function() {
               //*/ alert("Faking install from " + that.installUrl);
               try {
                  var req2 = navigator.mozApps.install(that.installUrl);
                  req2.onsuccess = function(data) {
                     that.triggerChange("installed");
                     //*/ alert("Bingo!");
                  };
                  req2.onerror = function() {
                     that.error = this.error;
                     that.triggerChange("failed");
                  };
               }catch (error) {
                  that.error = error;
                  that.triggerChange("failed");
               }
            };
         }else {
            that.triggerChange("installed");
         }
      };
      request.onerror = function (error) {
         that.error = error;
         that.triggerChange("failed");
      };
   }
   return this;
}

function setInstallButton(buttonId) {
   if (!document.getElementById(buttonId)) {
      document.addEventListener("DOMContentLoaded", setInstallButton);
   }else {
      var install = new Install();
      var buttonElt = document.getElementById(buttonId);
      install.on(
         "change",
         function() {
            buttonElt.style.display = (
               (install.state == "uninstalled")? "block" : "none"
            );
            if (install.state == "failed") {
               alert("Install failed:\n" + install.error);
               console.log(install.error);
            }
         }
      );
      install.on(
         "showiOSInstall",
         function() {
            alert(
               "To install, press the forward arrow in Safari " +
               "and touch \"Add to Home Screen\""
            );
         }
      );
      buttonElt.addEventListener(
         "click", function() { install.doIt(); }
      );
   }
}


document.addEventListener("DOMContentLoaded", function () {
   setInstallButton("btnInstall");
});