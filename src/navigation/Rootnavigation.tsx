import AddressScreen from "../screens/AddressScreen";
import NameScreen from "../screens/NameScreen";
import PhoneVerification from "../screens/PhoneVerification";
import RegisterScreen from "../screens/RegisterScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


export type RootStackParamList = {
    Login: undefined;
    Verify: undefined;
    Name: undefined;
    Address: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={RegisterScreen} />
            <Stack.Screen name="Verify" component={PhoneVerification} />
            <Stack.Screen name="Name" component={NameScreen} />
            <Stack.Screen name="Address" component={AddressScreen} />
        </Stack.Navigator>
    );
}
