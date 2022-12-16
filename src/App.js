import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

function App() {
  const [edit, setEdit] = useState(true);
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(null);

  return (
    <div
      className="background"
      style={{ backgroundColor: edit ? "white" : "black" }}
    >
      <nav>
        <a href="about.html">about</a>
        <a
          href="https://docs.google.com/spreadsheets/d/1x3_eG5p61At4RYIbJdeaS0wRNDfVYyPJJmvqqbggM-o/edit#gid=0"
          target="_blank"
        >
          add more statements
        </a>
      </nav>
      <div className="Blackout">
        <BlackoutTitle
          toggleEdit={() => setEdit(!edit)}
          started={started}
          edit={edit}
          setStatement={statement => setCurrent(statement)}
          current={current}
        />
        <Blackout
          editMode={edit}
          setStarted={val => setStarted(val)}
          turnOff={() => setEdit(true)}
          current={current}
        />
      </div>
    </div>
  );
}

function Blackout({ editMode, setStarted, turnOff, current }) {
  const [selects, setSelects] = useState([]);

  useEffect(() => {
    if (current === null) {
      setSelects([]);
      setStarted(false);
      console.log("resetting selects");
    }
  }, [current, setStarted]);

  function toggleWord(pindex, windex) {
    let existing = selects.findIndex(
      elt => elt.p === pindex && elt.w === windex
    );
    let duplicate = [...selects];
    if (existing === -1) {
      duplicate.push({ p: pindex, w: windex });
    } else {
      duplicate.splice(existing, 1);
    }
    console.log(duplicate);
    setSelects(duplicate);

    if (duplicate.length === 0) {
      setStarted(false);
      turnOff();
    } else {
      setStarted(true);
    }
  }

  let formattedStatement;
  if (current !== null) {
    formattedStatement = (
      <main className={editMode ? "edit" : "preview"}>
        {current.statement.split("\n").map((par, pindex) => (
          <p key={pindex}>
            {par.split(" ").map((word, windex) => (
              <span
                onClick={() => toggleWord(pindex, windex)}
                key={windex}
                className={
                  selects.findIndex(
                    elt => elt.p == pindex && elt.w === windex
                  ) !== -1
                    ? "select"
                    : ""
                }
              >
                {word}
              </span>
            ))}
          </p>
        ))}
      </main>
    );
  } else {
    formattedStatement = (
      <main>
        <h2>
          <b>Create blackout poems from the empty and meaningless Black Lives
          Matter statements put out by design organizations.</b>
        </h2>
        <p>
          The act of making a blackout poem becomes a form of close reading,
          both highlighting the absence of specific words, and creating new
          meaning within those gaps. By working within these constraints, it can
          also help to convey what must change within design organizations and institutions to
          support anti-racist design, and fight white supremacy.
        </p>
        <p>
          To start creating, search for and select a statement from the
          dropdown. Then click on the words you would like to remain, composing
          something new. Click on the "blackout" toggle to view your final poem.
        </p>
        <p>
          To add other design BLM statements to the website, add it to this{" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1x3_eG5p61At4RYIbJdeaS0wRNDfVYyPJJmvqqbggM-o/edit#gid=0"
            target="_blank"
            style={{ marginLeft: "4px" }}
          >
            {" "}
            spreadsheet
          </a>
          .
        </p>
      </main>
    );
  }

  return formattedStatement;
}

function BlackoutTitle({ toggleEdit, started, edit, setStatement, current }) {
  return (
    <header>
      <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
        <Dropdown
          items={[
            {
              title: "one two three four five six seven eight nine ten eleven",
              org: "ArtCenter College of Design"
            },
            { title: "two", org: "AIGA" },
            { title: "three", org: "Design Group" },
            {
              title: "Reflection on Civil Unrest",
              org: "ArtCenter College of Design"
            }
          ]}
          setValue={selection => setStatement(selection)}
        />
        {current !== null && (
          <div>
            <h4>{current.org}</h4>
            <a href={current.link}>[source]</a>
          </div>
        )}
      </div>
      <div>
        <input
          id="toggle"
          type="checkbox"
          checked={!edit}
          onChange={toggleEdit}
          disabled={!started}
          className={current === null ? "step1" : "step2"}
        />
        <label htmlFor="toggle">blackout</label>
      </div>
    </header>
  );
}

export default App;
