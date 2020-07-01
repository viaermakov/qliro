import React, { useReducer, useState } from "react";
import qs from "querystring";
import axios from "axios";

import { Input } from "../input";
import { Checkbox } from "../checkbox";
import { Button } from "../button";

import styles from "./main.scss";

const fetchData = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

const initialState = {
  error: null,
  isLoading: false,
  result: null,
};

function mainReducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return {
        isLoading: true,
        error: null,
      };
    }
    case "SUCCESS": {
      return {
        error: null,
        isLoading: false,
        result: action.result,
      };
    }
    case "ERROR": {
      return {
        error: action.error,
        result: null,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
}

function Main() {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [experiments, setExperiments] = useState(null);
  const [hasChangedDoor, setHasChangedDoor] = useState(false);

  const getData = async () => {
    const query = {
      experiments,
    };
    if (hasChangedDoor) {
      query.changed = hasChangedDoor;
    }

    dispatch({ type: "INIT" });

    try {
      const data = await fetchData(
        `http://localhost:3000/result?${qs.stringify(query)}`
      );
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch({ type: "SUCCESS", result: data.chances });
    } catch (e) {
      dispatch({ type: "ERROR", error: e.message });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!experiments) {
      return;
    }
    getData();
  };

  return (
    <div className={styles.main}>
      <h1>Monty Hall problem</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          id="experiments"
          name="Number of experiments"
          className={styles.field}
          type="number"
          required={true}
          min={1}
          onChange={(v) => setExperiments(v)}
        />
        <Checkbox
          id="changed"
          name="changed"
          isActive={hasChangedDoor}
          onChange={() => setHasChangedDoor((v) => !v)}
          className={styles.field}
        />

        <Button className={styles.button} type="submit">
          Try
        </Button>
      </form>
      <div className={styles.result}>
        {state.isLoading && <span data-testid="loader">Loading...</span>}
        {state.error && <span data-testid="result">{state.error}</span>}
        {state.result && (
          <span data-testid="result">Chances to win {state.result}%</span>
        )}
      </div>
    </div>
  );
}

export default Main;
