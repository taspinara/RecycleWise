import React from 'react'

import logoWhite from "../assets/logo-white.png";

const Footer = () => {
  return (
			<footer
				className='grid grid-cols-2 bg-[#31533F] text-white py-6 px-12'
			>
				<div>
					<img
						src={logoWhite}
						alt='logo white'
					/>
				</div>
				<div className='flex flex-col text-left container mx-auto px-4'>
					<ul className='flex space-x-6 mb-4'>
						<li className='inline-block mx-2'>
							<a
								href='#about'
								className='hover:underline'
							>
								About
							</a>
						</li>
						<li className='inline-block mx-2'>
							<a
								href='#services'
								className='hover:underline'
							>
								Services
							</a>
						</li>
						<li className='inline-block mx-2'>
							<a
								href='#contact'
								className='hover:underline'
							>
								Contact
							</a>
						</li>
					</ul>
					<p>&copy; 2025 RecycleWise. All rights reserved.</p>
				</div>
			</footer>
		
	);
}

export default Footer