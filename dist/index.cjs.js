'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var forEach = _interopDefault(require('lodash/forEach'));
var agoraGraph = require('agora-graph');

/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */
/**
 * Executes the Scale algorithm for this graph
 *
 * @param {Graph} graph the graph to update
 * @param {object} options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */

var scaling = agoraGraph.createFunction(function (graph) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    padding: 0
  };
  var scaleRatio = getMaxOverlapRatio(graph.nodes, options); // scale it up

  forEach(graph.nodes, function (n) {
    n.x *= +scaleRatio;
    n.y *= +scaleRatio;
  });
  var x_origin = agoraGraph.minX(agoraGraph.minX(graph.nodes));
  var y_origin = agoraGraph.minY(agoraGraph.minY(graph.nodes)); // shift to origin

  forEach(graph.nodes, function (n) {
    n.x -= x_origin;
    n.y -= y_origin;
  });
  return {
    graph: graph
  };
});
var ScalingAlgorithm = {
  name: 'Scaling',
  algorithm: scaling
};
/**
 * find the biggest ratio for overlapping nodes
 * @param nodes
 * @param {number} options.padding padding to add between nodes
 */

function getMaxOverlapRatio(nodes) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    padding: 0
  };
  var maxOverlapRatio = 1;
  var overlapGroups = agoraGraph.getAllOverlaps(nodes);
  forEach(overlapGroups, function (group) {
    for (var i = 0; i < group.length; i++) {
      var u = group[i];

      for (var j = i + 1; j < group.length; j++) {
        var v = group[j];

        if (agoraGraph.overlap(u, v, options)) {
          var actualDist = agoraGraph.norm(u, v);

          if (actualDist !== 0) {
            var optimalDist = agoraGraph.length(agoraGraph.optimalVector(u, v, options.padding));
            var ratio = optimalDist / actualDist;

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

exports.ScalingAlgorithm = ScalingAlgorithm;
exports.default = ScalingAlgorithm;
exports.scaling = scaling;
