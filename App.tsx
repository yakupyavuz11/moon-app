import React from "react";
import "./global.css";
import { AppNavigation } from "./src/navigation/AppNavigation";
import useStore from "@/store/useStore";
import AuthNavigator from "@/navigation/AuthNavigation";

export default function App() {
  const { user, login, logout, isLogin } = useStore();

  console.warn(" user, login, logout, isLogin", user, login, logout, isLogin);

  return !isLogin ? <AuthNavigator /> : <AppNavigation />;
}
