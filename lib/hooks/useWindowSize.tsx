import { useState, useEffect } from "react";

function useWindowSize() {
  // Estado para almacenar el ancho y alto de la ventana
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Función que se ejecutará cada vez que cambie el tamaño de la ventana
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Escucha el evento de cambio de tamaño de la ventana
    window.addEventListener("resize", handleResize);

    // Llama a handleResize una vez al montar para configurar el tamaño inicial
    handleResize();

    // Limpia el event listener al desmontar el componente
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
