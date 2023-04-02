import React, { useState, useEffect, createContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";
import { UserProfileScreen } from "./UserProfileScreen";

export const AuthContext = createContext();

export default function ProfileScreen() {
    const navigation = useNavigation();

    const [isLoading, setIsLoading] = useState(false);
    const [logged, setLogged] = useState(false);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        setIsLoading(true);
        let threwError = false;
        await auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            alert(error.message);
            threwError = true;
        });

        if(!threwError)
        {
            if(!auth.currentUser.emailVerified){
                alert("Verify your email to continue");
                setLogged(false);
            }
            else{
                setLogged(true);
            }
        }
        setIsLoading(false);
    }

    const handleLogout = async () => {
        setIsLoading(true);
        await auth.signOut();
        setIsLoading(false);
    }

    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setLogged(true);
            } else {
                setLogged(false);
            }
        });
    }

   useEffect(() => {
     checkIfLoggedIn();
   }, []);

   return (
    <AuthContext.Provider value={{ handleLogout }}>
      {
      logged ? 
        (<UserProfileScreen />) : (
        <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
        <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading && <ActivityIndicator size={"large"} color={"#999999"} />}
        </View>
        <View style={styles.inputContainer}>
            <View>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
            </View>

            <View>
                <TextInput
                    placeholder="Password"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                    style={styles.input}
                />
            </View>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity 
                onPress={handleLogin}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>


            <TouchableOpacity 
                onPress={() => {navigation.navigate("Register")}}
                style={{marginTop: 15}}
            >
                <Text style={styles.signUpText}>Create a new account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => {navigation.navigate("Forgot")}}
                style={{marginTop: 10}}
            >
                <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
            
        </View>

    </KeyboardAvoidingView>
      )}
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button:{
        backgroundColor: "#ebbe44",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        marginBottom: 10,
    },
    buttonText:{
        color: "white",
        fontWeight: "700",
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.45)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 5,
    },
    buttonOutline:{
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonOutLineText:{
        color: "#0782F9",
        fontWeight: 700,
        fontSize: 16,
    },
    signUpText: {
        color: "#0872F9",
        fontWeight: 300,
        fontSize: 16,
    },
    forgotText: {
        color: "#D93D3F",
        fontWeight: 300,
        fontSize: 16,
    },
});
