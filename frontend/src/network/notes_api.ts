import { Note } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  // fetch wrapper to handle errors
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage); // Error to be caught in the try catch loop where this fetch is calledd
  }
}

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetchData("/api/notes", { method: "GET" });
  const notes = await res.json();
  return notes;
}

export interface NoteInput {
  title: string;
  text?: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const res = await fetchData("/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  const data = res.json();
  return data;
}
