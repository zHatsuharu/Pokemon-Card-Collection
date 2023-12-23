import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link } from "@nextui-org/react"
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { auth, db } from "../../firebase";
import { AuthContext } from "../providers/auth-providers";
import { useNavigate } from "react-router-dom";
import { Actions } from "../reducers/auth-reducers";
import { collection, getDocs } from "firebase/firestore";

export default function LoginPage() {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');

    const getUsername = async (id: string) => {
        try {
            const collectionUsers = collection(db, 'users');
            const datas = await getDocs(collectionUsers);
            const userInfoFirebase = datas.docs.map(doc => ({...doc.data()})).find(el => el['id'] == id);
            if (!userInfoFirebase) throw new Error('No user info.');
            return userInfoFirebase['username'];
        } catch (e) {
            console.error(e);
        }
    }
    
    const handleSubmit = async () => {
        try {
            const userResponse = await signInWithEmailAndPassword(auth, email, password);
            if (userResponse.user) {
                const name = await getUsername(userResponse.user.uid);
                const payload = {...userResponse.user, username: name};
                dispatch({ type: Actions.LOGIN, payload });
                localStorage.setItem('@user', JSON.stringify(payload));
                navigate('/');
            }
        } catch(error) {
            if (error instanceof FirebaseError) {
                setError('Invalid credential')
            }
        }
    }
    
    return (
        <Card className="w-1/4 mx-auto mt-20">
            <CardHeader>
                <h1 className="text-4xl font-bold mx-auto">
                    Login
                </h1>
            </CardHeader>
            <Divider />
            <CardBody className="p-6 gap-5">
                <Input
                    type="text"
                    label="Email"
                    labelPlacement="outside"
                    variant="underlined"
                    onValueChange={setEmail}
                    isRequired={error.length != 0}
                    errorMessage={error}
                />
                <Input
                    type="password"
                    label="Password"
                    labelPlacement="outside"
                    variant="underlined"
                    onValueChange={setPassword}
                    isRequired={error.length != 0}
                    errorMessage={error}
                />
                <Link
                    className="text-xs mx-auto"
                    href="/signup"
                >
                    You don't have an account ? Sign Up
                </Link>
            </CardBody>
            <CardFooter className="flex justify-end">
                <Button
                    color="primary"
                    variant="flat"
                    onClick={handleSubmit}
                >
                    Login
                </Button>
            </CardFooter>
        </Card>
    )
}