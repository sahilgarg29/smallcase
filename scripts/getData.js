async function getData(url) {
  let res = await fetch(url);
  res = await res.json();

  return res;
}

export default getData;
