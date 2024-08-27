import React from 'react';

const Hero = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4 uppercase">ScamChecker.ae</h1>
        <p className="my-4 w-full md:w-8/12 mx-auto text-gray">
                    Be a leader in scam detection with 
                    <a href='/' className="text-yellow-500 font-semibold mx-1">
                        ScamChecker.ae
                    </a>.
                    Report suspicious numbers and search our database, built on real user experiences. We verify scam statuses and provide detailed metrics to ensure transparency and enhance your safety.
                </p>
        <div className="flex space-x-4 justify-center">
          <button className="bg-black text-sm font-bold text-white px-8 py-2 rounded hover:border hover:border-black hover:bg-transparent hover:text-black transition duration-700">CONTACT US</button>
          <button className="border text-sm font-bold border-black text-black px-8 py-2 rounded hover:bg-black hover:text-white  transition duration-700">READ MORE</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;