const { usage } = require("./cmd/cli/usage")

const exportData = async () => {
    console.log("export");
}

const help = () => {
    console.log(usage);
}

module.exports = {
    exportData,
    help
}