import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import personsService from "./services/persons";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const personsToShow =
    nameFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(nameFilter.toLowerCase())
        );

  const handleNameChange = (e) => setNewName(e.target.value);

  const handleNumberChange = (e) => setNewNumber(e.target.value);

  const handleFilterChange = (e) => setNameFilter(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameAlreadyExists = persons.some((person) => person.name === newName);

    if (nameAlreadyExists) {
      const foo = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );

      if (!foo) return;

      const personToUpdate = persons.find((person) => person.name === newName);

      personsService
        .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
        .then((updatedPerson) =>
          setPersons(
            persons.map((person) =>
              person.id === personToUpdate.id ? updatedPerson : person
            )
          )
        );

      setNewName("");
      setNewNumber("");
    } else {
      personsService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((newPerson) => setPersons([...persons, newPerson]));

      setNewName("");
    }
  };

  const handleDelete = (name, id) => {
    if (!window.confirm(`Delete ${name} ?`)) return;

    personsService.remove(id).then((status) => {
      if (status === 200) {
        setPersons(persons.filter((person) => person.id !== id));
      }
    });
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} nameFilter={nameFilter} />

      <h2>Add new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} handleDelete={handleDelete} />
    </div>
  );
}
