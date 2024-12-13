import * as React from "react";
import { TextInput } from "react-native";

const Search = ({ setSearchQuery }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleSearchChange = (query) => {
    setSearchText(query);
    setSearchQuery(query);
  };

  return (
    <TextInput
      onChangeText={handleSearchChange}
      value={searchText}
      className="h-10 my-2 rounded-full px-3 bg-gray-200"
      placeholder="Search..."
    />
  );
};

export default Search;
