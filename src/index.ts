/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */

import _ from 'lodash'
import { overlap, Δ, length, optimalVector, Node, Graph } from 'agora-graph'
import { Result } from 'agora-algorithm'

export default scale

/**
 * Executes the Scale algorithm for this graph
 *
 * @param graph the graph to update
 * @param [options] options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
export function scale(graph: Graph, options = { padding: 0 }): Result {
  const scaleRatio = getMaxOverlapRatio(graph.nodes, options.padding)

  _.forEach(graph.nodes, node => {
    node.x *= +scaleRatio
    node.y *= +scaleRatio
  })

  return { graph: graph }
}

/**
 * find the biggest ratio for overlapping nodes
 * @param nodes
 * @param [padding=0]
 */
function getMaxOverlapRatio(nodes: Node[], padding: number = 0): number {
  let maxOverlapRatio = 1
  for (let i = 0; i < nodes.length; i++) {
    const n1 = nodes[i]
    for (let j = i + 1; j < nodes.length; j++) {
      const n2 = nodes[j]

      if (overlap(n1, n2, padding)) {
        const actualDist = length(Δ(n1, n2))
        const optimalDist = length(optimalVector(n1, n2, padding))

        if (actualDist !== 0) {
          const ratio = optimalDist / actualDist
          if (maxOverlapRatio < ratio) {
            maxOverlapRatio = ratio
          }
        }
      }
    }
  }

  return maxOverlapRatio
}
