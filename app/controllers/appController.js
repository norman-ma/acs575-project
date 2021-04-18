module.exports = {
    /**
     * Serves Homepage
     */
    showHome: (req, res) => {
        res.sendFile('./views/index.html', {root: './'})
    }
}