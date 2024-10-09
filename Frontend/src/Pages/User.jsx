// import React, { useState } from 'react';
// import axios from 'axios';
// import { auth } from '../firebase/firebaseConfig'; // Import the auth object
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import GoogleAuthProvider and signInWithPopup

// const User = () => {
//     const [isLogin, setIsLogin] = useState(false);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: ''
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (isLogin) {
//                 // Login functionality
//                 const res = await axios.post('http://localhost:5000/api/auth/login', {
//                     email: formData.email,
//                     password: formData.password
//                 });
//                 alert('Login successful! Your token: ' + res.data.token);
//             } else {
//                 // Signup functionality
//                 const res = await axios.post('http://localhost:5000/api/auth/signup', {
//                     username: formData.username,
//                     email: formData.email,
//                     password: formData.password
//                 });
//                 alert('Signup successful! Your token: ' + res.data.token);
//             }
//         } catch (err) {
//             alert(err.response.data.msg || 'Error occurred!');
//         }
//     };

//     const handleGoogleSignIn = async () => {
//         const provider = new GoogleAuthProvider();
//         try {
//             const result = await signInWithPopup(auth, provider);
//             const user = result.user;
//             // Optionally, send user data to your backend for further processing
//             alert(`Google Sign-in successful! Welcome ${user.displayName}`);
//             // Here, you can send user information to your backend if needed
//         } catch (error) {
//             alert(error.message);
//         }
//     };

//     return (
//         <div className='w-screen h-[88vh] flex items-center'>
//             <div className="max-w-md w-2/6 mx-auto mt-10 bg-white p-6 rounded-md shadow-md">
//                 <h2 className="text-3xl font-bold text-center mb-4">
//                     {isLogin ? 'Login' : 'Sign Up'}
//                 </h2>
//                 <form onSubmit={handleSubmit}>
//                     {!isLogin && (
//                         <div className="mb-4">
//                             <label className="block mb-2">Username:</label>
//                             <input
//                                 type="text"
//                                 name="username"
//                                 value={formData.username}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-4 py-2 border rounded-md"
//                             />
//                         </div>
//                     )}
//                     <div className="mb-4">
//                         <label className="block mb-2">Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block mb-2">Password:</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                             className="w-full px-4 py-2 border rounded-md"
//                         />
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
//                     >
//                         {isLogin ? 'Login' : 'Sign Up'}
//                     </button>
//                 </form>

//                 <button
//                     onClick={handleGoogleSignIn}
//                     className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300"
//                 >
//                     {isLogin ? 'Login with Google' : 'Sign Up with Google'}
//                 </button>

//                 <p className="text-center mt-4">
//                     {isLogin ? (
//                         <>
//                             Don't have an account?{' '}
//                             <span
//                                 className="text-blue-500 cursor-pointer"
//                                 onClick={() => setIsLogin(false)}
//                             >
//                                 Sign Up here.
//                             </span>
//                         </>
//                     ) : (
//                         <>
//                             Already have an account?{' '}
//                             <span
//                                 className="text-blue-500 cursor-pointer"
//                                 onClick={() => setIsLogin(true)}
//                             >
//                                 Login here.
//                             </span>
//                         </>
//                     )}
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default User;
