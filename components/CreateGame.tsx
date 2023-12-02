import { globalActions } from '@/store/globalSlices'
import { GameParams, RootState } from '@/utils/type.dt'
import { useRouter } from 'next/router'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const CreateGame: React.FC = () => {
  const navigate = useRouter()
  const { createModal } = useSelector((states: RootState) => states.globalStates)

  const dispatch = useDispatch()
  const { setCreateModal } = globalActions

  const [game, setGame] = useState<GameParams>({
    title: '',
    description: '',
    participants: '',
    winners: '',
    challenges: '',
    starts: '',
    ends: '',
    stake: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGame((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const closeModal = () => {
    dispatch(setCreateModal('scale-0'))
    setGame({
      title: '',
      participants: '',
      winners: '',
      challenges: '',
      starts: '',
      ends: '',
      description: '',
      stake: '',
    })
  }

  const handleGameCreation = async (e: FormEvent) => {
    e.preventDefault()

    game.starts = new Date(game.starts).getTime()
    game.ends = new Date(game.ends).getTime()

    await toast.promise(
      new Promise(async (resolve, reject) => {
        // ...
      }),
      {
        pending: 'Approve transaction...',
        success: 'Game creation successful 👌',
        error: 'Encountered error 🤯',
      }
    )
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center
    bg-black bg-opacity-50 transform z-50 transition-transform duration-300 ${createModal}`}
    >
      <div className="bg-[#010922] text-gray-300 shadow-md shadow-blue-900 rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Create Game</p>
            <button onClick={closeModal} className="border-0 bg-transparent focus:outline-none">
              <FaTimes />
            </button>
          </div>

          <form
            className="flex flex-col justify-center items-start rounded-xl mt-5 mb-5"
            onSubmit={handleGameCreation}
          >
            <label className="text-[12px]">Title</label>
            <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Title"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                name="title"
                type="text"
                value={game.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center w-full space-x-2 my-3">
              <div className="w-full">
                <label className="text-[12px]">Participants</label>
                <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4">
                  <input
                    placeholder="E.g 9"
                    type="number"
                    className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                    name="participants"
                    value={game.participants}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="text-[12px]">Number of Winners</label>
                <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4">
                  <input
                    placeholder="E.g 2"
                    type="number"
                    min={1}
                    className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                    name="winners"
                    value={game.winners}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="w-full">
                <label className="text-[12px]">Number of challenges</label>
                <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4">
                  <input
                    placeholder="E.g 5"
                    type="number"
                    min={5}
                    className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                    name="challenges"
                    value={game.challenges}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-full">
              <label className="text-[12px]">Stake amount</label>
              <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4 mb-3 mt-2">
                <input
                  placeholder="eg 0.04"
                  className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                  name="stake"
                  value={game.stake}
                  type="number"
                  onChange={handleChange}
                  step={0.0001}
                  min={0.0001}
                  required
                />
              </div>
            </div>

            <label className="text-[12px]">Starts On</label>
            <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="Start Date"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                name="starts"
                type="datetime-local"
                value={game.starts}
                onChange={handleChange}
                required
              />
            </div>
            <label className="text-[12px]">Ends On</label>
            <div className="py-2 w-full border border-blue-900 rounded-full flex items-center px-4 mb-3 mt-2">
              <input
                placeholder="End Date"
                className="bg-transparent outline-none w-full placeholder-[#3D3857] text-sm border-none focus:outline-none focus:ring-0 py-0"
                name="ends"
                type="datetime-local"
                value={game.ends}
                onChange={handleChange}
                required
              />
            </div>

            <label className="text-[12px]">Description</label>

            <textarea
              placeholder="What is this game about?"
              className="h-[70px] w-full bg-transparent border border-blue-900 rounded-xl py-3 px-3
              focus:outline-none focus:ring-0 resize-none
              placeholder-[#3D3857] text-sm"
              name="description"
              value={game.description}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="bg-transparent border border-blue-700 hover:bg-blue-800
              py-2 px-6 text-blue-700 hover:text-white rounded-full
              transition duration-300 ease-in-out mt-5"
            >
              Create Game
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateGame
