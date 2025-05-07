import React from "react";
import { Link } from "react-router-dom";
import recycle from "../assets/recycle-buddy.png";
import leavesSection from "../assets/leaves-section.png";
import {
	FaMapMarkerAlt,
	FaCamera,
	FaQuestionCircle,
	FaCalendarCheck,
} from "react-icons/fa";

import { useRecycleWise } from "../context/RecycleWiseContext";

const Home = () => {
	const { user } = useRecycleWise(); // Access user from context
	console.log("User", user); // Log when the component is rendered
	return (
		<div className='min-h-screen flex flex-col'>
			{/* Hero Section */}
			<section className='bg-[#F7F0E5] py-20  grid grid-cols-2 items-center'>
				<div className='container w mx-auto px-4 text-center'>
					<h2 className='text-4xl font-bold text-gray-800 mb-4'>
						Make Recycling Easy and Efficient
					</h2>
					<p className='text-gray-600 mb-8'>
						Join us in creating a sustainable future by recycling smarter.
					</p>
					<Link
						to='/'
						className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700'
					>
						Get Started
					</Link>
				</div>
				<div>
					<img
						src={recycle}
						alt='logo recycle wise'
						className='mx-auto mt-10'
					/>
				</div>
			</section>
			{/* Features Section */}
			<section
				id='about'
				className='py-20 bg-gray-50 flex-grow'
			>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-6 px-12'>
					<Link to='/recycling-locator'>
						<div className='flex flex-col text-center items-center bg-[#F7EFE5] p-6 rounded-lg shadow-md'>
							<FaMapMarkerAlt className='text-green-600 text-6xl mb-4' />

							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Recycling Locator
							</h4>
							<p className='text-gray-600'>
								Our platform is designed to make recycling simple and accessible
								for everyone.
							</p>
						</div>
					</Link>
					<Link to='/eco-friendly'>
						<div className='flex flex-col text-center items-center bg-[#E5EED7] p-6 rounded-lg shadow-md'>
							<FaCamera className='text-[#B1C49A] text-6xl mb-4' />
							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Eco-Friendly
							</h4>
							<p className='text-gray-600'>
								We prioritize sustainability and environmental impact.
							</p>
						</div>
					</Link>
					<Link to='/leaderboard'>
						<div className='flex flex-col text-center items-center bg-[#D6ECF2] p-6 rounded-lg shadow-md'>
							<FaQuestionCircle className='text-[#A4C8E1] text-6xl mb-4' />
							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Checkout Our Quiz
							</h4>
							<p className='text-gray-600'>Participate and win Points</p>
						</div>
					</Link>
					<Link to='/events'>
						<div className='flex flex-col text-center items-center bg-[#F7EFE5] p-6 rounded-lg shadow-md'>
							<FaCalendarCheck className='text-[#DDBA97] text-6xl mb-4' />
							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Community Driven
							</h4>
							<p className='text-gray-600'>
								Join a community of like-minded individuals working towards a
								greener planet.
							</p>
						</div>
					</Link>
				</div>
			</section>
			<section className='bg-[#F7F0E5] px-12 py-20  grid grid-cols-2 items-center'>
				<div className='container w mx-auto px-4 text-center'>
					<div className='bg-[#E5EED7] p-6 rounded-lg shadow-md'>
						<h2 className='text-green-600 text-2xl font-bold'>Get Started</h2>
						<p className='text-gray-800'>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. In,
							odit!
						</p>
						<Link
							to='/contact-us'
							className='block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 mt-4'
						>
							Join Us
						</Link>
					</div>
				</div>
				<div>
					<img
						src={leavesSection}
						alt='logo recycle wise'
						className='mx-auto mt-10'
					/>
				</div>
			</section>
		</div>
	);
};

export default Home;
