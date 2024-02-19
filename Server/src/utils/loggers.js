import pino from 'pino'

const logger=pino({
    transport:{
        target:'pino-pretty',
        options:{
            serialize:true,
            ignore:'pid,hostName'
        }
    }
})

export default logger;