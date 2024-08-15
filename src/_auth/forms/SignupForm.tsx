import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import {SignupValidation} from "@/lib/validation"
import Loader from "@/components/shared/Loader"
import {createUserAccount} from "@/lib/appwrite/api"


const SignupForm = () => {
  const isLoading = false;
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });
  
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
  const newUser = await createUserAccount(values);
  console.log(newUser);
}

  return (
    <Form {...form}>
      <div className="flex-col pt-1 flex-center sm:w-420">
        <img src="/assets/images/logo.svg" alt="logo" />
        
        <h2 className="pt-1 text-light-3 h3-bold md:h3-bold sm:pt-1">Create a new account</h2>
        <p className="mt-1 text-primary-500 small-medium md:base-regular">To use SideLines, please enter your details</p>
      
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full mt-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-light-3">Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 shad-button_primary">
            {isLoading ? (
              <div className="gap-2 flex-center">
                <Loader />Loading...
              </div>
            ): "Sign up"}
          </Button>
          
          <p className="mt-2 text-center text-small-regular text-light-3">
            Already have an account?
            <Link to="/sign-in" className="ml-1 text-primary-500 text-small-semibold">Log in</Link>
            
          </p>
        </form>
      </div>
    </Form>
  )
}

export default SignupForm