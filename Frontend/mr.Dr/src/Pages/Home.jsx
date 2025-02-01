
import heroImg01 from '../assets/images/hero-Img01.png'
import heroImg02 from '../assets/images/hero-Img02.png'
import heroImg03 from '../assets/images/hero-Img03.png'
import icon01 from '../assets/images/icon01.png'
import icon02 from '../assets/images/icon02.png'
import icon03 from '../assets/images/icon03.png'
import userImg from "../assets/images/avatar-icon.png";
import featureImg from '../assets/images/feature-img.png'
import {Link} from 'react-router-dom' 
import {BsArrowRight} from "react-icons/bs" 
import About from '../components/About/About'
import Services from './Services'

const Home = () => {
  return (
    <>
      {/* ========= Hero Section ========= */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* ========= Hero content ========= */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[70px]">
                  We help patients live a healthy, longer life.
                </h1>
                <p className="text__para">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, doloribus deleniti consequatur nostrum culpa possimus blanditiis impedit non earum recusandae! Aliquam dolore deleniti tempora itaque aspernatur unde excepturi consequuntur eligendi iure. Temporibus, labore iure!
                </p>
                <button className="btn">Request an Appointment</button>
              </div>

              {/* ========= Hero Counter ========= */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Years of Experience</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Clinic Locations</p>
                </div>

                <div>
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]"></span>
                  <p className="text__para">Patient Satisfaction</p>
                </div>
              </div>
            </div>

            {/* ========= Hero Images ========= */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img className="w-full" src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} alt="" className="w-full mb-[30px]" />
                <img src={heroImg03} alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* ========= hero Section end ========= */}

      <section>
  <div className="container">
    <div className="lg:w-[470px] mx-auto">
      <h2 className="heading text-center">
        Prividing the best medical services
      </h2>
      <p className="text_para text-center">
        world-class care for everyone. our health System offers unmatched,
        expert health care.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">  
      
      <div className="py-[30px] px-5 ">
        <div className="flex items-center justify-center">
          <img src={icon01} alt="" />          
        </div>
        
        <div className="mt-[30px]">
          <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
            Find a Doctor
          </h2>
          <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
            World-class care for everyone. our health System offers
            unmatched, expert health care. from the lab to hte clinic.
          </p>
          
          <Link 
          to="/doctor"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
          <BsArrowRight className="group-hover:text-white w-6 h-5"/>
          </Link>
        </div>
      </div> 
      
      
      
      
      
      
      <div className="py-[30px] px-5 ">
        <div className="flex items-center justify-center">
          <img src={icon02} alt="" />          
        </div>
        
        <div className="mt-[30px]">
          <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
            Find a Location
          </h2>
          <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
            World-class care for everyone. our health System offers
            unmatched, expert health care. from the lab to hte clinic.
          </p>
          
          <Link 
          to="/doctor"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
          <BsArrowRight className="group-hover:text-white w-6 h-5"/>
          </Link>
        </div>
      </div> 
          
       <div className="py-[30px] px-5 ">
        <div className="flex items-center justify-center">
          <img src={icon03} alt="" />          
        </div>
        
        <div className="mt-[30px]">
          <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
            Book Appointment
          </h2>
          <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
            World-class care for everyone. our health System offers
            unmatched, expert health care. from the lab to hte clinic.
          </p>
          
          <Link 
          to="/doctor"
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
          >
          <BsArrowRight className="group-hover:text-white w-6 h-5"/>
          </Link>
        </div>
      </div>
      
    </div>
  </div>
</section>

{/* ========= about Section start ========= */}
<About/>
{/* ========= about Section end ========= */}
{/*========== Services Section Start ========= */}
<section>
<Services/>
</section>
{/*========== Services Section End ========= */}
{/*========== Feature Section ============== */}
<section className="py-12">
      <div className="container flex flex-col lg:flex-row items-center justify-between gap-12">
        
        {/* Left Section - Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Get virtual treatment anytime.
          </h2>
          <ul className="text-lg text-gray-600 space-y-3">
            <li>1. Schedule the appointment directly.</li>
            <li>2. Search for your physician here, and contact their office.</li>
            <li>3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.</li>
          </ul>
          <Link to="/">
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </Link>
        </div>

        {/* Right Section - Image & Floating Card */}
        <div className="relative w-full lg:w-1/2 flex justify-center">
          <img src={featureImg} alt="Doctor" className="w-3/4 lg:w-full max-w-md" />
            {/* Floating Appointment Card */}
            <div className="absolute bottom-6 right-[-5%] md:right-[10%] bg-white shadow-lg rounded-lg p-4 flex items-center space-x-3">
            <img src={userImg} alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-gray-500 text-sm">Tue, 24  10:00AM</p>
              <p className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md inline-block">Consultation</p>
              <p className="font-semibold text-gray-900 mt-1">Wayne Collins</p>
            </div>
          </div>
        </div>

      </div>
    </section>
{/*========== Feature Section End ============== */}


    </>
  );
};

export default Home;
