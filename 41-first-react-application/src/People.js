// import { request } from "http";
import { useEffect, useState } from "react";

export default function People() {
  const [people, setPeople] = useState([]);

  //   const getPeople = () => {
  //     console.log("fetch people");
  //     fetch("https://jsonplaceholder.typicode.com/users")
  //       .then((response) => response.json())
  //       .then((result) => console.log(result));
  //   };

  const getPeople = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const result = await response.json();

    setPeople(result);
  };

  useEffect(() => {
    getPeople();
  }, []);

  return (
    <div>
      <h2>People</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
