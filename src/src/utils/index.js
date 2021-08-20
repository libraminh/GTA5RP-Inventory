import { FETCH_URL } from "./constant";

export const fetchAPI = async (eventName, body) => {
  await fetch(`${FETCH_URL}/${eventName}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
