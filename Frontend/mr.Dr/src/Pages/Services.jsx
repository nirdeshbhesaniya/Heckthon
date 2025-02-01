import {BsArrowRight} from "react-icons/bs" 
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

const ServiceCard = ({ title, number, color }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <span className={`w-8 h-8 flex items-center justify-center rounded-lg font-medium ${color}`}>{number}</span>
      </div>
      <p className="text-gray-600 mb-4">
        World-class care for everyone. Our health system offers unmatched, expert health care. From the lab to the clinic.
      </p>
        <Link 
                to="#"
                className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                <BsArrowRight className="group-hover:text-white w-6 h-5"/>
                </Link>
    </div>
  )
}
ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export default function Services() {
  const services = [
    { title: "Cancer Care", color: "bg-orange-100" },
    { title: "Labor & Delivery", color: "bg-purple-100" },
    { title: "Heart & Vascular", color: "bg-blue-100" },
    { title: "Mental Health", color: "bg-teal-100" },
    { title: "Neurology", color: "bg-yellow-100" },
    { title: "Burn Treatment", color: "bg-violet-100" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          World-class care for everyone. Our health system offers unmatched, expert health care.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} title={service.title} number={index + 1} color={service.color} />
        ))}
      </div>
    </div>
  )
}
