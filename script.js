// // Get a list of users in JSON form
// var xhr = new XMLHttpRequest();
// xhr.addEventListener("load", function() {
//   console.log(this.responseText);
// });
// xhr.open("GET", "http://reqres.in/api/users", true);
// xhr.send();
//
//
// // Create a post
// var xhr = new XMLHttpRequest();
// xhr.addEventListener("load", function() {
//   console.log(this.responseText);
// });
// xhr.open("POST", "http://reqres.in/api/posts", true);
// xhr.send("title=Foo&body=Bar&userId=1");



var $ = {

  ajax: function(options) {

    var promise = new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();

      xhr.onload = function(e) {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            options.success(this.responseText);
            resolve(this.responseText);
          } else {
            options.error();
            reject(this.statusText);
          }
          options.complete();
        }
      }

      xhr.onerror = function(e) {
        options.error;
        reject(this.statusText);
      };
      xhr.open(options.method, options.url, options.async);
      if (options.header) {
        for (var key in options.header) {
          xhr.setRequestHeader(key, options.headers[key]);
        }
      }
      var url = "";
      if (options.data) {
        if (options.data instanceof String) {
          url = options.data;
        } else {
          for (var key in options.data) {
            url += key + "=" + options.data[key] + "&";
          }
        }
        url = url.trim("&");
      }
      xhr.send(url);
    });
    return promise;
  },

  get: function(url, data, success) {
    var getOptions = {
      url: url,
      method: "GET",
      headers: {},
      complete: function complete() {
        console.log("I'm finished!");
      },
      error: function error() {
        console.log("Couldn't get data");
      },
      success: success,
      data: data,
    };
    return $.ajax(getOptions);
  },

  post: function(url, data, success) {
    var postOptions = {
      url: url,
      method: "POST",
      data: data,
      success: success,
      complete: function complete() {
        console.log("I'm finished!");
      },
      error: function error() {
        console.log("Couldn't get data");
      },
      async: true,
      headers: {
        "Content-type": "application/x-www-form-urlencoded"
      }
    }
    return $.ajax(postOptions);
  }


}

var optionsGet = {
  url: "http://reqres.in/api/users",
  method: "GET",
  async: true,
  headers: {},
  complete: function complete() {
    console.log("I'm finished!");
  },
  error: function error() {
    console.log("Couldn't get data");
  },
  success: function success(response) {
    console.log(response);
  }
}


var optionsPost = {
  url: "http://reqres.in/api/posts",
  method: "POST",
  async: true,
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  },
  data: {
    title: "Foo",
    body: "Bar",
    userId: 1
  },

  complete: function complete() {
    console.log("I'm finished!");
  },
  error: function error() {
    console.log("Couldn't get data");
  },
  success: function success(response) {
    console.log(response);
  }
}

// button to trigger multiple callbacks.
var button = document.getElementById("kick-off")
button.addEventListener("click", function() {
  var status = document.getElementById("status")
  status.innerHTML = "Loading";
  var postRequest = $.post("http://reqres.in/api/users", "title=Foo&body=Bar&userId=1", function() {
    console.log("the post request worked")
  })
  var getRequest = new Promise( function(resolve, reject) {
    setTimeout(function(){
      $.get("http://reqres.in/api/users", null, function() {
      console.log("the get request worked")});
      resolve();
    }, 2000);
  });

  var ajaxRequest = $.get("http://reqres.in/api/users", null, function() {
    console.log("the 2nd get request worked")
  });
  Promise.all([postRequest, ajaxRequest, getRequest]).then(
    function(){status.innerHTML = "Loaded"
    console.log("You did it!")}
  );
});




var promiseObject = $.post("http://reqres.in/api/users", "title=Foo&body=Bar&userId=1", optionsPost.success)
promiseObject.then(function() {
    console.log("promise success!");
    return "string";
  })
  .then(function(response) {
    throw new Error("this is an error!");
    console.log(response);
  })
  .catch(function(error) {
    console.error(error);
  })
