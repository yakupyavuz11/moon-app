import * as React from "react";
import { StyleSheet, TextInput } from "react-native";

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
      style={styles.searchbar}
      placeholder="Search..."
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    height: 40,
    marginVertical: 8,
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0", 
  },
});

export default Search;
