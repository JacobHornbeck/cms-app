var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator')
const Message = require('../models/message')

router.get('/', (req, res, next) => {
    Message
        .find()
        .populate('sender')
        .then(messages => {
            return res.status(200).json({
                message: 'Messages found',
                messages: messages
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
})
router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId('messages')

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender
    })

    message
        .save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                createdMessage: createdMessage
            })
        })
        .catch(err => {
            res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
})
router.put('/:id', (req, res, next) => {
    Message
        .findById(req.params.id)
        .then(message => {
            message.name = req.body.name
            message.email = req.body.email
            message.phone = req.body.phone
            message.imageUrl = req.body.imageUrl
            message.group = req.body.group

            message.save()
                    .then(result => {
                        res.status(204).json({
                            message: 'Message updated successfully',
                            result: result
                        })
                    })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
})
router.delete('/:id', (req, res, next) => {
    Message
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).json({
                message: "Message deleted successfully",
                result: result
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
})

module.exports = router;
