import { useColorScheme } from "nativewind";

function MyComponent() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useColorScheme();

  console.log(colorScheme) // 'light' | 'dark'
  setColorScheme('dark')
  toggleColorScheme() // changes colorScheme to opposite of its current value

  return (
    {/* ... */}
  );
}