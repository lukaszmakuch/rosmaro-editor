import Editor from './Editor';
import InactiveToolbar from './InactiveToolbar';
import ListOfNodes from './ListOfNodes';
import SourceView from './SourceView';
import ChangeGraphNameToolbar from './ChangeGraphNameToolbar';
import GraphView from './GraphView';
import InitializingListOfNodes from './InitializingListOfNodes';
import InitializingToolbar from './InitializingToolbar';
import EditingGraph from './EditingGraph';
import GraphNodeToolbar from './GraphNodeToolbar';
import EdgeBetweenNodesToolbar from './EdgeBetweenNodesToolbar';
import EntryPointEdgeToolbar from './EntryPointEdgeToolbar';
import NewChildNodeToolbar from './NewChildNodeToolbar';
import NewEntryPointToolbar from './NewEntryPointToolbar';
import EdgeAdder from './EdgeAdder';
import EntryPointToolbar from './EntryPointToolbar';
import NewNodeToolbar from './NewNodeToolbar';
import RenameLeaf from './RenameLeaf';

export default data => ({
  SourceView: SourceView(data),
  'rename leaf': RenameLeaf(data),
  NoNodeSelected: Editor(data),
  InitializingGraph: Editor(data),
  EditingGraphItself: Editor(data),
  EditingGraphNode: Editor(data),
  "editing leaf": Editor(data),
  EditingEntryPoint: Editor(data),
  AddingNodeScreen: Editor(data),
  EditingEntryPointEdge: Editor(data),
  EditingEdgeBetweenNodes: Editor(data),
  ListOfNodes: ListOfNodes(data),
  InactiveToolbar: InactiveToolbar(data),
  ChangeGraphNameToolbar: ChangeGraphNameToolbar(data),
  GraphView: GraphView(data),
  InitializingListOfNodes: InitializingListOfNodes(data),
  InitializingToolbar: InitializingToolbar(data),
  EntryPointToolbar: EntryPointToolbar(data),
  GraphNodeToolbar: GraphNodeToolbar(data),
  EditingGraph: EditingGraph(data),
  EdgeBetweenNodesToolbar: EdgeBetweenNodesToolbar(data),
  EntryPointEdgeToolbar: EntryPointEdgeToolbar(data),
  NewChildNodeToolbar: NewChildNodeToolbar(data),
  NewEntryPointToolbar: NewEntryPointToolbar(data),
  NewNodeToolbar: NewNodeToolbar(data),
  EdgeAdder: EdgeAdder(data)
});