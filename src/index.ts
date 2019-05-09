/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */

import _ from 'lodash';
import {
  overlap,
  Δ,
  length,
  optimalVector,
  Node,
  Graph,
  getAllOverlaps,
  norm,
  minX,
  maxY,
  minY,
  nodeMap
} from 'agora-graph';
import { Result } from 'agora-algorithm';

export default scale;

/**
 * Executes the Scale algorithm for this graph
 *
 * @param graph the graph to update
 * @param [options] options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
export function scale(graph: Graph, options = { padding: 0 }): Result {
  const scaleRatio = getMaxOverlapRatio(graph.nodes, options.padding);

  // scale it up
  _.forEach(graph.nodes, n => {
    n.x *= +scaleRatio;
    n.y *= +scaleRatio;
  });

  const x_origin = minX(minX(graph.nodes));
  const y_origin = minY(minY(graph.nodes));

  // shift to origin
  _.forEach(graph.nodes, n => {
    n.x -= x_origin;
    n.y -= y_origin;
  });

  return { graph: graph };
}

/**
 * find the biggest ratio for overlapping nodes
 * @param nodes
 * @param [padding=0]
 */
function getMaxOverlapRatio(nodes: Node[], padding: number = 0): number {
  let maxOverlapRatio = 1;

  const overlapGroups = getAllOverlaps(nodes);

  _.forEach(overlapGroups, group => {
    for (let i = 0; i < group.length; i++) {
      const u = group[i];
      for (let j = i + 1; j < group.length; j++) {
        const v = group[j];

        if (overlap(u, v, padding)) {
          const actualDist = norm(u, v);
          if (actualDist !== 0) {
            const optimalDist = length(optimalVector(u, v, padding));

            const ratio = optimalDist / actualDist;
            if (maxOverlapRatio < ratio) {
              maxOverlapRatio = ratio;
            }
          }
        }
      }
    }
  });

  return maxOverlapRatio;
}
