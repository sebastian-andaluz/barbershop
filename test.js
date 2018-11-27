var axios = require('axios');

axios.post("http://localhost:8080/appointments", {
  startTime: "5pm",
  duration: 5
})
.then((res) => {
  console.log(res);
})
.catch((error) => {
  console.error(error);
})

