// navigation/types.ts
export type RootStackParamList = {
          Discovery: undefined; // Discovery ekranı parametre almaz
          UserProfile: { userId: string }; // UserProfile ekranı userId parametresi alır
        };
        
        // navigation/types.ts
// navigation/types.ts

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

        