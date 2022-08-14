//fetch get:
async function getResp() {
  document.getElementById("demo").innerText = await fetch(
    "https://jsonplaceholder.typicode.com/posts/1"
  )
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        wConsoleLog("failed");
      }
    })
    .then((json) => {
      wConsoleLog(json);
      return JSON.stringify(json);
    });
}

//fetch post:
async function createPost() {
  document.getElementById("demo2").innerText = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {
      method: "POST",
      body: JSON.stringify({
        title: "kappa",
        body: "123",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  )
    .then((Response) => {
      if (Response.ok) {
        return Response.json();
      } else {
        wConsoleLog("failed");
      }
    })
    .then((json) => {
      wConsoleLog(json);
      return JSON.stringify(json);
    });
}
