#!/usr/bin/env node
const solc = require('solc')

function getSelectors(code) {


  const input = {
    language: 'Solidity',
    sources: {
      'test.sol': {
        content: `
          pragma experimental ABIEncoderV2; 
          interface C { 
            ${code} external; 
          }
        `
      }
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*']
        }
      }
    }
  }
  const output = JSON.parse(solc.compile(JSON.stringify(input)))
  const errors = output.errors.filter(e => e.severity === 'error')
  if (errors.length) {
    if (!code.startsWith('function')) {
      return getSelectors('function ' + code)
    }
    let msg = ''
    for (const e of errors) {
      msg += e.formattedMessage + '\n'
    }
    throw new Error(msg)
  }

  const methods = output.contracts['test.sol'].C.evm.methodIdentifiers
  for (const m in methods) {
    console.log(`0x${methods[m]} ${m}`)
  }
}

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })
}

async function main() {
  process.argv.shift()  // skip node.exe
  process.argv.shift()  // skip name of js file
  const args = process.argv.join(" ")
  if (args) {
    getSelectors(args)
    process.exit(0)
  } else {
    const input = await streamToString(process.stdin)
    getSelectors(input)
    process.exit(0)
  }
}

main().catch(console.log)
