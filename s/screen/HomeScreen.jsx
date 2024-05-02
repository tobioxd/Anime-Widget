import React from "react";
import Hero from "../components/Hero";
import MessageForm from "../components/MessageForm";

function HomeScreen() {
  return (
    <>
      <Hero 
        title={"minhdeptraivcl"} 
        imageUrl={"/hero.png"} 
      />
      <MessageForm />
    </>
  );
}

export default HomeScreen;
