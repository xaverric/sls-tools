const consoleTextPrinter = require("./printer/console-text-printer");
const consoleTablePrinter = require("./printer/console-table-printer");

const PRINTERS = [
    {
        canPrint: type => type === "text",
        print: grouppedResults => consoleTextPrinter(grouppedResults)
    },
    {
        canPrint: type => type === "table",
        print: grouppedResults => consoleTablePrinter(grouppedResults)
    }
]

const _decidePrinter = (type) => {
    let printer = PRINTERS.find(printer => printer.canPrint(type))
    if (!printer) {
        throw new Error(`No printer found of type ${type}`);
    }
    return printer;
}

const printConsoleOutput = (cmdArgs, grouppedResults) => {
    _decidePrinter(cmdArgs.consoleOutput).print(grouppedResults);
}

module.exports = {
    printConsoleOutput
}