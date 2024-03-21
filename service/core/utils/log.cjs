/* eslint-disable no-undef */
const winston = require('winston');
function thisLine() {
    try {
        const e = new Error();
        const regex = /\((.*):(\d+):(\d+)\)$/
        const stacks = e.stack.split("\n")
        const temp = []
        stacks.forEach(stack => {
            if (!stack.includes("node_modules")) {
                temp.push(stack)
            }
        })
        const match = regex.exec(temp[3]);
        return {
            filepath: match[1],
            line: match[2],
            column: match[3]
        };
    } catch (e) {
        return {
            filepath: "unknow",
            line: "0",
            column: "0"
        };
    }
}
const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            dirname: 'log', filename: 'server.log'
        }),
    ],
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss,SSS" }),
        winston.format.align(),
        winston.format.splat(),
        winston.format.printf(
            (info) => {
                const { timestamp, level, message } = info;
                const { filepath, line } = thisLine()
                return `[${timestamp}] [${level.toUpperCase()}] [${filepath}:${line}] ${message}`; // 包括文件名和行号
            }
        )
    ),
    maxSize: '1000m', // 每个日志文件最大尺寸
    maxFiles: '14d' // 保留的日志文件天数
});

module.exports = logger