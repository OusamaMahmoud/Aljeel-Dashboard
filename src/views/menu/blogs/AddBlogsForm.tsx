import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingModal from "../../../modals/LoadingModal";
import { ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteProjectImageMutation } from "../../hooks/projects/useDeleteProjectImageMutation";
import ImagesPreviewUi from "../../components/shared/ImagesPreviewUi";
import OldImagesPreviewUi from "../../components/shared/OldImagesPreviewUi";
import { useAddBlogsMutation } from "../../hooks/blogs/useAddBlogsMutation";
import { useFetchBlog } from "../../hooks/blogs/useFetchBlog";

import AddingBlogFormUi from "../../components/shared/AddingBlogFormUi";
import {
  addBlogsSchema,
  BlogsFormValues,
  updateBlogsSchema,
} from "../../components/zod-schema/addBlogsSchema";

const AddBlogsForm: React.FC = () => {
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [oldImagesPreview, setOldImagesPreview] = useState("");
  const [blogId, setBlogId] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  const schema = blogId ? updateBlogsSchema : addBlogsSchema;

  const methods = useForm<BlogsFormValues>({
    resolver: zodResolver(schema),
  });

  const images = methods.watch("images");
  const handleImagesChange = useCallback((images: File[] | null) => {
    if (images) {
      const urls = Array.from(images).map((img) => URL.createObjectURL(img));
      setImagesPreview(urls);

      // Clean up URLs when component unmounts or images change
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, []);

  useEffect(() => {
    const cleanup = handleImagesChange(images);

    // Cleanup on component unmount or when images change
    return () => cleanup && cleanup();
  }, [images, handleImagesChange]);

  const handleDeleteProjectImage = (ImageId: number) => {
    mutateImageDeletion(ImageId);
  };

  const {
    isError,
    isPending,
    mutateAsync: addBlogMutation,
    error,
  } = useAddBlogsMutation();

  const {
    isError: isDeleteImageError,
    isPending: isDeleteImageLoading,
    mutateAsync: mutateImageDeletion,
    error: deleteImageError,
  } = useDeleteProjectImageMutation();

  const {
    data: blogData,
    isFetching: isBlogFetching,
    isError: isFetchBlogError,
    error: fetchBlogError,
  } = useFetchBlog(blogId || "");

  const onSubmit = (data: BlogsFormValues) => {
    const formData = new FormData();

    // Map keys to append values dynamically
    const fields = [
      { key: "title[en]", value: data.titleEn },
      { key: "title[ar]", value: data.titleAr },
      { key: "text[en]", value: data.textEn },
      { key: "text[ar]", value: data.textAr },
      { key: "status", value: "0" },
    ];

    if (blogId) fields.push({ key: "_method", value: "put" });

    fields.forEach(({ key, value }) => formData.append(key, value));

    // Ensure images are correctly appended
    if (Array.isArray(data.images)) {
      data.images.forEach((img, idx) => {
        if (img instanceof File) {
          console.log(`Appending image[${idx}]`, img);
          formData.append(`background`, img); // Append actual file
        } else {
          console.error(`Invalid file at index ${idx}`, img);
        }
      });
    } else {
      console.error("Images field is not an array!");
    }

    blogId
      ? addBlogMutation({ formData, blogId })
      : addBlogMutation({ formData });

    methods.reset();

    setTimeout(() => {
      navigate("/blogs");
    }, 2500);

    setImagesPreview([]);
  };

  useEffect(() => {
    if (params) {
      const ID = params?.id;
      if (ID) setBlogId(ID);
    }
  }, [params]);

  useEffect(() => {
    if (blogId) {
      methods.reset({
        titleEn: blogData?.title?.en,
        titleAr: blogData?.title?.ar,
        textEn: blogData?.text?.en,
        textAr: blogData?.text?.ar,
      });

      if (blogData?.background) setOldImagesPreview(blogData?.background);
      console.log("Copooo=>", blogData?.background);
    }
  }, [blogData, methods.reset]);

  return (
    <FormProvider {...methods}>
      <div className="container mx-auto p-4">
        <ToastContainer />

        {/* Fetching Projects */}
        {isError && <p className="error-message">{error.message}</p>}
        {isFetchBlogError && (
          <p className="error-message">{fetchBlogError.message}</p>
        )}

        {/* Fetching Project For Update */}
        {isPending && <LoadingModal />}
        {isBlogFetching && <LoadingModal />}

        {/* Delete Image States */}
        {isDeleteImageLoading && <LoadingModal />}
        {isDeleteImageError && (
          <p className="error-message">{deleteImageError.message}</p>
        )}

        <h1 className="text-3xl font-serif font-semibold mb-4">Add Blogs</h1>

        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <AddingBlogFormUi />

          {imagesPreview.length > 0 && (
            <ImagesPreviewUi imagesPreviewUrls={imagesPreview} />
          )}

          {oldImagesPreview?.length > 0 && (
            <OldImagesPreviewUi
              oldImagesPreview={oldImagesPreview}
              onDeleteProjectImage={(id) => handleDeleteProjectImage(id)}
            />
          )}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn bg-bruColorLight1 hover:bg-bruColorLight1 px-12 my-8"
            >
              Add Blogs
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default AddBlogsForm;
