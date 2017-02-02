// Initialize Firebase
      var config = {
      apiKey: "AIzaSyBHDZytbzfTLraBIqJCpU7CeCgIwbk7nvM",
      authDomain: "train-3fc70.firebaseapp.com",
      databaseURL: "https://train-3fc70.firebaseio.com",
      storageBucket: "train-3fc70.appspot.com",
      messagingSenderId: "518190494354"
    };
    firebase.initializeApp(config);

//create variable to reference database
    var database = firebase.database();

//click function
    $("#add-train-btn").on("click", function() {

//data we are using
    var train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTrain = $("#first-train-time-input").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
      });
    });

//referencing data base: Handler for function
  database.ref().on("child_added", function(childSnapshot){
    console.log('on Child Added Called');
//referencing a specific list
    console.log(childSnapshot.val().train)
    console.log(childSnapshot.val().destination)
    console.log(childSnapshot.val().firstTrain)
    console.log(childSnapshot.val().frequency)

//creating variable name which shortens the code so you don't have to type it in full
    var newTrain = childSnapshot.val().train;
    var newDestination = childSnapshot.val().destination;
    var newFrequency = childSnapshot.val().frequency;
    var newFirstTrain = childSnapshot.val().firstTrain;

// First Time (pushed back 1 year to make sure it comes before current time)
    var firstMoment = moment(newFirstTrain, "hh:mm").subtract(1, "years");
    console.log(firstMoment);
// Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
// Difference between the times
    var diffTime = moment().diff(moment(firstMoment), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
// Time apart (remainder)
    var tRemainder = diffTime % newFrequency;
    console.log(tRemainder);
// Minute Until Train
    var tMinutesTillTrain = newFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
// Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

//adding information to website
    $("tbody").append("<tr>" +
    "<td>" + newTrain + "</td><td>" + newDestination + "</td>" +
    "<td>" + newFrequency + "</td><td>" + newFirstTrain + "</td><td>" + tMinutesTillTrain + " minutes" + "</td>");

  })