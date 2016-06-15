/* eslint-env mocha */

import delinkify from '../src/api.js'
import { graph } from '@buggyorg/graphtools'
import chai from 'chai'

const expect = chai.expect

describe('Delinkify', () => {
  it('Does not change graphs that have no links', () => {
    var fac = graph.readFromFile('test/fixtures/factorial.json')
    var result = delinkify(fac)
    expect(graph.equal(fac, result)).to.be.true
  })

  it('Resolves a link over one compound', () => {
  })
})
