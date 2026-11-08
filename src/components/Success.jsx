import React from "react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  return (
    <div id="son_div" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
      <div className="sonyazi_1">
        <img
          src="/images/iteration-1-images/logo.svg"
          alt="Teknolojik Yemekler Logo"
        />
      </div>

      <div id="son_paragraf">
        <h1 className="sonyazi_2">
          TEBRİKLER!<br />SİPARİŞİNİZ ALINDI!
        </h1>
      </div>
    </div>
  );
}