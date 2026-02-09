import { Notes } from "./pages/Notes";

function App() {
  return (
    <div className="canvas-background flex items-center justify-center h-screen w-screen p-7 bg-gray-100">
      <div className="flex flex-col gap-4 text-lg fixed top-16 left-16 text-gray-700">
        <h1 className="text-3xl font-medium">
          Abel Hii Tempo.io assignment submission
        </h1>
        <p className="max-w-lg text-gray-500">
          Add notes by choosing a size from the toolbar below. Drag notes to
          reposition them. Resize the note by using the anchor in the bottom
          right corner. 
        </p>
      </div>
      <Notes />
    </div>
  );
}

export default App;
