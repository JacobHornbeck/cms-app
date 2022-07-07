var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator')
const Document = require('../models/document')

router.get('/', (req, res, next) => {
    Document.find()
            .then(documents => {
                return res.status(200).json({
                    message: 'Documents found',
                    documents: documents
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
    Document.findOne({ id: req.params.id })
            .then(document => {
                return res.status(200).json({
                    message: 'Document found',
                    document: document
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
    const maxDocumentId = sequenceGenerator.nextId('documents')

    const document = new Document({
        id: maxDocumentId,
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    })

    document.save()
            .then(createdDocument => {
                res.status(201).json({
                    message: 'Document added successfully',
                    document: createdDocument
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
    Document.findOne({ id: req.params.id })
            .then(document => {
                document.name = req.body.name;
                document.description = req.body.description;
                document.url = req.body.url;

                document.save()
                        .then(result => {
                            res.status(204).json({
                                message: 'Document updated successfully',
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
    Document.findOneAndDelete({ id: req.params.id })
            .then(result => {
                res.status(204).json({
                    message: "Document deleted successfully",
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
