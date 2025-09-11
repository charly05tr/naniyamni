export const ProgressBar = ({ step, totalSteps, label="proveedor" }) => {
    
    const percentage = Math.min((step / (totalSteps)) * 100, 100);
  
    return (
      <div className="w-full sticky top-0 z-49 flex flex-col items-center justify-center mb-10 mt-5">
        <div className="w-1/2 bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="mt-2 text-center">
          {step  === totalSteps
            ? `${label} creado exitosamente!`
            : `Paso ${step + 1} de ${totalSteps}`}
        </p>
      </div>
    );
  }