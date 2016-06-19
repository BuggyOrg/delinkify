/* eslint-env mocha */

import * as links from '../src/link.js'
import { graph } from '@buggyorg/graphtools'
import chai from 'chai'

const expect = chai.expect

describe('Graph links', () => {
  it('finds all links in a graph', () => {
    var fac = graph.readFromFile('test/fixtures/factorial.json')
    expect(links.allLinks(fac)).to.have.length(0)
    var facIf = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    expect(links.allLinks(facIf)).to.have.length(2)
  })

  it('checks whether a link is valid', () => {
    var facIf = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    var lnks = links.allLinks(facIf)
    expect(links.checkLink(facIf, lnks[0])).to.be.true
  })

  it('finds invalid links', () => {
    var facIf = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    expect(links.checkLink(facIf, {v: 'factorial_10:if_0:mux_0', w: 'stdout_8'})).to.be.false
  })

  it('creates auxiliary ports for each link', () => {
    var facIf = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    var lnks = links.allLinks(facIf)
    var genPorts = links.getAuxPorts(facIf, lnks[0])
    expect(genPorts).to.have.length(1)
  })

  it('creates auxiliary ports for each link', () => {
    var facIf = graph.readFromFile('test/fixtures/factorial_if_cont.json')
    var lnks = links.allLinks(facIf)
    var genEdges = links.getAuxEdges(facIf, lnks[0])
    expect(genEdges).to.have.length(3)
  })
})
