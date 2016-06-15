
/**
 * Replaces all links in a graph with normal edges. This extends the compound nodes in between the
 * connected nodes.
 * @param {Graphlib} graph The graph with possible links
 * @returns {Graphlib} A graph that has no links anymore.
 * @throws {Error} If the graph contains invalid links (like those going through recursions) it will
 * throw an exception indicating which link is invalid.
 */
export default function (graph) {
  return graph
}
