import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import SuccessNotification from "./components/SuccessNotification";
import ErrorNotification from "./components/ErrorNotification";

import personsService from "./services/persons";

export default function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

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
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook, replace the old number with the new one?`
      );

      if (!confirmUpdate) return;

      const personToUpdate = persons.find((person) => person.name === newName);

      personsService
        .update(personToUpdate.id, { ...personToUpdate, number: newNumber })
        .then((updatedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === personToUpdate.id ? updatedPerson : person
            )
          );
          displaySuccessMessage(`Updated ${personToUpdate.name}`);
        })
        .catch((error) => {
          console.log(error);
          setPersons(
            persons.filter((person) => person.id !== personToUpdate.id)
          );
          displayErrorMessage(
            `Information of ${personToUpdate.name} has already been removed from the server`
          );
        });

      setNewName("");
      setNewNumber("");
    } else {
      personsService
        .create({
          name: newName,
          number: newNumber,
        })
        .then((newPerson) => {
          setPersons([...persons, newPerson]);
          displaySuccessMessage(`Added ${newName}`);
        })
        .catch((error) => displayErrorMessage(error.response.data.error));

      setNewName("");
    }
  };

  const handleDelete = (name, id) => {
    if (!window.confirm(`Delete ${name} ?`)) return;

    personsService.remove(id).then((status) => {
      if (status === 204) {
        setPersons(persons.filter((person) => person.id !== id));
        displaySuccessMessage(`Deleted ${name}`);
      }
    });
  };

  const displaySuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => setErrorMessage(null), 3000);
  };

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <SuccessNotification message={successMessage} />
      <ErrorNotification message={errorMessage} />

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
