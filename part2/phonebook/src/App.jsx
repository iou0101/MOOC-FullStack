import { useState } from "react";

const App = () => {
  return (
    <>
      <h1>Phonebook App</h1>
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul></ul>
    </>
  );
};

export default App;
