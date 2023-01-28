import React from "react";

export default function Persons({ personsToShow, handleDelete }) {
  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleDelete(person.name, person.id)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
