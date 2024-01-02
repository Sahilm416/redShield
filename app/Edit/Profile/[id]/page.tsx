const page = ({ params }: { params: { id: string } }) => {
    return (
      <div className="w-full h-screen flex justify-center items-center">id is {params.id}</div>
    );
  };
  
  export default page;
  