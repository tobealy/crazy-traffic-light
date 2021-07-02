const { Kafka } = require('kafkajs')
const kafkaConfig = require('../config/kafka')


let kafka = new Kafka(kafkaConfig)
let kafkaConsumer = kafka.consumer({ groupId: kafkaConfig.consumer_group_id })

async function KafkaConsumer(topic, fromBeginning){

    await kafkaConsumer.connect()
    .then(() => { console.log("Consumer Connected"); return kafkaConsumer; })
    .catch((error) => { console.log(error) })
    await kafkaConsumer.subscribe({ topic: topic, fromBeginning: fromBeginning })
    return kafkaConsumer
}

async function ReadMessages(exec){
    await kafkaConsumer.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log("Message Recieved: " + message.value.toString())
            exec(message.value.toString())
        },
      })
}

module.exports = { KafkaConsumer, ReadMessages }
