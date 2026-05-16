/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField, Card } from "@heroui/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "react-hot-toast"; 
import { FcGoogle } from "react-icons/fc";


const LoginForm = () => {
    const searchParams = useSearchParams();
    const [alertMessage, setAlertMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const message = searchParams.get('message');
        if (message) {
            setAlertMessage(message);
        }
    }, [searchParams]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            dontNavigate: true,
        });

        setIsLoading(false);

        if (data) {
            toast.success("Sign In successful!");
            window.location.href = '/'; 
        }
        
        if (error) {
            toast.error(error.message || "Please check your email and password");
        }
    };


    const signInGoogle = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });
        } catch (err) {
            toast.error("Google Sign-In failed. Try again.");
        }
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 mb-10 px-4">
            {alertMessage && (
                <div className="w-full max-w-md mx-auto bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm mb-4 font-medium animate-fade-in">
                    ⚠️ {alertMessage}
                </div>
            )}


            <div className="text-center mb-6">
                <h2 className="text-4xl font-bold tracking-tight text-gray-900">Welcome Back</h2>
                <p className="text-md text-gray-500 mt-1">Resume your adventure with Wanderlust</p>
            </div>


            <Card className="w-full max-w-md border border-gray-100 p-6 mx-auto bg-white rounded-xl shadow-xl space-y-6">
                

                <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
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
                        <Label className="text-sm font-semibold mb-1">Email</Label>
                        <Input placeholder="john@example.com" className="rounded-lg" />
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) return "Password must be at least 8 characters";
                            if (!/[A-Z]/.test(value)) return "Password must contain an uppercase letter";
                            if (!/[0-9]/.test(value)) return "Password must contain a number";
                            return null;
                        }}
                    >
                        <Label className="text-sm font-semibold mb-1">Password</Label>
                        <Input placeholder="Enter your password" className="rounded-lg" />
                        <Description className="text-[11px] text-gray-400 mt-1">
                            Must be at least 8 characters with 1 uppercase and 1 number
                        </Description>
                        <FieldError className="text-xs text-red-500 mt-1" />
                    </TextField>


                    <div className="space-y-2 pt-2">
                        <Button 
                            type="submit" 
                            isLoading={isLoading}
                            className="w-full h-12 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-md"
                        >
                            {!isLoading && <Check size={18} />}
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                        
                        <div className="text-right">
                            <Button type="reset" variant="light" className="text-sm text-gray-400 hover:text-red-500 rounded-lg">
                                Reset
                            </Button>
                        </div>
                    </div>
                </Form>


                <div className="relative flex items-center py-2">
                    <div className="grow border-t border-gray-100"></div>
                    <span className="shrink mx-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                        Or Continue with
                    </span>
                    <div className="grow border-t border-gray-100"></div>
                </div>

                {/* google*/}
                <Button
                    variant="bordered"
                    className="w-full h-12 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all font-semibold text-gray-700"
                    onClick={signInGoogle}
                >
                    <div className="flex justify-center items-center gap-3">
                        <FcGoogle size={22} />
                        <span className="text-gray-700 font-medium text-md">Sign In With Google</span>
                    </div>
                </Button>

                {/* footer link */}
                <p className="text-center text-sm text-gray-500 pt-2">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-cyan-600 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </Card>
        </div>
    );
};

// Next.js SearchParams এরর এড়াতে Suspense র‍্যাপার
const LoginPage = () => {
    return (
        <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading Page...</div>}>
            <LoginForm />
        </Suspense>
    );
};

export default LoginPage;