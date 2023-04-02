import {
    StyleSheet,
    Modal,
    View,
    Text,
    TouchableOpacity,
    Button,
    Image,
    ActivityIndicator,
    KeyboardAvoidingView,
    TextInput,
  } from "react-native";
  import { useState, useEffect } from "react";
  import { useNavigation } from "@react-navigation/native";

  import { auth } from "../firebase";
  import { firestore } from "../firebase";
  
  export default function RegisterScreen() {
    const navigation = useNavigation();
  
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFName] = useState("");
    const [lastname, setLName] = useState("");

    const handleSignUp = async () => {
        setIsLoading(true);
        if (firstname.length === 0) {
            alert("Please enter your first name");
            return;
        }
        if (lastname.length === 0) {
            alert("Please enter last name");
            return;
        }
        if (email.length === 0) {
            alert("Please enter your email");
            return;
        }
        if (password.length === 0) {
            alert("Please enter your password");
            return;
        }

        let signUpError = false;

        await auth
        .createUserWithEmailAndPassword(email, password)
        .catch((error) => {
            alert(error.message);
            signUpError = true;
        })
        .then(() => {
            if (!signUpError) {
            auth.currentUser
                .sendEmailVerification({
                    handleCodeInApp: true,
                    url: "https://itec-33d26.firebaseapp.com",
                })
                .then(() => {
                    alert("Verification email sent");
                    auth.signOut();
                    navigation.pop(1);
                });
            }
        })
        .then(() => {
            firestore
            .collection("users")
            .doc(auth.currentUser.uid)
            .set({
                userId: auth.currentUser.uid,
                firstname: firstname,
                lastname: lastname,
                email: email,
            })
            .catch((error) => {
                alert(error.message);
            });
        });

        setIsLoading(false);
    };

    return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={{ position: "absolute", flex: 1, justifyContent: "center", alignItems: "center" }}>
            {isLoading && <ActivityIndicator size={"large"} color={"#999999"} />}
        </View>

        <Text style={styles.headerText}>
          Create a new account
        </Text>
  
        <View
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="First name"
            value={firstname}
            onChangeText={(text) => setFName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Last name"
            value={lastname}
            onChangeText={(text) => setLName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 35,
        marginBottom: 55,
        fontWeight: "400",
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
  });
  