
import DoctorList from '../components/Doctors/DoctorList';
import Testimonial from '../components/Testimonial/Testimonial';

const Doctor = () => {
  
  return (
    <>
    <section className="bg-[#fff9ea]  flex items-center justify-center p-6">
  <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Find a Doctor</h2>
    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
      <input
        type="search"
        className="flex-1 p-3 bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
        placeholder="Search for a doctor..."
      />
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 font-medium transition-all">
        Search
      </button>
    </div>
  </div>
</section>

    <section>
  <div className="container">
    <div className="xl :w-[470px] mx-auto">
      <h2 className="heading text-center">Our great doctor</h2>
      <p className="text_para text-center">
        World-class care for everyone. our health System offers unmatched,
        expert health care.
      </p>
    </div>
    <DoctorList />
  </div>
</section>
<section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">What our patient say</h2>
            <p className="text__para text-center">
              World-class care for everyone. Our health System offers unmatched,
              expert health care.
             
            </p>
          </div>
           <Testimonial/>
        </div>


       </section>
    </>
  )
}

export default Doctor;
