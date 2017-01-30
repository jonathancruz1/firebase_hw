  var config = {
    apiKey: "AIzaSyAQAdW-wdjL-VH9kEzO7MR53hM__o8i8OI",
    authDomain: "employee-9e2dc.firebaseapp.com",
    databaseURL: "https://employee-9e2dc.firebaseio.com",
    storageBucket: "employee-9e2dc.appspot.com",
    messagingSenderId: "97282409689"
  };
  firebase.initializeApp(config);

  //create variable to reference database
  var database = firebase.database();

  //click function
  $("#add-employee-btn").on("click", function() {

  	//data we are using
	var employee = $("#employee-name-input").val().trim();
    var role = $("#role-input").val().trim();
    var start = $("#start-input").val().trim();
    var rate = $("#rate-input").val().trim();

database.ref().push({
        employee: employee,
        role: role,
        start: start,
        rate: rate
      });
});