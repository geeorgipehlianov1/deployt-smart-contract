const HDWalletPovider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletPovider(
  'face nature dream use emerge mix maid case manual ivory group plate',
  'https://goerli.infura.io/v3/62d78070ad354e1badf028c788a67247',
)

const web3 = new Web3(provider)

const deploy = async () => {
  const acctounts = await web3.eth.getAccounts()
  console.log(acctounts[0])

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hi there'],
    })
    .send({
      gas: '1000000',
      from: acctounts[0],
    })
  console.log('address', result.options.address)
}

deploy()
