const LandingLayout = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="h-full bg-[#eceff1] overflow-auto">
      <div className="h-full w-full max-w-screen-xl mx-auto">
        {children}
      </div>
    </main>
  )
}

export default LandingLayout;
