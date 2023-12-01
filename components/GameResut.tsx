import React from 'react'
import { GameStruct, ScoreStruct } from '@/utils/type.dt'
import { truncate } from '@/utils/helper'
import Identicon from 'react-identicons'

interface ComponentProps {
  game: GameStruct
  scores: ScoreStruct[]
}

const GameResut: React.FC<ComponentProps> = ({ scores, game }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-500">
      <h1 className="text-4xl text-gray-300 capitalize font-bold mb-10">{game.title} Result</h1>
      <div className="w-full max-w-2xl mx-auto">
        {scores.map((score, index) => (
          <div
            key={index}
            className="flex items-center shadow-md my-2
            border border-blue-900 p-6 rounded-lg"
          >
            <div className="flex-grow">
              <div className="flex justify-start items-center space-x-2">
                <Identicon
                  className="rounded-full overflow-hidden shadow-md"
                  size={30}
                  string={score.player}
                />
                <div>
                  <p className="font-medium">
                    {truncate({
                      text: score.player,
                      startChars: 4,
                      endChars: 4,
                      maxLength: 11,
                    })}
                  </p>
                  <p>{score.prize.toFixed(2)} ETH</p>
                </div>
              </div>
            </div>
            <div
              className={`font-bold text-lg ${
                score.played && index + 1 <= game.plays ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {score.played && index + 1 <= game.plays
                ? 'Won'
                : score.played && index + 1 > game.plays
                ? 'Lossed'
                : 'Absent'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameResut
