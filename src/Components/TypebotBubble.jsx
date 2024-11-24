import { useState } from "react";

const TypebotBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBubble = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Botão Bubble */}
      <div
        onClick={toggleBubble}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          backgroundColor: "#0042DA",
          borderRadius: "50%",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // Aumentando a sombra para maior elevação
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          zIndex: 1000,
        }}
      >
        💬
      </div>

      {/* Modal ou iframe embutido */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "400px",
            height: "600px",
            backgroundColor: "#fff",
            boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3)", // Sombra maior para o modal (bubble)
            borderRadius: "12px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          <iframe
            src="https://typechat.winikii.com/confere"
            style={{ width: "100%", height: "100%", border: "none" }}
            title="Typebot"
          />
          <button
            onClick={toggleBubble}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>
        </div>
      )}
    </>
  );
};

export default TypebotBubble;
