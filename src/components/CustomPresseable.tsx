import { Pressable, Text } from "react-native";


interface PressableProps {
    stretch?: boolean;
    onPress: () => void;
    text: string;
    variant?: 'primary' | 'secondary';
}

export default function CustomPresseableText({ stretch, onPress, text, variant = 'primary' }: PressableProps) {
    const isPrimary = variant === 'primary';
    
    return (
        <Pressable
            onPress={onPress}
            className={`${stretch ? "self-stretch" : ""} rounded-xl mt-4 ${isPrimary ? "bg-sky-500 active:bg-sky-600 shadow-md shadow-sky-200" : "bg-white border-2 border-slate-200"} py-4 items-center`}
        >
            <Text className={`text-base font-semibold ${isPrimary ? "text-white" : "text-slate-600"}`}>{text}</Text>
        </Pressable>
    )
}
