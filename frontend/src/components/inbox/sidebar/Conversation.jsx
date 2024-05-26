/* eslint-disable react/prop-types */
import useConversation from "../../../inbox/zustand/useConversation";


const Conversation = ({conversation,lastIdx,emoji}) => {
	const{selectedConversation,setSelectedConversation}=useConversation();

	const isSelected = selectedConversation?._id === conversation._id;

	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : "bg-slate-600"}
				`}
				onClick={() => setSelectedConversation(conversation)
			}>
				<div className='avatar online'>
					<div className='w-12 rounded-full'>
						<img
							src={`/images/${conversation.photo}`}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.name}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider mx-2'></div>}
		</>
	);
};
export default Conversation;