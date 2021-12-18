const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullname = document.getElementById("full-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("user-name").value;
  const mobile = document.getElementById("phone-no").value;

  const data = {
    name: fullname,
    email: email,
    password: password,
    username: username,
    mobile: mobile,
    description: "AnyThing",
  };

  let res = await fetch(
    "https://masai-api-mocker.herokuapp.com/auth/register",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  res = await res.json();

  console.log(res);

  if (!res.error) {
    let res2 = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        watchList: [],
        balance: 0,
      }),

      headers: {
        "Content-Type": "application/json",
      },
    });

    res2 = await res2.json();

    console.log(res2);
  }
});
