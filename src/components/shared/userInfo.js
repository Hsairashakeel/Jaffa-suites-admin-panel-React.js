var UserProfile = (function() {
  
    var getName = function() {
     return localStorage.getItem("username")
    };
    var destroySession=function()
    {
        localStorage.clear()
    }
    var setName = function(name) {
      // Also set this in cookie/localStorage
      localStorage.setItem("username",name)
    };
  
    return {
      getName: getName,
      setName: setName,
      destroySession:destroySession
    }
  
  })();
  
  export default UserProfile;