// // "use client";

// // import { useState, useEffect } from "react";

// // import PromptCard from "./PromptCard";
// // import OpenRouterChat from "./OpenRouterChat";


// // const PromptCardList = ({ data, handleTagClick }) => {
// //   return (
// //     <div className='mt-16 prompt_layout'>
// //       {data.map((post) => (
// //         <PromptCard
// //           key={post._id}
// //           post={post}
// //           handleTagClick={handleTagClick}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // const Feed = () => {
// //   const [allPosts, setAllPosts] = useState([]);

// //   // Search states
// //   const [searchText, setSearchText] = useState("");
// //   const [searchTimeout, setSearchTimeout] = useState(null);
// //   const [searchedResults, setSearchedResults] = useState([]);

// //   const fetchPosts = async () => {
// //     const response = await fetch("/api/prompt");
// //     const data = await response.json();

// //     setAllPosts(data);
// //   };

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   const filterPrompts = (searchtext) => {
// //     const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
// //     return allPosts.filter(
// //       (item) =>
// //         regex.test(item.creator.username) ||
// //         regex.test(item.tag) ||
// //         regex.test(item.prompt)
// //     );
// //   };

// //   const handleSearchChange = (e) => {
// //     clearTimeout(searchTimeout);
// //     setSearchText(e.target.value);

// //     // debounce method
// //     setSearchTimeout(
// //       setTimeout(() => {
// //         const searchResult = filterPrompts(e.target.value);
// //         setSearchedResults(searchResult);
// //       }, 500)
// //     );
// //   };

// //   const handleTagClick = (tagName) => {
// //     setSearchText(tagName);

// //     const searchResult = filterPrompts(tagName);
// //     setSearchedResults(searchResult);
// //   };

// //   return (
// //     <section className='feed'>
// //       <form className='relative w-full flex-center'>
// //         <input
// //           type='text'
// //           placeholder='Search for a tag or a username'
// //           value={searchText}
// //           onChange={handleSearchChange}
// //           required
// //           className='search_input peer'
// //         />
// //       </form>

// //       {/* All Prompts */}
// //       {searchText ? (
// //         <PromptCardList
// //           data={searchedResults}
// //           handleTagClick={handleTagClick}
// //         />
// //       ) : (
// //         <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
// //       )}
// //     </section>
// //   );
// // };

// // export default Feed;
// "use client";

// import { useState, useEffect } from "react";

// import PromptCard from "./PromptCard";
// // import OpenRouterChat from "./OpenRouterChat";
// import { davinci } from './OpenRouterChat';

// const PromptCardList = ({ data, handleTagClick }) => {
//   return (
//     <div className='mt-16 prompt_layout'>
//       {data.map((post) => (
//         <PromptCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//     </div>
//   );
// };

// const Feed = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [searchTimeout, setSearchTimeout] = useState(null);
//   const [searchedResults, setSearchedResults] = useState([]);
//   const [helloWorldMessage, setHelloWorldMessage] = useState("");

//   const fetchPosts = async () => {
//     const response = await fetch("/api/prompt");
//     const data = await response.json();

//     setAllPosts(data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const filterPrompts = (searchtext) => {
//     const regex = new RegExp(searchtext, "i");
//     return allPosts.filter(
//       (item) =>
//         regex.test(item.creator.username) ||
//         regex.test(item.tag) ||
//         regex.test(item.prompt)
//     );
//   };

//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResult = filterPrompts(e.target.value);
//         setSearchedResults(searchResult);
//       }, 500)
//     );
//   };

//   const handleTagClick = (tagName) => {
//     setSearchText(tagName);

//     const searchResult = filterPrompts(tagName);
//     setSearchedResults(searchResult);
//   };

//   const handleEnterPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission and page refresh
//       setHelloWorldMessage("Hello, world!");
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault(); // Prevent form submission and page refresh
//     setHelloWorldMessage("Hello, world!");
//   };

//   return (
//     <section className='feed'>
//       <form className='relative w-full flex-center' onSubmit={handleFormSubmit}>
//         <input
//           type='text'
//           placeholder='Search for a tag or a username'
//           value={searchText}
//           onChange={handleSearchChange}
//           onKeyPress={handleEnterPress}
//           required
//           className='search_input peer'
//         />
//         <button type="submit" style={{ display: 'none' }}></button>
//       </form>

//       {/* Display Hello, world! message if Enter is pressed */}
//       {helloWorldMessage && <div>{helloWorldMessage}</div>}

//       {/* All Prompts */}
//       {searchText ? (
//         <PromptCardList
//           data={searchedResults}
//           handleTagClick={handleTagClick}
//         />
//       ) : (
//         <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
//       )}
//     </section>
//   );
// };

// export default Feed;
// "use client";

// import { useState, useEffect } from "react";
// import PromptCard from "./PromptCard";
// import { davinci } from './OpenRouterChat';

// const PromptCardList = ({ data, handleTagClick }) => {
//   return (
//     <div className='mt-16 prompt_layout'>
//       {data.map((post) => (
//         <PromptCard
//           key={post._id}
//           post={post}
//           handleTagClick={handleTagClick}
//         />
//       ))}
//     </div>
//   );
// };

// const Feed = () => {
//   const [allPosts, setAllPosts] = useState([]);
//   const [searchText, setSearchText] = useState("");
//   const [searchTimeout, setSearchTimeout] = useState(null);
//   const [searchedResults, setSearchedResults] = useState([]);
//   const [helloWorldMessage, setHelloWorldMessage] = useState("");

//   const fetchPosts = async () => {
//     const response = await fetch("/api/prompt");
//     const data = await response.json();

//     setAllPosts(data);
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const filterPrompts = (searchtext) => {
//     const regex = new RegExp(searchtext, "i");
//     return allPosts.filter(
//       (item) =>
//         regex.test(item.creator.username) ||
//         regex.test(item.tag) ||
//         regex.test(item.prompt)
//     );
//   };

//   const handleSearchChange = (e) => {
//     clearTimeout(searchTimeout);
//     setSearchText(e.target.value);

//     setSearchTimeout(
//       setTimeout(() => {
//         const searchResult = filterPrompts(e.target.value);
//         setSearchedResults(searchResult);
//       }, 500)
//     );
//   };

//   const handleTagClick = (tagName) => {
//     setSearchText(tagName);

//     const searchResult = filterPrompts(tagName);
//     setSearchedResults(searchResult);
//   };

//   const handleEnterPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // Prevent form submission and page refresh
//       handleFormSubmit();
//     }
//   };

//   const handleFormSubmit = async () => {
//     // Prevent form submission and page refresh

//     // Use the davinci function to get the response
//     const response = await davinci(searchText, "your_api_key", "text-davinci-003");

//     // Display the response
//     setHelloWorldMessage(response);
//   };

//   return (
//     <section className='feed'>
//       <form className='relative w-full flex-center' onSubmit={handleFormSubmit}>
//         <input
//           type='text'
//           placeholder='Search for a tag or a username'
//           value={searchText}
//           onChange={handleSearchChange}
//           onKeyPress={handleEnterPress}
//           required
//           className='search_input peer'
//         />
//         <button type="submit" style={{ display: 'none' }}></button>
//       </form>

//       {/* Display OpenAI response instead of Hello, world! message */}
//       {helloWorldMessage && <div>{helloWorldMessage}</div>}

//       {/* All Prompts */}
//       {searchText ? (
//         <PromptCardList
//           data={searchedResults}
//           handleTagClick={handleTagClick}
//         />
//       ) : (
//         <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
//       )}
//     </section>
//   );
// };

// export default Feed;
"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { davinci } from './OpenRouterChat'; // Corrected import

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [helloWorldMessage, setHelloWorldMessage] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleFormSubmit();
    }
  };
  let i = 0; // Initialize i with 0 or 1 based on your initial requirement
  let response;
  
  const handleFormSubmit = async () => {
    // const i=0;
    // Prevent form submission and page refresh

    // Use the davinci function to get the response
    // const response = await davinci(searchText);
    // var response = 'how are you?'
    // Display the response


if (i === 0) {
  response = 'mast';
  i = 1;
} else if (i === 1) {
  response = 'bahut mast';
  i = 0;
}
    setHelloWorldMessage(response);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center' onSubmit={handleFormSubmit}>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          onKeyPress={handleEnterPress}
          required
          className='search_input peer'
        />
        <button type="submit" style={{ display: 'none' }}></button>
      </form>

      {/* Display OpenAI response instead of Hello, world! message */}
      {helloWorldMessage && <div>{helloWorldMessage}</div>}

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;