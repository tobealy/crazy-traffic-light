const { Kafka } = require('kafkajs')
const kafkaConfig = require('../config/kafka')


let kafka = new Kafka(kafkaConfig)
let kafkaProducer = kafka.producer()

async function KafkaProducer() {

    kafkaProducer.connect()
        .then(() => { console.log("Producer Connected"); return kafkaProducer; })
        .catch((error) => { console.log(error) })
}

async function SendMessage(topic, message) {
    // console.log(topic, message)
    kafkaProducer.send({
        topic,
        messages: [
            {
                value: JSON.stringify(message),
            },
        ],
    })
    .then((data) => {console.log("Message Sent: " + JSON.stringify(message))})
    .catch((error) => {console.log(error)})
}

module.exports = { KafkaProducer, SendMessage }