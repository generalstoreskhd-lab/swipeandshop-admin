import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image } from "react-native";
import { RegisterLayout } from "../layouts/RegisterLayout";
import CustomPresseableText from "../components/CustomPresseable";
import logo from "../assets/images/logo.png";

export default function AdminLoginScreen({ navigation }: any) {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleAuth = () => {
        // Implement logic
        console.log(isLogin ? "Admin Logging in..." : "Admin Registering...", { name, phone, email, password });
        navigation.navigate("Home");
    };

    return (
        <RegisterLayout>
            <View className="flex-1 w-full px-4 py-6 flex-col justify-start items-center">
                
                {/* Top bar: logo */}
                <View className="w-full flex-row items-center justify-start mt-4 mb-4">
                    <Image
                        source={logo}
                        accessibilityLabel="brand-logo"
                        style={{ width: 80, height: 80 }}
                        resizeMode="contain"
                    />
                </View>

                {/* Unified Form */}
                <ScrollView className="w-full flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    <View className="w-full flex-col items-center justify-start gap-y-6">
                        <View className="w-full mb-2 mt-4">
                            <Text className="text-4xl font-semibold text-slate-950 text-center">{isLogin ? "Admin Login" : "Admin Register"}</Text>
                            <Text className="text-base mt-3 font-light text-slate-600 text-center">{isLogin ? "Login to your administrator dashboard" : "Create an administrator account"}</Text>
                        </View>

                        {/* Name */}
                        {!isLogin && (
                            <View className="w-full flex flex-col gap-y-2">
                                <Text className="text-sm font-semibold text-slate-500 ml-2">Full Name</Text>
                                <TextInput
                                    placeholder="Enter your full name"
                                    placeholderTextColor="#94a3b8"
                                    value={name}
                                    onChangeText={setName}
                                    className="bg-white border-2 border-slate-200 rounded-xl px-5 py-4 w-full text-base text-slate-900"
                                />
                            </View>
                        )}

                        {/* Phone Number */}
                        {!isLogin && (
                            <View className="w-full flex flex-col gap-y-2">
                                <Text className="text-sm font-semibold text-slate-500 ml-2">Phone Number</Text>
                                <TextInput
                                    placeholder="+1 234 567 890"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="phone-pad"
                                    value={phone}
                                    onChangeText={setPhone}
                                    className="bg-white border-2 border-slate-200 rounded-xl px-5 py-4 w-full text-base text-slate-900"
                                />
                            </View>
                        )}

                        {/* Email */}
                        <View className="w-full flex flex-col gap-y-2">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">Email Address</Text>
                            <TextInput
                                placeholder="admin@domain.com"
                                placeholderTextColor="#94a3b8"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                className="bg-white border-2 border-slate-200 rounded-xl px-5 py-4 w-full text-base text-slate-900"
                            />
                        </View>

                        {/* Password */}
                        <View className="w-full flex flex-col gap-y-2 mb-4">
                            <Text className="text-sm font-semibold text-slate-500 ml-2">Password</Text>
                            <TextInput
                                placeholder="••••••••"
                                placeholderTextColor="#94a3b8"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                className="bg-white border-2 border-slate-200 rounded-xl px-5 py-4 w-full text-base text-slate-900"
                            />
                        </View>

                        <CustomPresseableText
                            stretch={true}
                            onPress={handleAuth}
                            text={isLogin ? "Sign In to Dashboard" : "Register"}
                        />

                        <CustomPresseableText
                            stretch={true}
                            onPress={() => setIsLogin(!isLogin)}
                            text={isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                            variant="secondary"
                        />

                        <CustomPresseableText
                            stretch={true}
                            onPress={() => navigation.navigate("Home")}
                            text="Skip for now"
                            variant="secondary"
                        />
                    </View>
                </ScrollView>
            </View>
        </RegisterLayout>
    );
}
