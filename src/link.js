
import _ from 'lodash'
import { utils, changeSet } from '@buggyorg/graphtools'

/**
 * Returns all links in a graph. (I.e. edges whose starting point has a different parent than its end point).
 * @param {Graphlib} graph The graph
 * @returns {Link[]} An array of links.
 */
export function allLinks (graph) {
  return _(graph.edges())
    .map((e) => _.merge({}, e, {vParent: graph.parent(e.v), wParent: graph.parent(e.w), original: e}))
    .reject((e) => e.vParent === e.wParent || e.vParent === e.w || e.v === e.wParent)
    .map((e) => _.merge({}, e.original, {value: graph.edge(e.original)}))
    .value()
}

/**
 * Checks whether the link is a valid link (i.e. don't cross recursion borders).
 * @param {Graphlib} graph The graph.
 * @param {Link} link The connection to test.
 * @returns {boolean} True if the graph has only valid links, false otherwise.
 */
export function checkLink (graph, link) {
  var connection = utils.hierarchyConnection(graph, link)
  var nodes = _(connection)
    .map((c) => graph.node(c))
    .filter((c) => c.recursive || c.recursiveRoot)
    .value()
  return nodes.length === 0
}

const portName = (link) => 'aux_' + utils.linkName(link, false)

/**
 * Creates auxiliary ports for a link that will enable cross-compound communications
 * @param {Graphlib} graph The graph
 * @param {Link} link The link that needs to go through compounds
 * @return {ChangeSet[]} A changeset that contains the auxiliary ports.
 */
export function getAuxPorts (graph, link) {
  var connection = utils.hierarchyConnection(graph, link)
  return _.map(connection, (c) => changeSet.updateNode(c, {auxilliaryPorts: [{node: link.w, name: portName(link), type: 'bool'}]}))
}

export function getAuxEdges (graph, link) {
  var connection = utils.hierarchyConnection(graph, link)
  return _.concat(changeSet.createConnection(_.concat([{node: link.v}],
    _.map(connection, (c) => ({node: c, port: portName(link)})),
    [{node: link.w}]), _.merge({target: link.w}, _.omit(link.value, ['inPort', 'outPort']))), [changeSet.removeEdge(link)])
}
