var stompClient = null;

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  }
  else {
    $("#conversation").hide();
  }
  $("#join").html("");
}

function connect() {
  var socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    setConnected(true);
    console.log('Connected: ' + frame);
    stompClient.subscribe('/sub/chat/room/1', function (join) {
      showJoinMessage('< ' + JSON.parse(join.body).memberName + ' > : ' + JSON.parse(join.body).message);
    });
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect();
  }
  setConnected(false);
  console.log("Disconnected");
}

function enterUser() {
  stompClient.send("/pub/chat/join", {}, JSON.stringify({'message': $("#message").val() , 'memberName': $("#name").val() , 'chatroomId': 1}));
}

function sendMessage() {
  stompClient.send("/pub/chat/message", {}, JSON.stringify({'message': $("#message").val() , 'memberName': $("#name").val() , 'chatroomId': 1}));
}
function leaveRoom() {
  stompClient.send("/pub/chat/leave", {}, JSON.stringify({'message': $("#message").val() , 'memberName': $("#name").val() , 'chatroomId': 1}));
}

function showJoinMessage(message) {
  $("#join").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
  $("form").on('submit', function (e) {
    e.preventDefault();
  });
  $( "#connect" ).click(function() { connect(); });
  $( "#disconnect" ).click(function() { disconnect(); });
  $( "#send" ).click(function() { leaveRoom(); });
});