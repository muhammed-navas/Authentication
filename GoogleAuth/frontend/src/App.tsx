import GithubAuth from "./componetns/GithubAuth"
import GoogleAuthButton from "./componetns/GoogleAuth"

const App = () => {
  return (
    <div className="flex items-center gap-2 flex-col justify-center min-h-screen">
      <GoogleAuthButton />
      <GithubAuth />
    </div>
  );
}

export default App