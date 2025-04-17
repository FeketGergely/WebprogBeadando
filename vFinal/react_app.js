const { useState } = React;

function Counter() {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h2>Számláló: {count}</h2>
            <button onClick={() => setCount(count + 1)}>Növelés</button>
            <button onClick={() => setCount(count - 1)}>Csökkentés</button>
        </div>
    );
}

function App() {
    return (
        <div>
            <h1>React Alkalmazás</h1>
            <Counter />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
