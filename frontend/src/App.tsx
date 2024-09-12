import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import * as NotesApi from "./network/notes_api";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  const getNotes = async () => {
    try {
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} classname={styles.note}></Note>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
