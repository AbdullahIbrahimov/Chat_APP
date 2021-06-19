const socket = io();

socket.on("message", mess => {
  console.log(mess);
});

document.querySelector("#form").addEventListener("submit", function (e) {
  e.preventDefault();
  let mesg = e.target.elements.message.value;
  socket.emit("text", mesg);
});

document.querySelector("#send_location").addEventListener("click", () => {
  if (!navigator.geolocation) {
    return "Your browser does not support geolocation!";
  }

  navigator.geolocation.getCurrentPosition(position => {
    socket.emit("sendLocation", { latitude: position.coords.latitude, longitude: position.coords.longitude });
  });
});
