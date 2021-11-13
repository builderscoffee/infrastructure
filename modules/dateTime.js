const format = () => {
    var now = new Date()
    return `${ now.toLocaleDateString("fr-fr", {year: 'numeric', month: 'numeric', day: 'numeric'} )} ${ now.toLocaleString("fr-fr", {hour: 'numeric', minute: 'numeric'}) }`
}

module.exports = {
    format
}