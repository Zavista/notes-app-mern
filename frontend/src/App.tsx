import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddNoteDialog from "./components/AddNoteDialog";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

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
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`mb-4 ${stylesUtils.blockCenter}`}
      >
        Add New Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note note={note} classname={styles.note}></Note>
          </Col>
        ))}
      </Row>
      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setShowAddNoteDialog(false);
            setNotes([...notes, newNote]);
          }}
        ></AddNoteDialog>
      )}
    </Container>
  );
};

export default App;
