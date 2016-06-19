
import * as link from './link'
import {graph as graphAPI, changeSet} from '@buggyorg/graphtools'
import _ from 'lodash'

/**
 * Replaces all links in a graph with normal edges. This extends the compound nodes in between the
 * connected nodes.
 * @param {Graphlib} graph The graph with possible links
 * @returns {Graphlib} A graph that has no links anymore.
 * @throws {Error} If the graph contains invalid links (like those going through recursions) it will
 * throw an exception indicating which link is invalid.
 */
export default function (graph) {
  var links = link.allLinks(graph)
  var changes = _.concat(
    _.flatten(_.map(links, (l) => link.getAuxPorts(graph, l))),
    _.flatten(_.map(links, (l) => link.getAuxEdges(graph, l)))
  )
  var graphJSON = graphAPI.toJSON(graph)
  return graphAPI.importJSON(
    _.reduce(changes, (gr, cs) => {
      return changeSet.applyChangeSet(gr, cs)
    }, graphJSON)
  )
}
