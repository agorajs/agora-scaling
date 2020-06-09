/**
 * Implementation of the Scale algorithm
 *
 * Scales up the size of the graph until there is no more overlap
 */
import type { Algorithm } from 'agora-graph';
/**
 * Executes the Scale algorithm for this graph
 *
 * @param {Graph} graph the graph to update
 * @param {object} options to pass to the algorith
 * @param {number} options.padding padding to add between nodes
 */
export declare const scaling: import("agora-graph").Function<{
    padding: number;
}>;
export declare const ScalingAlgorithm: Algorithm<{
    padding: number;
}>;
export default ScalingAlgorithm;
//# sourceMappingURL=index.d.ts.map