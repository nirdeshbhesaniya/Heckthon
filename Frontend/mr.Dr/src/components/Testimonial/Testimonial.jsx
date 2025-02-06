import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import patientAvatar from "../../assets/images/patient-avatar.png";
import { HiStar } from "react-icons/hi";

const Testimonial = () => {
    // Slick slider settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        dots: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="mt-[30px] lg:mt-[55px]">
            <Slider {...settings}>
                {/* Testimonial 1 */}
                <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex items-center gap-4">
                        <img
                            src={patientAvatar}
                            alt="Patient Avatar"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xl font-semibold text-headingColor hover:text-blue-500 transition-all duration-300">
                                Muhibur Rahman
                            </h4>
                            <div className="flex items-center gap-[2px] mt-1">
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <p className="text-base mt-4 text-gray-700 font-normal">
                        &quot;I have taken medical services from them. They treat so well and are providing the best medical services.&quot;
                    </p>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex items-center gap-4">
                        <img
                            src={patientAvatar}
                            alt="Patient Avatar"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xl font-semibold text-headingColor hover:text-blue-500 transition-all duration-300">
                                Sarah Khan
                            </h4>
                            <div className="flex items-center gap-[2px] mt-1">
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <p className="text-base mt-4 text-gray-700 font-normal">
                        &quot;I had a great experience with their services. Highly recommend to others looking for quality treatment.&quot;
                    </p>
                </div>

                {/* Testimonial 3 */}
                <div className="bg-white shadow-xl rounded-lg p-6 transform hover:scale-105 transition duration-500 ease-in-out">
                    <div className="flex items-center gap-4">
                        <img
                            src={patientAvatar}
                            alt="Patient Avatar"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                            <h4 className="text-xl font-semibold text-headingColor hover:text-blue-500 transition-all duration-300">
                                Ali Reza
                            </h4>
                            <div className="flex items-center gap-[2px] mt-1">
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                                <HiStar className="text-yellow-500 w-[20px] h-5 animate-pulse" />
                            </div>
                        </div>
                    </div>
                    <p className="text-base mt-4 text-gray-700 font-normal">
                        &quot;Excellent service with professional staff! I felt very comfortable during my visit.&quot;
                    </p>
                </div>
            </Slider>
        </div>
    );
};

export default Testimonial;
