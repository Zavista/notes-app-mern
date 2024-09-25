import { useEffect, useState } from "react";
import { Note as NoteModel } from "./models/note";
import Note from "./components/Note";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import styles from "./styles/NotesPage.module.css";
import stylesUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/notes_api";
import AddEditNoteDialog from "./components/AddEditNoteDialog";
import { FaPlus } from "react-icons/fa";

const App = () => {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);

  const getNotes = async () => {
    try {
      setShowNotesLoadingError(false);
      setNotesLoading(true);
      const notes = await NotesApi.fetchNotes();
      setNotes(notes);
    } catch (error) {
      console.error(error);
      setShowNotesLoadingError(true);
    } finally {
      setNotesLoading(false);
    }
  };

  const deleteNote = async (note: NoteModel) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((exisitingNote) => exisitingNote._id !== note._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <Container className={styles.notesPage}>
      <Button
        onClick={() => setShowAddEditNoteDialog(true)}
        className={`mb-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter}`}
      >
        <FaPlus></FaPlus>
        Add New Note
      </Button>

      {notesLoading && <Spinner animation="border" variant="primary"></Spinner>}
      {showNotesLoadingError && (
        <p>Something went wrong. Please refresh the page.</p>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
              {notes.map((note) => (
                <Col key={note._id}>
                  <Note
                    note={note}
                    classname={styles.note}
                    onDeleteNoteClicked={deleteNote}
                    onNoteClicked={setNoteToEdit}
                  ></Note>
                </Col>
              ))}
            </Row>
          ) : (
            <p>You don't have any notes yet. </p>
          )}
        </>
      )}

      {showAddEditNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddEditNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setShowAddEditNoteDialog(false);
            setNotes([...notes, newNote]);
          }}
        ></AddEditNoteDialog>
      )}
      {noteToEdit && (
        <AddEditNoteDialog
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            setNotes(
              notes.map((existingNote) =>
                existingNote._id === updatedNote._id
                  ? updatedNote
                  : existingNote
              )
            );
            setNoteToEdit(null);
          }}
        ></AddEditNoteDialog>
      )}
    </Container>
  );
};

export default App;
