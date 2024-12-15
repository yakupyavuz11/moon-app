import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../constants/theme";

const Button = (props) => {  // Accept props here
  return (
    <TouchableOpacity
      style={{ ...styles.btn, ...props.style }}  // Spread props.style
      onPress={props.onPress}  // Use the onPress passed from props
    >
      <Text
        style={{ ...FONTS.h2, color: COLORS.white }}
      >
        {props.title} 
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btn: {
 paddingHorizontal: SIZES.padding,
 paddingVertical: SIZES.padding2,
 borderColor: COLORS.primary,
 borderWidth: 1,
 borderRadius: 50,
 backgroundColor: COLORS.white,
 justifyContent: "center",  
 alignItems: "center",        
  },
});
