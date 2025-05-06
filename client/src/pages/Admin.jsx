import React, { useState, useEffect } from "react";
import { useRecycleWise } from "../context/RecycleWiseContext.jsx";

const Admin = () => {
	const [events, setEvents] = useState([]);
	const [formData, setFormData] = useState({
		eventName: "",
		eventDate: "",
		eventLocation: "",
		eventDescription: "",
		eventImage: "",
		eventOrganizer: "",
		eventType: "",
		eventStatus: "upcoming",
	});
	const [editingEventId, setEditingEventId] = useState(null);

	const { API_URL } = useRecycleWise();

	// Fetch events from the server
	useEffect(() => {
		const fetchEvents = async () => {
			const response = await fetch(`${API_URL}/events`);
			const data = await response.json();
			setEvents(data);
		};
		fetchEvents();
	}, []);

	// Handle form input changes
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Function to send email
	const sendEmail = async (eventData) => {
		try {
			const response = await fetch(`${API_URL}/send-email`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(eventData),
			});
			if (response.ok) {
				alert("Email sent successfully!");
			} else {
				alert("Failed to send email.");
			}
		} catch (error) {
			console.error("Error sending email:", error);
			alert("An error occurred while sending the email.");
		}
	};

	// Handle form submission for creating/updating events
	const handleSubmit = async (e) => {
		e.preventDefault();
		const method = editingEventId ? "PUT" : "POST";
		const url = editingEventId
			? `/api/events/${editingEventId}`
			: "/api/events";

		const response = await fetch(url, {
			method,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			const updatedEvent = await response.json();
			if (editingEventId) {
				setEvents(
					events.map((event) =>
						event._id === editingEventId ? updatedEvent : event
					)
				);
			} else {
				setEvents([...events, updatedEvent]);
			}
			setFormData({
				eventName: "",
				eventDate: "",
				eventLocation: "",
				eventDescription: "",
				eventImage: "",
				eventOrganizer: "",
				eventType: "",
				eventStatus: "upcoming",
			});
			setEditingEventId(null);
		}
	};

	// Handle delete event
	const handleDelete = async (id) => {
		const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
		if (response.ok) {
			setEvents(events.filter((event) => event._id !== id));
		}
	};

	// Handle edit event
	const handleEdit = (event) => {
		setFormData(event);
		setEditingEventId(event._id);
	};

	return (
		<div className='p-8'>
			<h1 className='text-black text-2xl font-bold mb-4'>Admin Dashboard</h1>

			{/* Event Form */}
			<form
				onSubmit={handleSubmit}
				className='bg-white shadow-md rounded p-6 mb-6'
			>
				<h2 className='text-black text-xl font-semibold mb-4'>
					{editingEventId ? "Edit Event" : "Create Event"}
				</h2>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<input
						type='text'
						name='eventName'
						placeholder='Event Name'
						value={formData.eventName}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
						required
					/>
					<input
						type='date'
						name='eventDate'
						value={formData.eventDate}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
						required
					/>
					<input
						type='text'
						name='eventLocation'
						placeholder='Event Location'
						value={formData.eventLocation}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
						required
					/>
					<input
						type='text'
						name='eventOrganizer'
						placeholder='Event Organizer'
						value={formData.eventOrganizer}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
						required
					/>
					<input
						type='text'
						name='eventType'
						placeholder='Event Type'
						value={formData.eventType}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
						required
					/>
					<select
						name='eventStatus'
						value={formData.eventStatus}
						onChange={handleInputChange}
						className='text-black border p-2 rounded w-full'
					>
						<option value='upcoming'>Upcoming</option>
						<option value='ongoing'>Ongoing</option>
						<option value='completed'>Completed</option>
					</select>
				</div>
				<textarea
					name='eventDescription'
					placeholder='Event Description'
					value={formData.eventDescription}
					onChange={handleInputChange}
					className='text-black border p-2 rounded w-full mt-4'
					required
				/>
				<input
					type='text'
					name='eventImage'
					placeholder='Event Image URL'
					value={formData.eventImage}
					onChange={handleInputChange}
					className='text-black border p-2 rounded w-full mt-4'
				/>
				<button
					type='submit'
					className='bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600'
				>
					{editingEventId ? "Update Event" : "Create Event"}
				</button>
			</form>

			{/* Events Table */}
			<div className='bg-white shadow-md rounded p-6'>
				<h2 className='text-xl text-black font-semibold mb-4'>Events</h2>
				<table className='table-auto w-full border-collapse border border-gray-200'>
					<thead>
						<tr className='bg-gray-900'>
							<th className='border p-2'>Name</th>
							<th className='border p-2'>Date</th>
							<th className='border p-2'>Location</th>
							<th className='border p-2'>Organizer</th>
							<th className='border p-2'>Type</th>
							<th className='border p-2'>Status</th>
							<th className='border p-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{events.map((event) => (
							<tr key={event._id}>
								<td className='border p-2'>{event.eventName}</td>
								<td className='border p-2'>
									{new Date(event.eventDate).toLocaleDateString()}
								</td>
								<td className='border p-2'>{event.eventLocation}</td>
								<td className='border p-2'>{event.eventOrganizer}</td>
								<td className='border p-2'>{event.eventType}</td>
								<td className='border p-2'>{event.eventStatus}</td>
								<td className='border p-2'>
									<button
										onClick={() => handleEdit(event)}
										className='bg-yellow-500 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-600'
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(event._id)}
										className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
									>
										Delete
									</button>
									<button
										onClick={() => sendEmail(event)}
										className='bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600'
									>
										Send Email
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Admin;
