"use strict";
/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var agora_graph_1 = require("agora-graph");
exports.default = scale;
/**
 * Executes the Scale algorithm for this graph
 *
 * @param graph the graph to update
 * @param [options] options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
function scale(graph, options) {
    if (options === void 0) { options = { padding: 0 }; }
    var scaleRatio = getMaxOverlapRatio(graph.nodes, options.padding);
    lodash_1.default.forEach(graph.nodes, function (node) {
        node.x *= +scaleRatio;
        node.y *= +scaleRatio;
    });
    return { graph: graph };
}
exports.scale = scale;
/**
 * find the biggest ratio for overlapping nodes
 * @param nodes
 * @param [padding=0]
 */
function getMaxOverlapRatio(nodes, padding) {
    if (padding === void 0) { padding = 0; }
    var maxOverlapRatio = 1;
    for (var i = 0; i < nodes.length; i++) {
        var n1 = nodes[i];
        for (var j = i + 1; j < nodes.length; j++) {
            var n2 = nodes[j];
            if (agora_graph_1.overlap(n1, n2, padding)) {
                var actualDist = agora_graph_1.length(agora_graph_1.Δ(n1, n2));
                var optimalDist = agora_graph_1.length(agora_graph_1.optimalVector(n1, n2, padding));
                if (actualDist !== 0) {
                    var ratio = optimalDist / actualDist;
                    if (maxOverlapRatio < ratio) {
                        maxOverlapRatio = ratio;
                    }
                }
            }
        }
    }
    return maxOverlapRatio;
}
