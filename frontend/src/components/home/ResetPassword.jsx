import React from 'react'
import backgroundImage from '../../assets/background/4.jpg';

const ResetPassword = () => {
  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-black-900" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10 bg-white bg-opacity-50 p-5 rounded-lg border border-black-300">
          <div className="text-center">
            <p className="text-black-500 dark:text-black-400 font-bold">Enter your new password</p>
          </div>
          <div className="m-7">
            <form action="">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-white-600 dark:text-white-400">Password</label>
                        <input type="email" name="email" id="email" placeholder="New password" className="w-full px-3 py-2 placeholder-white-300 border border-white-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-white-700 dark:text-white dark:placeholder-white-500 dark:border-white-600 dark:focus:ring-white-900 dark:focus:border-white-500" />
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm text-white-600 dark:text-white-400">Password confirm </label>
                        </div>
                        <input type="password" name="password" id="password" placeholder="New password confirm" className="w-full px-3 py-2 placeholder-white-300 border border-white-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-white-700 dark:text-white dark:placeholder-white-500 dark:border-white-600 dark:focus:ring-white-900 dark:focus:border-white-500" />
                    </div>
                    <div className="mb-6">
                        <button type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Reset</button>
                    </div>
                </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword