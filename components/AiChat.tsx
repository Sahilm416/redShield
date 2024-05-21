"use client"
import React from 'react'
import {ChatBox} from "find-x-react"
const AiChat = () => {
  return (
    <ChatBox api='/api/chat'/>
  )
}

export default AiChat;