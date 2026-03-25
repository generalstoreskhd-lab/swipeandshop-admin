import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, Image, Pressable, Alert, ActivityIndicator } from "react-native";
import { RegisterLayout } from "../layouts/RegisterLayout";
import CustomPresseableText from "../components/CustomPresseable";
import logo from "../assets/images/logo.png";
import { hashPassword } from "../authentication/authUtils";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/authSlice";
import { auth, db } from "../config/firebaseconfig";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export default function AdminLoginScreen({ navigation }: any) {
    const dispatch = useAppDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAuth = async () => {
        if (!email || !password || (!isLogin && !name)) {
            Alert.alert("Error", "Please fill in all required fields.");
            return;
        }

        setIsLoading(true);
        try {
            let userUid = "";
            let displayName = name;

            if (isLogin) {
                // LOGIN
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                userUid = userCredential.user.uid;
                
                // Fetch admin data from Firestore
                const adminDoc = await getDoc(doc(db, "users", "admin_group", "admins", userUid));
                if (adminDoc.exists()) {
                    displayName = adminDoc.data().name;
                }
            } else {
                // REGISTER
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                userUid = userCredential.user.uid;
                
                await updateProfile(userCredential.user, { displayName: name });

                // Save admin data in subcollection
                await setDoc(doc(db, "users", "admin_group", "admins", userUid), {
                    name,
                    email,
                    phone,
                    role: 'admin',
                    createdAt: serverTimestamp()
                });
            }

            dispatch(login({ name: displayName || "Admin", email }));
            navigation.navigate("Home");
        } catch (error: any) {
            console.error(error);
            Alert.alert("Auth Error", error.message || "Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <RegisterLayout>
            <View className="flex-1 w-full px-4 py-6 flex-col justify-start items-center">
                
                {/* Top bar: logo + skip */}
                <View className="w-full flex-row items-center justify-between mt-4 mb-4">
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

                        {isLoading ? (
                            <ActivityIndicator size="large" color="#0ea5e9" className="my-4" />
                        ) : (
                            <CustomPresseableText
                                stretch={true}
                                onPress={handleAuth}
                                text={isLogin ? "Sign In to Dashboard" : "Register"}
                            />
                        )}

                        <View className="flex-row items-center justify-center mt-2">
                            <Text className="text-slate-600 text-base">{isLogin ? "Don't have an account? " : "Already have an account? "}</Text>
                            <Pressable onPress={() => setIsLogin(!isLogin)}>
                                <Text className="text-sky-500 text-base font-semibold">{isLogin ? "Register" : "Login"}</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </RegisterLayout>
    );
}
