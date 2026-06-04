import { useState } from "react"
import "../styles/Auth.css"

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)

  function handleSubmit(event) {
    event.preventDefault()

    const fullName = event.target.fullName?.value || "Zentriq User"
    const email = event.target.email.value
    const password = event.target.password.value

    if (isLogin) {
      const savedUser = JSON.parse(localStorage.getItem("zentriq_user"))

      if (
        !savedUser ||
        savedUser.email !== email ||
        savedUser.password !== password
      ) {
        alert("Invalid email or password")
        return
      }

      localStorage.setItem("zentriq_auth", "true")
      onLogin()
    } else {
      localStorage.setItem(
        "zentriq_user",
        JSON.stringify({
          fullName,
          email,
          password,
        })
      )

      alert("Account created successfully. Please login.")
      setIsLogin(true)
    }
  }

  function demoLogin() {
    localStorage.setItem(
      "zentriq_user",
      JSON.stringify({
        fullName: "Demo User",
        email: "demo@zentriq.com",
        password: "demo123",
      })
    )

    localStorage.setItem("zentriq_auth", "true")
    onLogin()
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <h1>{isLogin ? "Welcome Back" : "Create Account"}</h1>

        <p>
          {isLogin
            ? "Sign in to continue to Zentriq"
            : "Create your Zentriq workspace"}
        </p>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              required
            />
          )}

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="social-auth">
          <button type="button" onClick={demoLogin}>
            Google
          </button>

          <button type="button" onClick={demoLogin}>
            GitHub
          </button>
        </div>

        <button
          className="auth-switch"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </section>
  )
}

export default Auth