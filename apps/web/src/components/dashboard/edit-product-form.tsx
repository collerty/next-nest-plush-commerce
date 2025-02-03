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
import {addProduct, getAllCategories, updateProduct, uploadImages} from "@/lib/actions";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectGroup,
  SelectValue
} from "@/components/ui/select";
import {Product} from "@/lib/types";

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

const categories = [
  {
    "id": 11,
    "name": "Wildlife Animals"
  },
  {
    "id": 12,
    "name": "Fantasy Creatures"
  },
  {
    "id": 13,
    "name": "Aquatic Animals"
  },
  {
    "id": 14,
    "name": "Birds"
  },
  {
    "id": 15,
    "name": "Pets"
  }
]

export function EditProductForm({product} : {product: Product}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.category.id,
      images: product.images,
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      // console.log(values);
      let {images} = values;
      const existingImages = images.filter((img) => typeof img === "string");
      const newImages = images.filter((img) => img instanceof File);

      const formData = new FormData();
      if (newImages) {
        for (const image of images) {
          formData.append('images', image);
        }
      }
      const uploadedImages = await uploadImages(formData);
      const addProductDTO = {...values, images: [...uploadedImages.data, ...existingImages]};

      console.log(addProductDTO);
      const res = await updateProduct(addProductDTO, product.id);

      if (!res.success) {
        throw new Error(res.error);
      }

      toast.success('Product is updated.');
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
              render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                          onValueChange={(value) => field.onChange(Number(value))} // Ensure it's a number
                          value={field.value?.toString()} // Ensure string for the Select component
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                  {category.name}
                                </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
          />

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