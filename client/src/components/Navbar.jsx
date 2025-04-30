import React from "react";
import logo from "../assets/logo.png"; 

const Navbar = () => {
	return (
		<>
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
		</>
	);
};

export default Navbar;
