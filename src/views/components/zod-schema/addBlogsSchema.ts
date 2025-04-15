import { z } from "zod";

export const addBlogsSchema = z.object({
  titleEn: z.string().min(1, { message: "العنوان مطلوب!" }),
  titleAr: z.string().min(1, { message: "Title is required!" }),
  textEn: z.string().min(1, { message: "الوصف مطلوب!" }),
  textAr: z.string().min(1, { message: "Description is required!" }),
  images: z
    .array(z.instanceof(File), { message: "Invalid file format!" })
    .min(1, { message: "At least one image must be selected!" }),
});

export const updateBlogsSchema = addBlogsSchema.partial();
export type BlogsFormValues = z.infer<typeof addBlogsSchema>;
export type UpdateBlogsFormValues = z.infer<typeof updateBlogsSchema>;
