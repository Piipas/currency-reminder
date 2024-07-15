import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

const formSchema = z.object({
  email: z.string().email("Invalid email, please try a vlid email!"),
});

const SubscribeForm = () => {
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsPending(true);
      await axios.post("http://localhost:4000/subscribe", values);
      form.resetField("email");
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-x-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input placeholder="Email, eg: ismailpipas@gmail.com" className="h-14 text-lg" {...field} />
              </FormControl>
              {isSuccess && <p className="text-green-700 text-center">Congratulations! you are subscribed now.</p>}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={"lg"} className="h-14" disabled={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default SubscribeForm;
