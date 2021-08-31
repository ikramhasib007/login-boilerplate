function Layout() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-12 text-4xl font-bold text-gray-900">Welcome, You are authenticated!</h1>
      <p className="text-base">
        <span className="px-4 py-2 bg-red-200">Next.js</span>
        <span className="px-4 py-2 bg-green-200">Apollo Client</span>
        <span className="px-4 py-2 bg-yellow-200">GraphQL</span>
        <span className="px-4 py-2 bg-blue-200">Node.js</span>
        <span className="px-4 py-2 bg-purple-200">Prisma as ORM</span>
        <span className="px-4 py-2 bg-indigo-200">Tailwindcss</span>
        <span className="px-4 py-2 bg-cyan-200">SendGrid as Mail Server</span>
        <span className="px-4 py-2 bg-gray-200">Passport.js</span>
      </p>
    </div>
  )
}

export default Layout
