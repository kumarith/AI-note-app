"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { signOut, useSession } from "next-auth/react";
import { addNote, deleteNote, Note, updateNote } from "@/redux/notesSlice";
import type { RootState } from "@/lib/store";



const Dashboard: React.FC = () => {

  const [noteInput, setNoteInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
   const { data: session } = useSession();
  const notes = useAppSelector((state: RootState) => state.notes.items);
  const dispatch = useAppDispatch();

  const handleAddNote = async () => {
    if (noteInput.trim() !== "") {
     dispatch(addNote(noteInput)); 
      setNoteInput("");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

 const handleDelete = (id : string) => {
  dispatch(deleteNote(id));
 };
  

  const handleEdit = (noteId: string, currentNote: string) => {
    setEditNoteId(noteId);
    setEditValue(currentNote);
  };

  const handleSave = () => {
    if (editValue.trim() !== "") {
      if (editNoteId !== null) {
        dispatch(updateNote({ id: editNoteId, content: editValue }));
      }
      setEditNoteId(null);
      setEditValue("");
    }
  };

 
  const filteredNotes : Note[] = notes.filter((note) =>
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">AI Notes Dashboard</h1>
      
       {/* User Info + Sign Out */}
        <div className="flex items-center gap-4">
          {session?.user && (
            <span className="text-gray-700 text-sm">
              Signed in as <strong>{session.user.email}</strong>
            </span>
          )}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          onClick={() => {
            signOut({ callbackUrl: '/signIn' });
            console.log("Sign out clicked");
          }}
          >
            Sign Out
          </button>
        </div>
      

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        value={searchQuery}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md p-2 w-full mb-4"
      />

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Type your note here..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          className="border border-gray-300 rounded-md p-2 flex-1"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-md shadow hover:bg-blue-600 transition-colors"
          onClick={handleAddNote}
        >
          Save
        </button>
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="border border-gray-300 rounded-md p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-lg mb-2">Note {note.id}</h3>

            {editNoteId === note.id ? (
              <div>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full mb-2"
                />
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditNoteId(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md hover:bg-gray-500"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-600 mb-3">{note.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(note.id, note.content)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
