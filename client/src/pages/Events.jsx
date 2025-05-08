import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecycleWise } from "../context/RecycleWiseContext";

const Events = () => {
	const { API_BASE_URL } = useRecycleWise();
	const [events, setEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [filter, setFilter] = useState({ type: "all", status: "all" });

	useEffect(() => {
		const fetchEvents = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await axios.get(`${API_BASE_URL}/api/events`);
				setEvents(response.data);
				setFilteredEvents(response.data);
			} catch (err) {
				console.error("Error fetching events:", err);
				setError("Failed to load events. Please try again.");
			} finally {
				setLoading(false);
			}
		};

		fetchEvents();
	}, [API_BASE_URL]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilter((prev) => ({ ...prev, [name]: value }));

		let filtered = events;

		if (value !== "all") {
			if (name === "type") {
				filtered = filtered.filter((event) => event.eventType === value);
			} else if (name === "status") {
				filtered = filtered.filter((event) => event.eventStatus === value);
			}
		}

		setFilteredEvents(filtered);
	};

	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-black text-2xl font-bold text-center mb-6'>Events</h1>

			{/* Filters */}
			<div className='flex flex-wrap justify-center gap-4 mb-6'>
				<select
					name='type'
					value={filter.type}
					onChange={handleFilterChange}
					className='text-black border border-gray-300 rounded-lg p-2'
				>
					<option value='all'>All Types</option>
					<option value='workshop'>Workshop</option>
					<option value='seminar'>Seminar</option>
					<option value='conference'>Conference</option>
				</select>

				<select
					name='status'
					value={filter.status}
					onChange={handleFilterChange}
					className='text-black border border-gray-300 rounded-lg p-2'
				>
					<option value='all'>All Status</option>
					<option value='upcoming'>Upcoming</option>
					<option value='ongoing'>Ongoing</option>
					<option value='completed'>Completed</option>
				</select>
			</div>

			{/* Loading and Error States */}
			{loading && (
				<p className='text-center text-gray-500'>Loading events...</p>
			)}
			{error && <p className='text-center text-red-500'>{error}</p>}

			{/* Event Cards */}
			{!loading && !error && filteredEvents.length === 0 && (
				<p className='text-center text-gray-500'>No events found.</p>
			)}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{filteredEvents.map((event) => (
					<div
						key={event._id}
						className='border border-gray-300 rounded-lg shadow-md p-4'
					>
						<img
							src={event.eventImage}
							alt={event.eventName}
							className='text-black w-full h-40 object-cover rounded-lg mb-4'
						/>
						<h2 className='text-black text-lg font-bold mb-2'>{event.eventName}</h2>
						<p className='text-gray-600 mb-1'>
							<strong>Date:</strong>{" "}
							{new Date(event.eventDate).toLocaleDateString()}
						</p>
						<p className='text-gray-600 mb-1'>
							<strong>Location:</strong> {event.eventLocation}
						</p>
						<p className='text-gray-600 mb-1'>
							<strong>Organizer:</strong> {event.eventOrganizer}
						</p>
						<p className='text-gray-600'>
							<strong>Status:</strong> {event.eventStatus}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Events;
