import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export default function SignupPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [mailError, setMailError] = useState('');
    const [passError, setPassError] = useState('');

    const handleSubmit = async () => {
        if (username.length <= 3) {
            return setNameError('Username length less than 3');
        }
        try {
            const newUser = await createUserWithEmailAndPassword(auth, email, password);
            if (newUser.user) {
                await addDoc(collection(db, 'users'), {
                    id: newUser.user.uid,
                    username
                }).then(() => navigate('/login'))
                .catch(e => console.error(e));
            }
        } catch(error) {
            if (error instanceof FirebaseError) {
                if (error.code === 'auth/weak-password') {
                    setPassError('Password length less than 6');
                } else if (error.code === 'auth/email-already-in-use') {
                    setMailError('Email already in use');
                } else {
                    console.error(error);
                }
            }
        }
    }

    return (
        <Card className="w-1/4 mx-auto mt-20">
            <CardHeader>
                <h1 className="text-4xl font-bold mx-auto">
                    Register
                </h1>
            </CardHeader>
            <Divider />
            <CardBody className="p-6 gap-5">
                <Input
                    type="text"
                    label="Username"
                    labelPlacement="outside"
                    variant="underlined"
                    onValueChange={setUsername}
                    isRequired
                    isInvalid={nameError.length != 0}
                    errorMessage={nameError}
                />
                <Input
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    variant="underlined"
                    onValueChange={setEmail}
                    isRequired
                    isInvalid={mailError.length != 0}
                    errorMessage={mailError}
                />
                <Input
                    type="password"
                    label="Password"
                    labelPlacement="outside"
                    variant="underlined"
                    onValueChange={setPassword}
                    isRequired
                    isInvalid={passError.length != 0}
                    errorMessage={passError}
                />
                <Link
                    className="text-xs mx-auto"
                    href="/login"
                >
                    Already have an account ? Login
                </Link>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Button
                    color="primary"
                    variant="flat"
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>
            </CardFooter>
        </Card>
    )
}