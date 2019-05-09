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
    // scale it up
    lodash_1.default.forEach(graph.nodes, function (n) {
        n.x *= +scaleRatio;
        n.y *= +scaleRatio;
    });
    var x_origin = agora_graph_1.minX(agora_graph_1.minX(graph.nodes));
    var y_origin = agora_graph_1.minY(agora_graph_1.minY(graph.nodes));
    // shift to origin
    lodash_1.default.forEach(graph.nodes, function (n) {
        n.x -= x_origin;
        n.y -= y_origin;
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
    var overlapGroups = agora_graph_1.getAllOverlaps(nodes);
    lodash_1.default.forEach(overlapGroups, function (group) {
        for (var i = 0; i < group.length; i++) {
            var u = group[i];
            for (var j = i + 1; j < group.length; j++) {
                var v = group[j];
                if (agora_graph_1.overlap(u, v, padding)) {
                    var actualDist = agora_graph_1.norm(u, v);
                    if (actualDist !== 0) {
                        var optimalDist = agora_graph_1.length(agora_graph_1.optimalVector(u, v, padding));
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
