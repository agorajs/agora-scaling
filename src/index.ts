/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */

import _ from 'lodash';
import {
  overlap,
  length,
  optimalVector,
  Node,
  getAllOverlaps,
  norm,
  minX,
  minY,
  createFunction,
  Algorithm
} from 'agora-graph';

/**
 * Executes the Scale algorithm for this graph
 *
 * @param {Graph} graph the graph to update
 * @param {object} options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
export const scaling = createFunction(function(
  graph,
  options: { padding: number } = { padding: 0 }
) {
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
});

export const ScalingAlgorithm: Algorithm<{ padding: number }> = {
  name: 'Scaling',
  algorithm: scaling
};

export default ScalingAlgorithm;
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
