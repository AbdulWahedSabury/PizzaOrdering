import CreateUser from "../features/user/CreateUser";

function Home() {
  return (
    <div className="text-center  px-8 py-10">
      <h1 className="text-xl md:text-3xl font-semibold text-stone-700 mb-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
