const mongoose = require('mongoose')
const express = require('express')
const bodyparser = require('body-parser')
const logger = require('morgan')
const errorhandler = require('errorhandler')

mongoose.connect('mongodb://localhost:27017/crud', {useNewUrlParser: true, useUnifiedTopology: true})

let app = express()
app.use(logger('dev'))
app.use(bodyparser.json())

const Account = mongoose.model('Accounts', { name: String,
balance: Number})

app.get('/accounts', (req, res, next) => {
    Account.find({}, null, {sort: {_id: -1}}, (error, accounts) => {
        if (error) return next(error)
        res.send(accounts)
    })
})

app.param('id', (req, res, next) =>{
    Account.findById(req.param.id, (error, accounts)=>{
        req.accounts = accounts
        next()
    })
})

app.get('/accounts/:id', (req, res, next)=>{
    Account.findById(req.param.id, (error, accounts)=>{
        if(error) return next(error)
        res.send(accounts.toJSON)
    })
})

app.post('/accounts', (req, res, next) =>{
    let newAccount = new Account(req.body)
    newAccount.save((error, result) =>{
        if (error) return next(error)
        res.send(result)
    })
})

app.put('/accounts/:id', (req, res, next) =>{
    Account.findById(req.params.id, (error, accounts) =>{
        if (error) return next(error)
        if(req.body.name) accounts.name = req.body.name
        if(req.body.balance) accounts.balance = req.body.balance
        accounts.save((error, result) =>{
            res.send(result)
        })
    })
})

app.delete('/accounts/:id', (req, res, next) =>{
    Account.findById(req.param.id, (error, accounts) => {
        if (error) return next(error)
        accounts.remove((error, results) => {
            if(error) return next(error)
            res.send(results)
        })
    })
})

app.use(errorhandler())
app.listen(3000)