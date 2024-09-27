import { Note } from "../models/note";
import { User } from "../models/user";

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

export async function deleteNote(noteId: string) {
  await fetchData("/api/notes/" + noteId, { method: "DELETE" });
}

export async function editNote(noteId: string, note: NoteInput): Promise<Note> {
  const res = await fetchData("/api/notes/" + noteId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  const data = res.json();
  return data;
}

export async function getLoggedInUser(): Promise<User> {
  const res = await fetchData("/api/users", { method: "GET" });
  return res.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signup(credentials: SignUpCredentials): Promise<User> {
  const res = await fetchData("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const res = await fetchData("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return res.json();
}

export async function logout() {
  await fetchData("/api/users/logout", { method: "POST" });
}
