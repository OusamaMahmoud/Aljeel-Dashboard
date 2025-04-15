import ImageInputWithHook from "./ImageInputWithHook";
import TextInputWithHook from "./TextInputWithHook";

const AddingBlogFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={"Team Title"}
        name="titleEn"
        placeholder={"Write Your Team Title [EN]..."}
      />
      <TextInputWithHook
        label={"Team Title"}
        name="titleAr"
        placeholder={"Write Your Team Title [AR]..."}
      />
      <TextInputWithHook
        label={"Position"}
        name="textEn"
        placeholder={"Write Your Position [EN]..."}
      />
      <TextInputWithHook
        label={"Position"}
        name="textAr"
        placeholder={"Write Your Position [AR]..."}
      />
      {/* <SelectInputWithHook
        label="Button Status"
        name="btnStatus"
        placeholder="Write Your Button Status ..."
        options={[
          { label: "Active", value: "1" },
          { label: "In-active", value: "0" },
        ]}
      /> */}
      <ImageInputWithHook label={"Chairman Images"} />
    </section>
  );
};

export default AddingBlogFormUi;
