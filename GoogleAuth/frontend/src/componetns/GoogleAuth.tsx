
export default function GoogleAuthButton() {

  const handleGoogleSignIn = () => {
     window.location.href ='http://localhost:5000/auth/google';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <button
        onClick={handleGoogleSignIn}
        // disabled={isLoading}
        className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 text-gray-700 transition-all bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
      >
          <img className="w-5 h-5" src="/google.png" alt="" />
        <span className="font-medium">Sign in with Google</span>
      </button>
    </div>
  );
}
