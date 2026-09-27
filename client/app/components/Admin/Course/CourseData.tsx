import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import toast from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequesties: { title: string }[];
  setPrerequesties: (prerequesties: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequesties,
  setPrerequesties,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequestiesChange = (index: number, value: any) => {
    const updatedPrerequesties = [...prerequesties];
    updatedPrerequesties[index].title = value;
    setPrerequesties(updatedPrerequesties);
  };

  const handleAddPrerequesties = () => {
    setPrerequesties([...prerequesties, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if(benefits[benefits.length-1]?.title !=="" && prerequesties[prerequesties.length - 1]?.title !== ""){
        setActive(active + 1);
    }else{
        toast.error("Please fill the fields for go to next!")
    }
  }

  return (
    <div className="w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="">
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            placeholder="You will be able to build a full Stack LMS Platform..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddBenefits}
        />
      </div>
      <div>
        <label className={`${styles.label} text-[20px]`} htmlFor="">
          What are the prerequesties for students in this course?
        </label>
        <br />
        {prerequesties.map((prerequesties: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequesties"
            placeholder="You need basic knowledge of MERN stack"
            required
            className={`${styles.input} my-2`}
            value={prerequesties.title}
            onChange={(e) => handlePrerequestiesChange(index, e.target.value)}
          />
        ))}
        <AddCircleIcon
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequesties}
        />
      </div>
      <div className="w-full flex items-center justify-between">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8"
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
