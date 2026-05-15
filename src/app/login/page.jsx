"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField, Card, toast } from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget)
        const user = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        if (data) {
            toast.success(`Sign In successful ${user.name}`, {

            })
            redirect('/');
        }
        if (error) {
            toast.danger(`Please check you email and password`)
            return
        }
    };

    const signInGoogle = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 mb-10">
            <div className="text-center mb-4">
                <h2 className="text-4xl font-bold">Welcome Back</h2>
                <p className="text-lg text-gray-700">Resume your adventure with Wanderlust</p>
            </div>
            <Card className="w-full max-w-md border rounded-md mx-auto">
                <Form className="flex flex-col gap-4 p-2" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="">
                        <Button type="submit" className={"rounded-none w-full bg-cyan-600 hover:bg-cyan-500"}>
                            <Check />
                            Sign In
                        </Button>
                        <div className="text-right">
                            <Button type="reset" variant="goust" className={"border-none rounded-none hover:text-red-500"}>
                                Reset
                            </Button>
                        </div>
                    </div>
                </Form>
                <div className="w-full space-y-2">
                    {/* Divider with Text */}
                    <div className="relative flex items-center">
                        <div className="grow border-t border-gray-200"></div>
                        <span className="shrink mx-4 text-gray-500 text-sm font-medium">
                            Or Continue with
                        </span>
                        <div className="grow border-t border-gray-200"></div>
                    </div>

                    {/* Google Sign Up Button */}
                    <Button
                        variant="outline"
                        className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 transition-colors font-semibold text-gray-700"
                        onClick={signInGoogle}
                    >
                        <div className="flex justify-center items-center gap-3">
                            <FcGoogle size={50} />
                            <span className="text-gray-800 font-semibold text-lg">Sign Up With Google</span>
                        </div>
                    </Button>
                </div>
                <h3 className="text-center text-lg font-bold">Don&apos;t have an account? <span className="text-cyan-800"><Link href={'/signup'}>Sign Up</Link></span></h3>
            </Card>
        </div>
    );
};

export default LoginPage;