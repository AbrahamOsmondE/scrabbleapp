export const styles = {
  textDecoration: "none",
  fontSize: "0.9em",
  fontWeight: "600",
  color: "#787878",
};

export const dropdownValues = [
  { value: "wordbuilder", text: "Word Builder" },
  // { value: "anagram", text: "Anagram" },
  // { value: "startingwith", text: "Starting with" },
  // { value: "endingwith", text: "Ending with" },
  // { value: "containing", text: "Containing" },
];

export const searchDescription = {
  wordbuilder:
    "Gives every possible word that can be made with the input (max 10 letters)",
  // anagram:
  //   "Gives every anagram of the input, including itself (max 15 letters)",
  // startingwith: "Gives every word that starts with the input (max 15 letters)",
  // endingwith: "Gives every word that ends with the input (max 15 letters)",
  // containing:
  //   "Gives every word that contains the input, either starting with, ending with, or in between the word (max 15 letters)",
  // pattern:
  //   "Checks if the given word is a valid CSW19 word or not (max 15 letters)",
};

export const maxLengths = {
  wordbuilder: "10",
  // anagram: "15",
  // startingwith: "15",
  // endingwith: "15",
  // containing: "15",
  // pattern: "15",
};

export const queryResponses = {
  wordbuilder: "Words made using",
  // anagram: "Anagrams of",
  // startingwith: "Words starting with",
  // endingwith: "Words ending with",
  // containing: "Words containing",
  // pattern: "Is not a word",
};
