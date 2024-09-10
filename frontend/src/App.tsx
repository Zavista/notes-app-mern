import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Note } from "./models/note";

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = async () => {
    try {
      const res = await fetch("/api/notes", { method: "GET" });
      const notes = await res.json();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return <Button>{JSON.stringify(notes)}</Button>;
};

export default App;
