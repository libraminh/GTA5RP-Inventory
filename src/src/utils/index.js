import { FETCH_URL } from "./constant";

export const fetchAPI = async (eventName, body) => {
  await fetch(`${FETCH_URL}/${eventName}`, {
    method: "POST",
    // headers: {
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // },
    body: JSON.stringify(body),
  });
};

export const formatMoney = (n, c, d, t) => {
  var c = isNaN((c = Math.abs(c))) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return (
    s +
    (j ? i.substr(0, j) + t : "") +
    i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
  );
};
