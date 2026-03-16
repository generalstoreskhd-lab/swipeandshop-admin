import React, { useState } from "react";
import {
    Button,
    Image,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";

import logo from "../assets/images/logo.png";
import { RegisterLayout } from "../layouts/RegisterLayout";
import CustomPresseableText from "../components/CustomPresseable";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/Rootnavigation";

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function RegisterScreen({ navigation }: Props) {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
        if (phone.replace(/\D/g, "").length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }
        navigation.navigate("Verify");
    };

    return (
        <RegisterLayout>
            <View className="flex-1 w-full px-4 py-6 flex-col justify-between items-center">

                {/* Top bar: logo + skip */}
                <View className="w-full flex-row items-center justify-between">
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        className="h-24 w-24"
                        resizeMode="contain"
                    />
                    <Pressable onPress={() => { }}>
                        <Text className="text-sky-500 text-base font-medium">Skip</Text>
                    </Pressable>
                </View>

                {/* Hero + form */}
                <View className="w-full flex-col items-center mb-20">
                    <Text className="text-4xl font-semibold text-slate-950 text-center">
                        Welcome back
                    </Text>
                    <Text className="text-base mt-3 font-light text-slate-600 text-center">
                        Sign in or create an account to continue
                    </Text>

                    {/* Phone input */}
                    <View className={`mt-8 w-full flex-row items-center rounded-xl border px-4 py-3 bg-white ${error ? "border-red-400" : "border-slate-200"}`}>
                        <TextInput
                            className="flex-1 text-base text-slate-900"
                            placeholder="Phone number"
                            placeholderTextColor="#94a3b8"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={(val) => {
                                setPhone(val);
                                if (error) setError("");
                            }}
                            maxLength={15}
                        />
                    </View>

                    {/* Error message */}
                    {error ? (
                        <Text className="mt-2 w-full text-sm text-red-500">{error}</Text>
                    ) : null}

                    {/* Continue button */}
                    <CustomPresseableText
                        stretch={true}
                        onPress={handleContinue}
                        text="Continue"
                    />
                </View>

                <View id="login-bottombar">
                    <Text className="text-md text-center font-light text-slate-600">
                        By continuing, you agree to our
                        <Text className="font-semibold"> Terms of Services </Text> and
                        <Text className="font-semibold"> Privacy Policies</Text>
                    </Text>
                </View>

            </View>
        </RegisterLayout>
    );
};