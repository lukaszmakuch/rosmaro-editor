import Editor from './Editor';
import InactiveToolbar from './InactiveToolbar';
import ListOfNodes from './ListOfNodes';
import SourceView from './SourceView';
import ChangeGraphNameToolbar from './ChangeGraphNameToolbar';
import GraphView from './GraphView';
import InitializingListOfNodes from './InitializingListOfNodes';
import InitializingToolbar from './InitializingToolbar';
import UIExtractor from './UIExtractor';
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
import CompositeEdgeHandler from './CompositeEdgeHandler';
import EditingComposite from './EditingComposite';
import CodeGenerator from './CodeGenerator';
import SourceErrorMessage from './SourceErrorMessage';
import EditorUI from './EditorUI';
import EditorTopLayer from './EditorTopLayer';
import EditingDynamicComposite from './EditingDynamicComposite';
import DynamicCompositeToolbarView from './DynamicCompositeToolbarView';

export default data => ({
  SourceView: SourceView(data),
  IncorrectSourceView: SourceView(data, SourceErrorMessage),
  RenameLeaf: RenameLeaf(data),
  NoNodeSelected: Editor(data),
  InitializingGraph: Editor(data),
  EditingGraphItself: Editor(data),
  DynamicCompositeEditorUI: Editor(data),
  EditingDynamicComposite: EditingDynamicComposite(data),
  EditingComposite: EditingComposite(data),
  EditingChildNode: Editor(data),
  EditingLeaf: Editor(data),
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
  EditingGraph: UIExtractor(data),
  Editor: UIExtractor(data),
  EdgeBetweenNodesToolbar: EdgeBetweenNodesToolbar(data),
  EntryPointEdgeToolbar: EntryPointEdgeToolbar(data),
  NewChildNodeToolbar: NewChildNodeToolbar(data),
  NewEntryPointToolbar: NewEntryPointToolbar(data),
  NewNodeToolbar: NewNodeToolbar(data),
  EdgeAdder: EdgeAdder(data),

  // Editor
  EditorUI: EditorUI(data),
  CodeGenerator: CodeGenerator(data),
  EditorUITopLayerView: EditorTopLayer(data),

  // child node editor
  ChildNodeEditor: Editor(data),
  ChildNodeToolbarView: ChildNodeToolbar(data),

  // composites - whole views
  EditingCompositeItself: Editor(data),
  AddingCompositeChild: Editor(data),
  EditingCompositeChild: Editor(data),

  // composites - toolbars
  CompositeItselfToolbarView: CompositeItselfToolbar(data),
  NewCompositeChildToolbarView: NewCompositeChildToolbar(data),

  // composites - utils
  CompositeEdgeHandler: CompositeEdgeHandler(data),

  // dynamic composites
  DynamicCompositeToolbarView: DynamicCompositeToolbarView(data),

});