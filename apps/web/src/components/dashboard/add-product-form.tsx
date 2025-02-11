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
import {addProduct, getAllCategories, uploadImages} from "@/lib/actions";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue
} from "@/components/ui/select";
import {categories} from "@/lib/categories";

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
    price: z
        .string()
        .min(1, 'cannot be empty')
        .default('')
        .refine(
            (val) => !isNaN(Number(val)),
            { message: 'Invalid price' }
        )
    ,
  categoryId: z.coerce.number().min(1),
    images: z
        .array(
            z.union([
                z.string().url(), // ✅ Supports existing image URLs
                z.instanceof(File) // ✅ Supports new image uploads
            ])
        )
        .min(1, "At least one image is required")
        .max(5, "Maximum of 5 images are allowed")
        .refine(
            (images) =>
                images.every((image) =>
                    typeof image === "string" || image.size <= MAX_IMAGE_SIZE
                ),
            `Each file size should be less than 5 MB.`
        )
        .refine(
            (images) =>
                images.every(
                    (image) =>
                        typeof image === "string" || ALLOWED_IMAGE_TYPES.includes(image.type)
                ),
            "Only these types are allowed: .jpg, .jpeg, .png, .webp"
        ),
});

export function AddProductForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      // categoryId: 11,
      // images: []
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const {images} = values;
      const formData = new FormData();
      if (images) {
        for (const image of images) {
          formData.append('images', image);
        }
      }
      const uploadedImages = await uploadImages(formData);
      const addProductDTO = {...values, images: uploadedImages.data};

      const res = await addProduct(addProductDTO);

      if (!res.success) {
        throw new Error(res.error);
      }

      toast.success('Product is created.');
      // router.push("/dashboard/products/");
    } catch (error) {
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
                      <Select onValueChange={field.onChange}
                              // defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category"/>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {/*<SelectItem value="3">Toys</SelectItem>*/}
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={`${category.id}`}>
                                  {category.name}
                                </SelectItem>
                            ))}
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
                console.log(images);
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