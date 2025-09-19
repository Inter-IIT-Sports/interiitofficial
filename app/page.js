import Home from "../Components/Home"

export default function Page() {
  return (
    <>
      {/* Adjust padding to match navbar height */}
      <div className="pt-16"
            // style={{fontFamily: '"Nunito Sans", sans-serif'}}
>
        <Home />
      </div>
    </>
  );
}
