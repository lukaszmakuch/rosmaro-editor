import Editor from './Editor';
import InactiveToolbar from './InactiveToolbar';
import ListOfNodes from './ListOfNodes';
import SourceView from './SourceView';
import ChangeGraphNameToolbar from './ChangeGraphNameToolbar';
import GraphView from './GraphView';
import InitializingListOfNodes from './InitializingListOfNodes';
import InitializingToolbar from './InitializingToolbar';
import EditingGraph from './EditingGraph';
import ChildNodeToolbar from './ChildNodeToolbar';
import EdgeBetweenNodesToolbar from './EdgeBetweenNodesToolbar';
import EntryPointEdgeToolbar from './EntryPointEdgeToolbar';
import NewChildNodeToolbar from './NewChildNodeToolbar';
import NewEntryPointToolbar from './NewEntryPointToolbar';
import EdgeAdder from './EdgeAdder';
import EntryPointToolbar from './EntryPointToolbar';
import NewNodeToolbar from './NewNodeToolbar';
import RenameLeaf from './RenameLeaf';
import CompositeItselfToolbar from './CompositeItselfToolbar';
import NewCompositeChildToolbar from './NewCompositeChildToolbar';
import EditingCompositeChildToolbar from './EditingCompositeChildToolbar';
import CompositeEdgeHandler from './CompositeEdgeHandler';
import EditingComposite from './EditingComposite';

export default data => ({
  SourceView: SourceView(data),
  'rename leaf': RenameLeaf(data),
  NoNodeSelected: Editor(data),
  InitializingGraph: Editor(data),
  EditingGraphItself: Editor(data),
  'editing composite': EditingComposite(data),
  EditingChildNode: Editor(data),
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
  ChildNodeToolbar: ChildNodeToolbar(data),
  EditingGraph: EditingGraph(data),
  EdgeBetweenNodesToolbar: EdgeBetweenNodesToolbar(data),
  EntryPointEdgeToolbar: EntryPointEdgeToolbar(data),
  NewChildNodeToolbar: NewChildNodeToolbar(data),
  NewEntryPointToolbar: NewEntryPointToolbar(data),
  NewNodeToolbar: NewNodeToolbar(data),
  EdgeAdder: EdgeAdder(data),

  // child node editor
  "child node editor": Editor(data),
  "child node toolbar view": ChildNodeToolbar(data),

  // composites - whole views
  "editing composite itself": Editor(data),
  "adding composite child": Editor(data),
  "editing composite child": Editor(data),

  // composites - toolbars
  "composite itself toolbar view": CompositeItselfToolbar(data),
  "new composite child toolbar view": NewCompositeChildToolbar(data),
  "editing composite child toolbar view": EditingCompositeChildToolbar(data),

  // composites - utils
  'composite edge handler': CompositeEdgeHandler(data),

});