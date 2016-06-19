/* eslint-env mocha */

import delinkify from '../src/api.js'
import * as links from '../src/link'
import { graph } from '@buggyorg/graphtools'
import chai from 'chai'
import _ from 'lodash'

const expect = chai.expect

describe('Delinkify', () => {
  it('Does not change graphs that have no links', () => {
    var fac = graph.readFromFile('test/fixtures/factorial.json')
    var result = delinkify(fac)
    expect(graph.equal(fac, result)).to.be.true
  })

  it('Resolves a link over one compound', () => {
    var fac = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    var edgesLenBefore = fac.edges().length
    var edgesBefore = _.clone(fac.edges())
    var result = delinkify(fac)
    // - 2 links + 4 edges
    expect(result.edges()).to.have.length(edgesLenBefore + 2)
    expect(_.differenceWith(result.edges(), edgesBefore, _.isEqual)).to.have.length(4)
    expect(_.differenceWith(edgesBefore, result.edges(), _.isEqual)).to.have.length(2)
  })
})
