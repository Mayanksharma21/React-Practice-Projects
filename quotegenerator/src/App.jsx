import React, { useEffect, useState } from "react";

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://api.quotable.io/quotes/random")
      .then((res) => res.json())
      .then(
        (res) => (
          setQuote(res[0].content),
          setAuthor(res[0].author)
        )
      );
  }, []);

  return (
    <div className="max-w-5xl mx-auto bg-black my-44">
      <div className="flex flex-col justify-center items-end gap-6 text-center p-10">
        <div className="max-w-3xl text-2xl mx-auto  p-4">{quote}</div>
        <div className="">{`~ ${author}`}</div>
      </div>
    </div>
  );
};

export default App;
