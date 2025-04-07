import { Card } from '@/components/ui/card'
import { SignIn } from '@clerk/tanstack-react-start'

function Login() {
  return (
    <div className="flex h-screen w-full">
      <div className="hidden w-1/2 flex-col justify-between bg-black p-12 lg:flex">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-white">AppName</h1>
          <p className="text-gray-400">Your modern app solution</p>
        </div>

        <div className="mb-8">
          <img alt="Logo" className="mr-2 h-16 w-16" src="/logo.png" />
          <p className="mt-6 max-w-md text-gray-400">
            "Transform your workflow with our intuitive platform designed for modern teams."
          </p>
          <p className="mt-4 text-sm text-gray-500">© 2025 AppName. All rights reserved.</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center bg-white p-8 lg:w-1/2">
        <Card className="w-full max-w-md border-none bg-transparent shadow-none">
          <div className="flex flex-col items-center justify-center space-y-6">
            <SignIn
              appearance={{
                elements: {
                  cardBox: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                  },
                  card: {
                    boxShadow: 'none',
                    padding: '0 2rem',
                  },
                  footer: {
                    background: 'transparent',
                  },
                  formButtonPrimary: {
                    fontSize: 14,
                    textTransform: 'none',
                    backgroundColor: '#000000',
                    '&:hover, &:focus, &:active': {
                      backgroundColor: '#555555',
                    },
                  },
                },
              }}
              forceRedirectUrl={window.location.href}
              oauthFlow="redirect"
              routing="hash"
            />
          </div>
        </Card>
      </div>
    </div>
  )
}

export default Login
