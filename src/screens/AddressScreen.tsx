import CustomPresseableText from "../components/CustomPresseable";
import { RegisterLayout } from "../layouts/RegisterLayout";
import { useState } from "react";
import { Image, Text, TextInput, View, ScrollView } from "react-native";
import logo from "../assets/images/logo.png";
import { LeafletMap } from "../components/LeafletMap";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Rootnavigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Address'>;

export default function AddressScreen({ navigation }: Props) {

    const [error, setError] = useState("");
    return (
        <RegisterLayout>
            <View className="w-full flex flex-1 flex-col items-center justify-center gap-y-2">
                <Image
                    source={logo}
                    accessibilityLabel="brand-logo"
                    className="h-32 w-32"
                    resizeMode="contain"
                />
                <Text className="text-3xl font-bold text-slate-900 mb-4">Where should we deliver ?</Text>
                <LeafletMap />

                <View className="w-full flex flex-col gap-y-2 mt-8">
                    <Text className="text-sm font-semibold text-slate-500 ml-1">Apartment, Street or House No.</Text>
                    <TextInput
                        aria-label="Enter apartment or street"
                        placeholder="Enter apartment or street"
                        className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full  text-start`}
                    />
                </View>

                <View className="w-full flex flex-col gap-y-2">
                    <Text className="text-sm font-semibold text-slate-500 ml-1">Locality / Area</Text>
                    <TextInput
                        aria-label="Enter the locality"
                        placeholder="Enter the locality"
                        className={`${error ? "border-red-400" : "border-slate-200"} border-2 border-slate-200 rounded-xl px-4 py-3 w-full text-start`}
                    />
                </View>

                <View className="w-full flex flex-col gap-y-2">
                    <Text className="text-sm font-semibold text-slate-500 ml-1">Landmark (Optional)</Text>
                    <TextInput
                        placeholder="Landmark"
                        className="border-slate-200 border-2 rounded-xl px-4 py-3 w-full mb-4"
                    />
                </View>


                <View className="h-4" />

                <CustomPresseableText
                    stretch={true}
                    onPress={() => { }}
                    text="Continue"
                />
            </View>
        </RegisterLayout>
    );
}