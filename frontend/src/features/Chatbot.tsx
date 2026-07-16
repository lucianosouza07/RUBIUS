import { useState, useRef, useEffect } from "react"
import { sendAgentMessage } from "../api/rubius"

import "./Chatbot.css"

function Chatbot() {
	const [messages, setMessages] = useState([
		{
			date: Date.now(),
			role: "agent",
			content: "Olá! Pergunte algo sobre a copa.",
		},
	]);
	const [input, setInput] = useState("")

	const bottomRef = useRef(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({behavior: "smooth"})
	}, [messages]);

	const sendMessage = async() => {
		if (!input.trim()) return;

		setMessages((prev) => [
			...prev,
			{
				date: Date.now(),
				role: "user",
				content: input,
			},
		]);

		setInput("");

		const agent_reply = await sendAgentMessage(input)

		setMessages((prev) => [
			...prev,
			{
				date: Date.now() + 1,
				role: "agent",
				content: agent_reply,
			},
		]);
	}

	return (
		<>
			<h1>Agente Rubius</h1>

			<div className="chat-container">
				<div className="messages">
					{messages.map((msg) => (
						<div key={msg.date} className={`message ${msg.role}`}>
							{msg.content}
						</div>
					))}
					<div ref={bottomRef} />
				</div>
			</div>

			<div className="chat-input">
				<textarea
					rows={1}
					placeholder="Pergunte algo sobre a copa"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={(e) => {
						if (e.key == "Enter" && !e.shiftKey) {
							e.preventDefault();
							sendMessage();
						}
					}}
				/>
			</div>
		</>
	)
}

export default Chatbot
