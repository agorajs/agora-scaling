/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */
import { Graph } from 'agora-graph';
import { Result } from 'agora-algorithm';
export default scale;
/**
 * Executes the Scale algorithm for this graph
 *
 * @param graph the graph to update
 * @param [options] options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
export declare function scale(graph: Graph, options?: {
    padding: number;
}): Result;
