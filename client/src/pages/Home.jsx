import React from "react";
import logo from "../assets/logo.png"; 
import logoWhite from "../assets/logo-white.png";
import recycle from "../assets/recycle-buddy.png";
import leavesSection from "../assets/leaves-section.png";
import { FaMapMarkerAlt, FaCamera, FaQuestionCircle, FaCalendarCheck } from "react-icons/fa";

const Home = () => {
    return (
			<div className='min-h-screen flex flex-col '>
				{/* Header Section */}
				<header className='bg-[#F7F0E5] text-black py-6'>
					<div className='container mx-auto px-4 flex justify-between items-center'>
						<h1 className='text-3xl font-bold'>
							<img
								src={logo}
								alt='logo recycle wise'
							/>
						</h1>
						<nav>
							<ul className='flex space-x-6'>
								<li>
									<a
										href='#about'
										className='hover:underline'
									>
										About
									</a>
								</li>
								<li>
									<a
										href='#services'
										className='hover:underline'
									>
										Services
									</a>
								</li>
								<li>
									<a
										href='#contact'
										className='hover:underline'
									>
										Contact
									</a>
								</li>
								<li>
									<a
										href='#login'
										className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700'
									>
										Sign Up
									</a>
								</li>
							</ul>
						</nav>
					</div>
				</header>

				{/* Hero Section */}
				<section className='bg-[#F7F0E5] py-20  grid grid-cols-2 items-center'>
					<div className='container w mx-auto px-4 text-center'>
						<h2 className='text-4xl font-bold text-gray-800 mb-4'>
							Make Recycling Easy and Efficient
						</h2>
						<p className='text-gray-600 mb-8'>
							Join us in creating a sustainable future by recycling smarter.
						</p>
						<button className='bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700'>
							Get Started
						</button>
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
						<div className='flex flex-col text-center items-center bg-[#E5EED7] p-6 rounded-lg shadow-md'>
							<FaCamera className='text-[#B1C49A] text-6xl mb-4' />
							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Eco-Friendly
							</h4>
							<p className='text-gray-600'>
								We prioritize sustainability and environmental impact.
							</p>
						</div>
						<div className='flex flex-col text-center items-center bg-[#D6ECF2] p-6 rounded-lg shadow-md'>
							<FaQuestionCircle className='text-[#A4C8E1] text-6xl mb-4' />
							<h4 className='text-xl font-bold text-gray-800 mb-2'>
								Checkout Our Quiz
							</h4>
							<p className='text-gray-600'>Participate and win Points</p>
						</div>
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
					</div>
				</section>
				<section  className='bg-[#F7F0E5] px-12 py-20  grid grid-cols-2 items-center'>
                    <div className='container w mx-auto px-4 text-center'>
                        <div className="bg-[#E5EED7] p-6 rounded-lg shadow-md">
                            <h2 className="text-green-600 text-2xl font-bold">Get Started</h2>
                            <p className="text-gray-800">Lorem, ipsum dolor sit amet consectetur adipisicing elit. In, odit!</p>
                            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 mt-4">Join Us</button>
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

				{/* Footer Section */}
				<footer className='grid grid-cols-2 bg-[#31533F] text-white 
                py-6 px-12'>
                    <div>
                        <img src={logoWhite} alt="logo white"/>
                    </div>
					<div className='flex flex-col text-left container mx-auto px-4'>
                        <ul className="flex space-x-6 mb-4">
                            <li className='inline-block mx-2'>
                                <a href='#about' className='hover:underline'>About</a>
                            </li>
                            <li className='inline-block mx-2'>
                                <a href='#services' className='hover:underline'>Services</a>
                            </li>
                            <li className='inline-block mx-2'>
                                <a href='#contact' className='hover:underline'>Contact</a>
                            </li>
                        </ul>
						<p>&copy; 2025 RecycleWise. All rights reserved.</p>
					</div>
				</footer>
			</div>
		);
};

export default Home;
