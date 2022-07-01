var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json('/messages')
})
router.post('/', (req, res, next) => {
    
})
router.put('/', (req, res, next) => {
    
})
router.delete('/', (req, res, next) => {
    
})

module.exports = router;