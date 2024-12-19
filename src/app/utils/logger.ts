export class logger {
    private context: string;
    private colors = {
        reset: "\x1b[0m",
        red: "\x1b[31m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        gray: "\x1b[90m",
        bold: "\x1b[1m"
    };
    constructor(context: string) {
        this.context = context;
    }
    private formatMessage(level: string, message: string, data?: any) {
        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${this.context}]`;
        return { prefix, message, data: data || {} };
    }
    private colorize(color: keyof typeof this.colors, text: string) {
        return `${this.colors[color]}${text}${this.colors.reset}`;
    }
    private formatLevel(level: string): string {
        return `[${level.toUpperCase()}]`;
    }
    private formatOutput(
        prefix: string,
        level: string,
        message: string,
        data: any
    ) {
        return `${prefix} ${this.colorize("bold", this.formatLevel(level))} ${message}`;
    }
    log(message: string, data?: any) {
        const { prefix, message: formattedMessage, data: logData } = this.formatMessage(
            "log",
            message,
            data
        );
        console.log(this.formatOutput(prefix, "log", formattedMessage, logData));
    }
    warn(message: string, data?: any) {
        const { prefix, message: formattedMessage, data: logData } = this.formatMessage(
            "warn",
            message,
            data
        );
        console.warn(this.formatOutput(prefix, "warn", formattedMessage, logData));
    }
    error(message: string, data?: any) {
        const { prefix, message: formattedMessage, data: logData } = this.formatMessage(
            "error",
            message,
            data
        );
        console.error(this.formatOutput(prefix, "error", formattedMessage, logData));
    }
}