"use client";
import {HardDrive, Key, Persons} from "@gravity-ui/icons";
import {Button, toast} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import { Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

export default function Signup() {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
       
        const { data, error } = await authClient.signIn.email({...userData , callbackURL: "http://localhost:3000/dashboard", 
        rememberMe: true}
        )

        console.log("Signup response:", { data, error });
        if (error) {
        
         
            toast.danger("You Put Some Wrong Credintials", {
              actionProps: {children: "Error",  variant: "danger",},
              description:
               error.message,
              indicator: <HardDrive />,
            });
        
    
            
        } 
        if(data) {
            
                    toast.success("You are sign in", {
                        actionProps: {
                            Key: "billing",
                            children: "Signed Up",
                            className: "bg-success text-success-foreground",
                            variant: "success",
                        },
                        description: "You can continue using Our App",
                    })
                }
            
          




    };

    return (
        <>
            <div className=" mx-auto container my-20 ">
                <h1 className="text-2xl font-bold text-center my-4">Please Sign In </h1>



                <Form className="flex w-96 flex-col gap-4 mx-auto" onSubmit={onSubmit}>
                    
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

                    <div className="flex gap-2">
                        <Button type="submit">
                            <Check />
                            Submit
                        </Button>
                        <Button type="reset" variant="secondary">
                            Reset
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}