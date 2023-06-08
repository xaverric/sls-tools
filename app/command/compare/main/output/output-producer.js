const {produceHtml} = require("./output-html-producer");

const PRODUCERS = [
    {
        produce: produceHtml,
        canProduce: (outputType) => outputType === "HTML"
    }
]

const decideProducer = (outputType) => {
    let producer = PRODUCERS.find(producer => producer.canProduce(outputType))
    if (!producer) {
        // HTML is default producer if not defined
        return {
            produce: produceHtml
        }
    }
    return producer;
}

module.exports = {
    decideProducer
}