// http://popdevelop.com/2010/04/the-observer-pattern-and-how-to-make-things-complicated-in-javascript/

var Subject = function()  {
  /* Initialize list of observers */
  this._observers = [];
 
  /* Declare methods */
  this.Attach = function(observer) {
    if("Update" in observer) {
      var observerID = this._observers.length;
      this._observers.push(observer);
      return observerID;
    }
  };   
  this.Detach = function(observerID) {
    if(observerID in this._observers) {
      delete this._observers[observerID];
    }
  };  
  this.Notify = function() {
    for(var i in this._observers) {
      this._observers[i].Update(this);
    }
  };   
};

var Observer = function() {
  /* Create empty Update-function to be overridden */
  this.Update = function() { throw "Not implemented!"; };
};

