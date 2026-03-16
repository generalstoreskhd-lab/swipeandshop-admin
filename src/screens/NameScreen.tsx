import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import logo from "../assets/images/logo.png";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Rootnavigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Name'>;

export default function NameScreen({ navigation }: Props) {

    const [error, setError] = useState("");
    return (
        <RegisterLayout>
            <View className="w-full flex flex-1 flex-col items-center justify-center gap-y-4">
                <Image
                    source={logo}
                    accessibilityLabel="brand-logo"
                    className="h-32 w-32"
                    resizeMode="contain"
                />
                <View className="w-full flex flex-col gap-y-2">
                    <Text className="text-sm font-semibold text-slate-500 ml-1">Full Name</Text>
                    <TextInput
                        placeholder="Enter your name"
                        className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full h-48`}
                    />
                </View>
                {error && <Text className="text-red-500">{error}</Text>}
                <CustomPresseableText
                    stretch={true}
                    onPress={() => navigation.navigate("Address")}
                    text="Continue"
                />
            </View>
        </RegisterLayout>
    );
}