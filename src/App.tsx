import "reactflow/dist/style.css";
import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Square } from "./components/nodes/square";
import { useCallback } from "react";
import * as Toolbar from "@radix-ui/react-toolbar";

const NODE_TYPES = {
  square: Square,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: {},
  },
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: {},
  },
];

function App() {
  const [edges, setEdges, onEdgesChanges] = useEdgesState([]);
  const [nodes, setNodes, onNodesChanges] = useNodesState(INITIAL_NODES);

  function addSquareNodes() {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 300,
        },
        data: {},
      },
    ]);
  }

  const onConnect = useCallback((connection: Connection) => {
    return setEdges((edges) => addEdge(connection, edges));
  }, []);
  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        nodes={nodes}
        connectionMode={ConnectionMode.Loose}
        edges={edges}
        onNodesChange={onNodesChanges}
        onEdgesChange={onEdgesChanges}
        onConnect={onConnect}
      >
        <Background size={2} color="#ddd" gap={12} />
        <Controls />
      </ReactFlow>
      <Toolbar.Root className="fixed bottom-20 left-[37%] -tranlate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 px-8 h-20 w-96 overflow-hidden">
        <Toolbar.Button
          className="w-32 h-32 bg-violet-500 mt-6 rounded transition-transform hover:translate-y-2"
          onClick={addSquareNodes}
        ></Toolbar.Button>
      </Toolbar.Root>
    </div>
  );
}

export default App;
