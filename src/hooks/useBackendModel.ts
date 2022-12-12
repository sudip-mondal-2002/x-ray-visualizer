import { useState, useCallback } from "react";
import { FileStateType } from "../store/FileDataStore";
type ModelResult = {
  data: {
    time: number;
    intensity: number;
  }[];
  bursts: number[]; //timestamp of bursts
};
async function seedGenerator() {
  // making the function async as the axios function is also async
  const data = [];
  const dataFrequency = 128;
  for (let i = 0; i < 512; i++) {
    const dataPoint = {
      time: i / dataFrequency,
      intensity: Math.random()
    };
    data.push(dataPoint);
  }
  const numberOfBursts = Math.floor(Math.random() * 7 + 1);
  const bursts = [];
  for (let i = 0; i < numberOfBursts; i++) {
    bursts.push(Math.floor(data.length * Math.random()) / dataFrequency);
  }
  bursts.sort();
  return {
    data,
    bursts
  };
}
const useBackendModel = (path: string) => {
  const [result, setResult] = useState<ModelResult>();
  const [error, setError] = useState<string>();

  const getResults = useCallback(
    async function (file: FileStateType) {
      console.log(
        `This should be fetched by sending an HTTP POST request to ${path} with body ${file.fileName}`
      );
      // Here I am generating a simple dummy result
      try {
        setResult(await seedGenerator());
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      }
    },
    [path]
  );

  return {
    result,
    error,
    getResults
  };
};

export default useBackendModel;
