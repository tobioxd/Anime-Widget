import React from 'react'
import backgroundImage from '../../assets/background/1.jpg';

const LogIn = () => {
  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-black-900" style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10 bg-white bg-opacity-50 p-5 rounded-lg border border-black-300">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-black-700 dark:text-black-200">Sign in</h1>
            <p className="text-black-500 dark:text-black-400">Sign in to access your account</p>
          </div>
          <div className="m-7">
            <form action="">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm text-white-600 dark:text-white-400">Email Address</label>
                        <input type="email" name="email" id="email" placeholder="Your email" className="w-full px-3 py-2 placeholder-white-300 border border-white-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-white-700 dark:text-white dark:placeholder-white-500 dark:border-white-600 dark:focus:ring-white-900 dark:focus:border-white-500" />
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label htmlFor="password" className="text-sm text-white-600 dark:text-white-400">Password</label>
                            <a href="/forgot-password" className="text-sm text-white-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</a>
                        </div>
                        <input type="password" name="password" id="password" placeholder="Your Password" className="w-full px-3 py-2 placeholder-white-300 border border-white-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-white-700 dark:text-white dark:placeholder-white-500 dark:border-white-600 dark:focus:ring-white-900 dark:focus:border-white-500" />
                    </div>
                    <div className="mb-6">
                        <button type="button" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
                    </div>
                    <p className="text-sm text-center text-white-400">Don&#x27;t have an account yet? <a href="/sign-up" className="text-red-600 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</a>.</p>
                </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LogIn