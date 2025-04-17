import ImageInputWithHook from "../shared/ImageInputWithHook";
import TextInputWithHook from "../shared/TextInputWithHook";

const AddingServiceFormUi = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
      <TextInputWithHook
        label={"Service Title"}
        name="titleEn"
        placeholder={"Write Your Service Title [EN]..."}
      />
      <TextInputWithHook
        label={"Service Title"}
        name="titleAr"
        placeholder={"Write Your Service Title [AR]..."}
      />
      {/* <TextAreaWithHook
        label={"Service Description"}
        name="textEn"
        placeholder={"Write Your Service Description [EN]..."}
      />
      <TextAreaWithHook
        label={"Service Description"}
        name="textAr"
        placeholder={"Write Your Service Description [AR]..."}
      /> */}

      <ImageInputWithHook label={"Service Images"} />
    </section>
  );
};

export default AddingServiceFormUi;
