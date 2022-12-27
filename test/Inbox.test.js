const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const web3 = new Web3(ganache.provider())

const INITIAL_STRING = 'Hi There!'
let accounts
let inbox

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts()
  // Use one of those account to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [INITIAL_STRING],
    })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
  it('deploys a contarct', () => {
    assert.ok(inbox.options.address)
  })

  it('has default message', async () => {
    const message = await inbox.methods.message().call()
    assert.equal(message, INITIAL_STRING)
  })

  it('can change the message', async () => {
    await inbox.methods.setMessage('Hi here!').send({
      from: accounts[0],
    })
    const message = await inbox.methods.message().call()
    assert.equal(message, 'Hi here!')
  })
})
