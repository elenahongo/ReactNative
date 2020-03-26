const API_KEY = "LKnSSNy1GgBbQJCIZqMrpxXrAeay2sNN";
const LIST_NAME = "hardcover-fiction";
const API_STEM = "https://api.nytimes.com/svc/books/v3/lists.json";

async function fetchBooks (list_name = LIST_NAME) {
  let url = `${API_STEM}?list=${list_name}&api-key=${API_KEY}`;
  //https://api.nytimes.com/svc/books/v3/lists.json?list=hardcover-fiction&api-key=LKnSSNy1GgBbQJCIZqMrpxXrAeay2sNN
  try {
    const response = await fetch(url);
      if (response.ok){
        const jsonResponse = await response.json();
        return jsonResponse.results
      }
  } catch(error) {
    console.log("this is your error" + error);
  }
}


export default { fetchBooks: fetchBooks };