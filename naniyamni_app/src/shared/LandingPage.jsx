const LandingPage = () => {
    const backgroundClasses = `
    w-full min-h-screen
    bg-gray-50 dark:bg-gray-950
    bg-[radial-gradient(ellipse_80%_80%_at_50%_10%,rgba(217,216,255,1),rgba(255,255,0,0.5)]
    dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-30%,rgba(255,255,0,0.15),rgba(120,119,120,0))]
  `;
  
    return (
      <div className={backgroundClasses}>
          <div className="grid-container-app">
            <div className="flex-1">
              <main className={backgroundClasses}>
                  <div className={`${backgroundClasses} flex justify-center items-center fixed w-full min-h-screen`}>
                  </div>
                  <div className="p-8 flex items-center justify-center">
                  <h1 className="dark:text-[#F9FAFB]/90 text-[#181818] text-6xl md:text-8xl font-extrabold z-10 text-center drop-shadow-2xl mt-25">
                    NaniYamni
                    </h1>
                    <p className="relative self-end font-bold">Demo</p>
                  </div>
              </main>
            </div>
          </div>
      </div>
    );
  };
  
  export default LandingPage;