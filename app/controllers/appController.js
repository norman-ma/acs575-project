module.exports = {
    /**
     * Serves Homepage
     */
    showHome: (req, res) => {
        res.sendFile('./views/index.html', {root: './'})
    },
    show404: (req, res) => {
        res.sendFile('./views/404.html', {root: './'})
    }
}