import React from "react";  

const GenerateButton = () => {  
  const handleClick = () => {  
    console.log("Button clicked!");  
    // Ajoutez ici la logique pour générer le site  
  };  

  return (  
<button class="glow-button">
  <span>Button</span>
</button>
  );  
};  

export default GenerateButton;
