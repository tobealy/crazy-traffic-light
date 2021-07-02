var express = require('express');

const { KafkaProducer, SendMessage } = require("../utils/kafka-producer")
const { KafkaConsumer, ReadMessages } = require("../utils/kafka-consumer")

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/stream', async function (req, res, next) {
  const TOPIC = 'crazy-traffic-lights'
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  })

  await KafkaProducer()
  await KafkaConsumer(TOPIC, true)

  ReadMessages(respond(res))

  setInterval(() => {
    SendMessage(TOPIC, { green: getData(), yellow: getData(), red: getData() })
    // res.write(`data: ${JSON.stringify({green: getData(), yellow: getData(), red:getData()})}\n\n`)
  }, 3000)
});

function getData() {
  let state = ["on", "off"]
  const randIndex = Math.floor(Math.random() * state.length);
  return state[randIndex]
}

const print = function print(msg) {
  console.log(msg)
}

const respond = function (res, message) {
  return function (message) {
    res.write(`data: ${message}\n\n`)
  }
}

module.exports = router;
