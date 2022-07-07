var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator')
const Contact = require('../models/contact')

router.get('/', (req, res, next) => {
    Contact
        .find()
        .populate('group')
        .then(contacts => {
            return res.status(200).json({
                message: 'Contacts found',
                contacts: contacts
            })
        })
        .catch(err => {
            return res.status(500).json({
                message: 'An error occurred',
                error: err
            })
        })
})
router.get('/:id', (req, res, next) => {
    Contact
        .findOne({ id: req.params.id })
        .populate('group')
        .then(contact => {
            return res.status(200).json({
                message: 'Contact found',
                contact: contact
            })
        })
})
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId('contacts')

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    })

    contact.save()
            .then(createdContact => {
                res.status(201).json({
                    message: 'Contact added successfully',
                    contact: createdContact
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
    Contact.findOne({ id: req.params.id })
        .then(contact => {
            contact.name = req.body.name
            contact.email = req.body.email
            contact.phone = req.body.phone
            contact.imageUrl = req.body.imageUrl
            contact.group = req.body.group

            contact.save()
                    .then(result => {
                        res.status(204).json({
                            message: 'Contact updated successfully',
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
    Contact.findByIdAndDelete(req.params.id)
            .then(result => {
                res.status(204).json({
                    message: "Contact deleted successfully",
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
