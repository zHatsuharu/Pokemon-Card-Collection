import { Navbar, NavbarContent, NavbarItem, Link, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../providers/auth-providers";
import { Actions } from "../reducers/auth-reducers";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";

export default function HeaderNavbar() {
    const { state: { isLogged, userInfos }, dispatch } = useContext(AuthContext);
    const location = useLocation();

    const onLogout = async () => {
        await signOut(auth)
        .then(() => {
            localStorage.removeItem('@user');
            dispatch({ type: Actions.LOGOUT });
        })
        .catch(error => console.log(error));
    }

    return (
        <Navbar shouldHideOnScroll>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem isActive={location.pathname == '/'}>
                    <Link color="foreground" href="/" aria-current="page">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive={location.pathname == '/sets'}>
                    <Link color="foreground" href="/sets">
                        Sets
                    </Link>
                </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end">
                    {!isLogged ?
                    <>
                        <NavbarItem className="hidden lg:flex">
                            <Link href="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button as={Link} color="primary" href="/signup" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </>
                    :
                    <>
                        <Dropdown
                            placement="bottom-end"
                        >
                            <NavbarItem>
                                <DropdownTrigger>
                                    <Button
                                        variant="flat"
                                    >
                                        {userInfos.username}
                                    </Button>
                                </DropdownTrigger>
                            </NavbarItem>
                            <DropdownMenu
                                variant="flat"
                            >
                                <DropdownItem key="profile">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{userInfos.email}</p>
                                </DropdownItem>
                                <DropdownItem href="/collection">
                                    Collection
                                </DropdownItem>
                                <DropdownItem 
                                    key="logout"
                                    color="danger"
                                    onClick={onLogout}
                                >
                                    Log out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </>
                    }
            </NavbarContent>
        </Navbar>
    )
}
