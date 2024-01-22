import Feed from "@components/Feed";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Discover & Diagnose
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> HealthopediaAI</span>
    </h1>
    <p className='desc text-center'>
      Healthopedia is an open-source AI health application for modern world to
      discover, diagnose and create awareness for a healthy You
    </p>

    <Feed />
  </section>
);

export default Home;
