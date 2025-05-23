import { CompositeNavigationProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type WorkoutStackParamList = {
  WorkoutList: undefined;
  WorkoutDetail: { workoutId: string };
};

export type RootTabParamList = {
  Home: undefined;
  Workouts: undefined;
};

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  Main: undefined;
};

export type WorkoutScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<WorkoutStackParamList, "WorkoutList">,
  BottomTabNavigationProp<RootTabParamList>
>;
