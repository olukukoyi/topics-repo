import { useParams, useRouter } from "next/navigation";

function IndividualFoodItem({ item }) {
  const router = useRouter();
  let calories = 0;

  let { description, brand_Owner, brand_name, weight } = item;

  const toTitleCase = (text) => {
    description = description
      .toLowerCase()
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(" ");
  };

  let weightInG = weight?.split("/")[1];
  let wieghtInOz = weight?.split("/")[0];

  console.log(weightInG, wieghtInOz);

  // getting calories helper
  const gettingCalories = () => {
    for (item of item.nutrients) {
      if (item.name === "Energy") {
        calories = item.value;
      }
    }
  };

  gettingCalories();
  toTitleCase();
  // splittingWeight();

  return (
    <div className="flex w-full justify-between items-center px-4">
      {/* div for food name and brand name */}
      <div className="flex flex-col space-y-2 py-3">
        <div className="flex space-x-5 md:space-x-5 items-center md:justify-evenly">
          <h1 className="font-bold text-[17px] w-[240px] md:w-[550px] md:text-[20px] text-[#4C220A] ">
            {description}
          </h1>{" "}
          <h1 className="font-md  text-[14px] md:text-[16px] text-[#4C220A] opacity-[70%] ">
            {brand_Owner ? brand_Owner : brand_name}
            {/* {brand_name} */}
          </h1>
        </div>
        {/* div for food name and brand name */}
        {/* div for calories and weight*/}
        <div className="flex items-center space-x-2 md:pt-0 pt-2 ">
          <svg
            className="text-[#D79C59] font-bold bg-none  w-[24px] h-[23px] rounded-[999px]"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 1024 1024"
          >
            <path
              fill="currentColor"
              d="M834.1 469.2A347.5 347.5 0 0 0 751.2 354l-29.1-26.7a8.09 8.09 0 0 0-13 3.3l-13 37.3c-8.1 23.4-23 47.3-44.1 70.8c-1.4 1.5-3 1.9-4.1 2s-2.8-.1-4.3-1.5c-1.4-1.2-2.1-3-2-4.8c3.7-60.2-14.3-128.1-53.7-202C555.3 171 510 123.1 453.4 89.7l-41.3-24.3c-5.4-3.2-12.3 1-12 7.3l2.2 48c1.5 32.8-2.3 61.8-11.3 85.9c-11 29.5-26.8 56.9-47 81.5a295.6 295.6 0 0 1-47.5 46.1a352.6 352.6 0 0 0-100.3 121.5A347.75 347.75 0 0 0 160 610c0 47.2 9.3 92.9 27.7 136a349.4 349.4 0 0 0 75.5 110.9c32.4 32 70 57.2 111.9 74.7C418.5 949.8 464.5 959 512 959s93.5-9.2 136.9-27.3A348.6 348.6 0 0 0 760.8 857c32.4-32 57.8-69.4 75.5-110.9a344.2 344.2 0 0 0 27.7-136c0-48.8-10-96.2-29.9-140.9M713 808.5c-53.7 53.2-125 82.4-201 82.4s-147.3-29.2-201-82.4c-53.5-53.1-83-123.5-83-198.4c0-43.5 9.8-85.2 29.1-124c18.8-37.9 46.8-71.8 80.8-97.9a349.6 349.6 0 0 0 58.6-56.8c25-30.5 44.6-64.5 58.2-101a240 240 0 0 0 12.1-46.5c24.1 22.2 44.3 49 61.2 80.4c33.4 62.6 48.8 118.3 45.8 165.7a74.01 74.01 0 0 0 24.4 59.8a73.36 73.36 0 0 0 53.4 18.8c19.7-1 37.8-9.7 51-24.4c13.3-14.9 24.8-30.1 34.4-45.6c14 17.9 25.7 37.4 35 58.4c15.9 35.8 24 73.9 24 113.1c0 74.9-29.5 145.4-83 198.4"
            />
          </svg>
          <div className="flex space-x-4">
            <h1 className="text-[#D79C59] font-bold ">
              {calories} * {weightInG ? weightInG : wieghtInOz}
            </h1>

            {/* <h1 className="text-[#D79C59] font-bold ">
              {weightInG ? weightInG : wieghtInOz}
            </h1> */}
          </div>
        </div>
        {/* div for calories and weight*/}
      </div>
      <div
        className="cursor-pointer hover:opacity-[30%] ease-out duration-100"
        onClick={() => {
          router.push("/foodItem");
        }}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 32 32"
          className=" w-[24px] h-[24px] md:w-[30px] md:h-[30px] text-[#4C220A] "
        >
          <path
            fill="currentColor"
            d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-1 5v5h-5v2h5v5h2v-5h5v-2h-5v-5z"
          />
        </svg>
      </div>
    </div>
  );
}

export default IndividualFoodItem;
