"use client";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod"
import {useForm} from "react-hook-form"
import {Button, buttonVariants} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea";
import {useState} from "react";
import {cn} from "@/lib/utils";
import {X} from "lucide-react";
import {ImageUpload} from "@/components/dashboard/image-upload";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {addProduct, getAllCategories} from "@/lib/actions";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue
} from "@/components/ui/select"; // Assuming this is your Select component

// Images
const MAX_IMAGE_SIZE = 5242880; // 5 MB
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

const formSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  price: z.coerce.number().gte(1).lte(9999999),
  categoryId: z.coerce.number().min(1),
  images: z
      .custom<FileList>((val) => val instanceof FileList, "Required")
      .refine((files) => files.length > 0, `Required`)
      .refine((files) => files.length <= 5, `Maximum of 5 images are allowed.`)
      .refine(
          (files) =>
              Array.from(files).every((file) => file.size <= MAX_IMAGE_SIZE),
          `Each file size should be less than 5 MB.`
      )
      .refine(
          (files) =>
              Array.from(files).every((file) =>
                  ALLOWED_IMAGE_TYPES.includes(file.type)
              ),
          "Only these types are allowed .jpg, .jpeg, .png and .webp"
      ),
});

const categories = [
  {
    id: 3,
    name: "Toys"
  }
]

export function AddProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      categoryId: "",
      images: []
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)

      const res = await addProduct(values);

      if (!res.success) {
        throw new Error(res.error);
      }
      // await new Promise((resolve) => setTimeout(() => {
      //   console.log("Simulated API call delay");
      //   resolve(null);
      // }, 4000));
      toast.success('Product is created.');
      // router.push("/dashboard/products/");
    } catch (error: any) {
      console.log(error);
      toast.error("Error!");
    } finally {
      setIsLoading(false);
      console.log(values);
    }

  }

  return (
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={isLoading} autoComplete={"off"}
                             placeholder="Enter your product name here" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={isLoading} placeholder="Enter your product description here" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />
          {/* Category Select */}
          <FormField
              control={form.control}
              name="categoryId"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="3">Toys</SelectItem>
                            {/*{categories.map((category: { id: string; name: string }) => (*/}
                            {/*    <SelectItem key={category.id} value={category.id}>*/}
                            {/*      {category.name}*/}
                            {/*    </SelectItem>*/}
                            {/*))}*/}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage/>
                  </FormItem>
              )}/>
          <FormField
              control={form.control}
              name="price"
              render={({field}) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="1" {...field} />
                    </FormControl>
                    <FormDescription>

                    </FormDescription>
                    <FormMessage/>
                  </FormItem>
              )}
          />

          <FormField
              control={form.control}
              name="images"
              render={({field: {onChange, value, ...field}}) => {
                // Get current images value (always watched updated)
                const images = form.watch("images");

                return (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <ImageUpload value={value} onChange={onChange} isLoading={isLoading}/>
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                );
              }}
          />
          <Button disabled={isLoading} type="submit">Submit</Button>
        </form>
      </Form>
  )
}