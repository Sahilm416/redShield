export default async function Screeneffect({content}:{content: string}) {
  const stripes = [<div className="px-[1px] border-x-[1px] h-full"></div>];
  const repetitions = 76; // Adjust this value as needed

  // Duplicate each stripe in the array
  const repeatedStripes = stripes.flatMap((stripe) =>
    Array(repetitions)
      .fill(0)
      .map((_, index) => (
        <div
          key={index}
          className="px-[1px] border-x border-x-white dark:border-x-black h-[70px]"
        >
          {stripe.props.children}
        </div>
      ))
  );

  return (
    <div className="flex justify-center">
      <div className="flex justify-center w-auto dark:bg-white bg-black items-center">
        {repeatedStripes}
        <p className="dark:text-black text-white tracking-wide text-3xl font-bold absolute">
          {" "}
         {content}{" "}
        </p>
      </div>
    </div>
  );
}
