import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export type Note = {
  id: string;
  title: string | null;
  content: string;
};

type NotesState = {
  items: Note[];
  loading: boolean;
  error: string | null;
};

const initialState: NotesState = {
  items: [],
  loading: false,
  error: null,
};

// Fetch notes
export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const res = await fetch("/api/notes");
  if (!res.ok) throw new Error("Failed to fetch notes");
  return (await res.json()) as Note[];
});

// Add note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (content: string) => {
    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Note", content }),
    });
    if (!res.ok) throw new Error("Failed to add note");
    return (await res.json()) as Note;
  }
);

// Update note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async ({ id, content }: { id: string; content: string }) => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    if (!res.ok) throw new Error("Failed to update note");
    return (await res.json()) as Note;
  }
);

// Delete note
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (id: string) => {
    const res = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete note");
    return id;
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotes.fulfilled, (state, action: PayloadAction<Note[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load notes";
      })

      // Add
      .addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
        state.items.unshift(action.payload);
      })

      // Update
      .addCase(updateNote.fulfilled, (state, action: PayloadAction<Note>) => {
  state.items = state.items.map((note) =>
    note.id === action.payload.id ? action.payload : note
  );
})

      // Delete
      .addCase(deleteNote.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((n) => n.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
