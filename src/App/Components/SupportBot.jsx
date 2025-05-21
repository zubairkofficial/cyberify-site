import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import Helpers from "../Config/Helpers";
import ChatGPTFormatter from "./ChatGPTFormatter";
import "./SupportBot.css";

const SupportBot = ({ showSupportBotInitial = false }) => {
  const [showSupportBot, setShowSupportBot] = useState(showSupportBotInitial);
  const [showChatInput, setShowChatInput] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState("I want to schedule a meeting.");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);
  const audioRef = useRef(null);
  const [hasNewMessage, setHasNewMessage] = useState(false);
 console.log('mesa', hasNewMessage)


  
  // const play = () => {
  //   const audioUrl = new Audio("/assets/music/tune.mp3");  
  //   console.log("Audio object: ", audioUrl);
  //   audioUrl.play();  
  // };

  const play = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          console.log("Audio played successfully");
        })
        .catch((err) => {
          console.error("Audio playback failed: ", err);
        });
    }
  };

  useEffect(() => {
    // Preload audio when component mounts
    audioRef.current = new Audio("/assets/music/tune.mp3");
    audioRef.current.load();
  }, []);
  // const play = () => {
  //   if (audioRef.current) {
  //     audioRef.current.play();
  //   }
  // };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatBoxRef.current && !chatBoxRef.current.contains(event.target)) {
        setShowSupportBot(false);
      }
    };

    if (showSupportBot) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSupportBot]);

  useEffect(() => {
    if (showSupportBot && messages.length === 0) {
      // audioRef.current = new Audio("/assets/music/tune.mp3");
      // audioRef.current.load();
      setTimeout(() => {
        initSendMessage();
      }, 3000); 
    }
  
  }, [showSupportBot]);

  const initSendMessage = () => {
    // if (!showSupportBot) {
      setHasNewMessage(true);
  // }
    play();   
    const message = {
      from: "ai",
      content:
        "👋 Hi there! Welcome to Cyberify AI! I'm here to assist you with anything you need. To get started, could you please share your name with me?",
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setShowChatInput(true);
    scrollToBottom();
    
  
  };
  

  const sendSuggestion = () => {
    generateResponse(suggestion);
    play()
    setSuggestion("");
  };

  const submitForm = (e) => {
    setHasNewMessage(true);
    e.preventDefault();
    play(); 
    if (loading) return;
    generateResponse();
  };

  const generateResponse = (message = "") => {
    setHasNewMessage(true)
    setLoading(true);
    const user_message = message ? message : query;

    setMessages((prevMessages) => [
      ...prevMessages,
      { from: "user", content: user_message },
      { from: "ai", content: "" },
    ]);
    setQuery("");

    const controller = new AbortController();
    const signal = controller.signal;

    fetch(`${Helpers.apiUrl}web/gpt-response`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Helpers.openaiKey}`,
      },
      body: JSON.stringify({
        user_message,
        messages: [...messages, { from: "user", content: user_message }],
      }),
      signal,
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((error) => {
            Helpers.toast("error", error.message);
            setLoading(false);
            setHasNewMessage(true);
          });
        } else {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          const processText = async ({ done, value }) => {
            if (done) {
              setLoading(false);
              generateSuggestion();
              return;
            }
            let text = decoder.decode(value);
            if (text.endsWith("[DONE]")) {
              text = text.slice(0, -6);
            }
            let withLines = text.replace(/\\n/g, "\n");
            console.log(withLines);

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              const lastMessageIndex = updatedMessages.length - 1;
              if (
                lastMessageIndex >= 0 &&
                updatedMessages[lastMessageIndex].from === "ai"
              ) {
                updatedMessages[lastMessageIndex].content += withLines;
              }
              return updatedMessages;
            });

            setTimeout(() => {
              scrollToBottom();
            }, 500);
            await reader.read().then(processText);
          };
          reader.read().then(processText);
        }
      })
      .catch((error) => {
        console.log("ERROR::", error);
        setLoading(false);
      });

    // **Commented Out the axios.post to Prevent Duplicate AI Messages**
    /*
    axios
      .post(`${Helpers.apiUrl}web/response`, { user_message })
      .then((response) => {
        setMessages((messages) => [...messages, response.data.response]);
        generateSuggestion();
      })
      .catch((error) => {
        Helpers.toast("error", "An error occured. Try again");
      })
      .finally(() => {
        setLoading(false);
      });
    */
     
    
  };
  const openChat = () => {
    setShowSupportBot(true);
    setHasNewMessage(false); // Clear the notification when chat opens
};
  const generateSuggestion = () => {
    setHasNewMessage(true); 
    const headers = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${Helpers.openaiKey}`,
      },
    };
    let history = ``;
    messages.forEach((msg) => {
      history += `${msg.from.toUpperCase()}: ${msg.content}\n`;
    });

    history += `\n\nYou need to create a suggestion for a follow up question which user can possibly ask or say based on the conversation history provided. Keep in mind to generate the short suggestion in under 10 words strictly.`;
    const data = {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: Helpers.suggestionPrompt,
        },
        {
          role: "user",
          content: history,
        },
      ],
    };
    axios
      .post("https://api.groq.com/openai/v1/chat/completions", data, headers)
      .then((response) => {
        setSuggestion(response.data.choices[0].message.content);
      })
      .catch((error) => {
        Helpers.toast("error", "An error occured. Try again");
      });
  };

  return (
    <div className="chatbot-widget">
      {showSupportBot && (
        <div
          className={`chat-box ${showSupportBot ? "open" : "closed"}`}
          ref={chatBoxRef}
        >
          <div className="chat-header">
            <img
              className="chat-avatar"
              src={Helpers.staticImage("favicon.png")}
              alt="Chat Avatar"
            />
            <div className="flex-column">
              <span className="mil-dark">
                <strong>Cyberify AI</strong>
              </span>
              <small>
                Discuss project details, schedule meeting, get insights.
              </small>
            </div>
            <i className="fa-solid fa-xmark" style={{ cursor: "pointer" , fontSize : "1.3rem", marginLeft : "2.3rem" }} onClick={() => setShowSupportBot(false)}></i>
          </div>
          <div className="chat-body">
            {!showChatInput &&( 
              <div className="init-chat">
                <h4>Welcome to Cyberify AI</h4>
                <p>
                  Cyberify AI helps you to get the estimated timeline & cost for
                  your project. Discuss your idea, get more ideas. Schedule a
                  meeting to discuss your project with us.
                </p>
                <div className="chat-action-buttons">
                  <button
                    className="btn-send-message"
                    onClick={() => alert("Something")}
                  >
                    Add Project Details
                  </button>
                  <button
                    className="btn-send-message"
                    onClick={initSendMessage}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            )}
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div className={`${msg.from}-message`} key={index}>
                  <p className="mil-dark">
                    <ChatGPTFormatter
                      writing={messages.length - 1 === index && loading}
                      response={msg.content}
                    />
                  </p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          {showChatInput && (
            <div className="chat-footer">
              <div className="chat-input">
                <form onSubmit={submitForm}>
                  <input
                    className="chat-query-input"
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Write your message"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        submitForm(e);
                      }
                    }}
                  />
                  <div className="footer-tools">
                    <div>
                      {suggestion && (
                        <div className="chat-suggestion">
                          <span onClick={sendSuggestion}>{suggestion}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn-send-message btn-sm"
                        disabled={loading}
                        aria-disabled={loading}
                      >
                        {loading ? "Sending..." : "Send"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
      {!showSupportBot && (
        <div style={{ position: "relative" }}>
    <img
        className="chat-bubble"
        src={Helpers.staticImage("support1.png")}
        alt="Open Chat"
        onClick={openChat}
        style={{ cursor: "pointer" }}
    />
    {hasNewMessage && (
        <span
            style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
            }}
        >
            1
        </span>
    )}
</div>

      )}
    </div>
  );
};

export default SupportBot;
